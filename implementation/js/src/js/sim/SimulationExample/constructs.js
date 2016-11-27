/**
 * Created by AH on 11/22/2016.
 */

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

var debug = {};
debug.log = function(){
    // console.log(arguments);
    if(arguments[0] === "_force"){
        console.log.apply(null, arguments);
    }
}

debug.force = function(){
    console.log.apply(null, arguments);
}


// ************ Simulation ************  //
var Simulation = function (name) {
    this.name = name;
    this.agents = {};
};

Simulation.prototype.createSignal = function (signal) {
    if (signal in this.signals)
        return;
    this.signals[signal] = [];
};

Simulation.prototype.subscribeSignal = function (signal, agent, agentSignal) {
    if (!(signal in this.signals))
        this.createSignal(signal);
    this.signals[signal].push([agent, agentSignal]);
};

Simulation.prototype.fireSignal = function (signal) {
    if (signal in this.signals) {
        var i;
        for (i = 0; i < this.signals[signal].length; i++)
            this.signals[signal][i][0].fireSignal(this.signals[signal][i][1]);
    }
};

Simulation.prototype.addAgent = function (agent) {
    this.agents[agent.name] = agent;
};

Simulation.prototype.removeAgent = function (agent) {
    if (agent.name in this.agents)
        delete this.agents[agent.name];
};

Simulation.prototype.update = function () {
    var i;
    var isFinished = true;
    for (var a in this.agents) {
        isFinished = this.agents[a].update();
    }
    return isFinished;
};



// ************ Agent ************  //

var Agent = function (name) {
    this.name = name;
    this.courses = {};
    this.signals = {};
    this.fired = [];
    this.data = {};
    this.childs = {};
    debug.log("Creating new agent: ", this.name);
};

Agent.prototype.addChild = function (childAgent) {
    debug.log("adding child ", childAgent.name, "to", this.name);
    this.childs[childAgent.name] = childAgent;
};

Agent.prototype.removeChild = function (childAgent) {
    debug.log("removing child ", childAgent.name, "from", this.name);
    if (childAgent.name in this.childs)
        delete this.childs[childAgent.name];
};


Agent.prototype.addCourse = function (course) {
    debug.log("adding", course.name, "to", this.name);
    this.courses[course.name] = course;
};

Agent.prototype.removeCourse = function (course) {
    debug.log("removing", course.name, "from", this.name);
    if (course.name in this.courses)
        delete this.courses[course.name];
};

Agent.prototype.subscribeSignal = function (signal, course) {
    if (!(signal in this.signals))
        this.signals[signal] = [];
    this.signals[signal].push(course);
};

Agent.prototype.unsubscribeSignal = function (signal, course) {
    if (signal in this.signals) {
        var a = this.signals[signal];
        a.splice(a.indexOf(course), 1);
        if (a.length === 0) {
            delete this.signals[signal];
        }
    }
};

Agent.prototype.fireSignal = function (signal) {
    if (!(signal in this.fired))
        if (signal in this.signals)
            this.fired[signal] = this.signals[signal].slice(0);
};

Agent.prototype.update = function () {
    debug.log("Updating " + this.name);
    debug.log("Updating the childs of", this.name);
    var isChildsFinished = true;
    for (var c in this.childs) {
        debug.log("Updating child " + this.childs[c]);
        isChildsFinished = isChildsFinished && this.childs[c].update();
        debug.log("isChildsFinished: ", isChildsFinished);
    }
    debug.log("Finished updating this childs of", this.name);

    var i;
    var toBeRemoved = [];
    var k = 0;
    for (var key in this.fired) {
        var a = this.fired[key];
        for (i = 0; i < a.length; i++) {
            if (a[i].trigger()) {
                debug.log(key, ' - finished course: ', a[i].name);
                toBeRemoved.push({signal: key, course: a[i]});
            }
        }
    }
    for (i = 0; i < toBeRemoved.length; i++) {
        debug.log(key, ' - unsubscribe course: ', a[i].name);
        var signal = toBeRemoved[i].signal;
        var course = toBeRemoved[i].course;
        if (signal in this.fired) {
            var l = this.fired[signal];
            l.splice(l.indexOf(course), 1);
            if (l.length === 0) {
                delete this.fired[signal];
            }
        }
    }
    debug.log(this.name, ": fired signals length: ", Object.keys(this.fired).length);
    if (Object.keys(this.fired).length === 0)
        return true && isChildsFinished;
    else
        return false;
};


// ************ Course ************  //

// this need to be changed to be implementing multiple types of
// start line and multiple outgoing lines
var Course = function (owner, name, childs, action) {
    this.owner = owner;
    this.name = name;
    this.next = 0;
    this.action = action;
    this.childs = childs === null ? [] : childs;
    this.pre = [];
    this.post = [];
    this.isChildsFinsihed = false;
    this.isFinished = false;
    this.isPreFinished = false;
    this.isPostFinished = false;
    this.isSelfFinished = false;
};

Course.prototype.reset = function () {
    this.next = 0;
    this.isChildsFinsihed = false;
    this.isFinished = false;
    this.isPreFinished = false;
    this.isPostFinished = false;
    this.isSelfFinished = false;
}

Course.prototype.trigger = function () {
    debug.log("triggering course: ", this.name);
    // run pre first, run childs one by one, when all the childs are finished then run itself
    if (this.isFinished)
        this.reset();
    if (!this.isPreFinished) {
        debug.log(this.name, "triggering pre courses.");
        if (this.runCourseList(this.pre)) {
            this.isPreFinished = true;
            debug.log(this.name, "pre courses are finished.");
        }
    }
    if (this.isPreFinished) {
        debug.log(this.name, " triggering child courses");
        while (!this.isChildsFinsihed) {
            if (this.next < this.childs.length) {
                if (this.childs[this.next].trigger()) {
                    debug.log(this.name, "child finished: ", this.childs[this.next].name);
                    this.next++;
                } else
                    break;
            } else {
                debug.log(this.name, "all child courses are finished.");
                this.isChildsFinsihed = true;
                break;
            }
        }
        if (this.isChildsFinsihed && !this.isSelfFinished) {
            debug.log(this.name, "trigger course of self.");
            if (this.action === null || this.action.trigger(this)) {
                this.isSelfFinished = true;
                debug.log(this.name, "self execution is finished");
            } else {
                this.isSelfFinished = false;
                debug.log(this.name, "self execution is not finished, will continue at next");
            }
        }
        if (this.isSelfFinished && !this.isPostFinished) {
            debug.log(this.name, "triggering post courses.");
            if (this.runCourseList(this.post)) {
                debug.log(this.name, "post courses are finished.");
                this.isPostFinished = true;
                this.isFinished = true;
            }
        }
    }
    return this.isFinished;
};

Course.prototype.runCourseList = function (courseList) {
    var i,
        toBeRemoved = [],
        isFinished = true;
    for (i = 0; i < courseList.length; i++) {
        if (courseList[i].trigger()) {
            //toBeRemoved.push(courseList[i]);
        }else
            isFinished = false;
    }
    for (i = 0; i < toBeRemoved.length; i++) {
        debug.log('Removing course', toBeRemoved[i].name, 'from pre of ', this.name)
        courseList.splice(courseList.indexOf(toBeRemoved[i]), 1);
    }
    // if (courseList.length == 0)
    //     return true;
    // else
    //     return false;

    return isFinished;
};

Course.prototype.subscribePreCourse = function (course) {
    this.pre.push(course);
};

Course.prototype.unsubscribePreCourse = function (course) {
    this.pre.splice(this.pre.indexOf(course), 1);
};

Course.prototype.subscribePostCourse = function (course) {
    this.post.push(course);
};

Course.prototype.unsubscribePostCourse = function (course) {
    this.post.splice(this.post.indexOf(course), 1);
};
