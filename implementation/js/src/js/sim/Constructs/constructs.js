/**
 * Created by AH on 10/30/2016.
 */


var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

// ************ Simulation ************  //
var Simulation = function (name) {
    this.name = name;
    this.agents = {};
    RegisterFields();
    RegisterAgents();
    RegisterFieldActions();
};

Simulation.prototype.addAgent = function (agent) {
    this.agents[agent.name] = agent;
}

Simulation.prototype.removeAgent = function (agent) {
    if (agent.name in this.agents)
        delete this.agents[agent.name];
}

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
    console.log("Creating new agent: ", this.name);
};

Agent.prototype.addChild = function (childAgent) {
    console.log("adding child ", childAgent.name, "to", this.name);
    this.childs[childAgent.name] = childAgent;
};

Agent.prototype.removeChild = function (childAgent) {
    console.log("removing child ", childAgent.name, "from", this.name);
    if (childAgent.name in this.childs)
        delete this.childs[childAgent.name];
};

Agent.prototype.addCourse = function (course) {
    console.log("adding", course.name, "to", this.name);
    this.courses[course.name] = course;
};

Agent.prototype.removeCourse = function (course) {
    console.log("removing", course.name, "from", this.name);
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
            this.fired[signal] = this.signals[signal];
};

Agent.prototype.sayHello = function () {
    console.log("Hello, I'm " + this.name);
};

Agent.prototype.update = function () {
    console.log("Updating " + this.name);
    console.log("Updating this childs of", this.name);
    var isChildsFinished = true;
    for (var c in this.childs) {
        console.log("Updating child " + this.childs[c]);
        isChildsFinished = isChildsFinished && this.childs[c].update();
        console.log("isChildsFinished: ", isChildsFinished);
    }
    console.log("Finished updating this childs of", this.name);

    var i;
    var toBeRemoved = [];
    var k = 0;
    for (var key in this.fired) {
        var a = this.fired[key];
        for (i = 0; i < a.length; i++) {
            if (a[i].trigger()) {
                console.log(key, ' - finished course: ', a[i].name);
                toBeRemoved.push({signal: key, course: a[i]});
            }
        }
    }
    for (i = 0; i < toBeRemoved.length; i++) {
        console.log(key, ' - unsubscribe course: ', a[i].name);
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
    console.log(this.name, ": fired signals length: ", Object.keys(this.fired).length);
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

Course.prototype.trigger = function () {
    console.log("triggering course: ", this.name);
    // run pre first, run childs one by one, when all the childs are finished then run itself
    if (this.isFinished)
        return true;
    if (!this.isPreFinished) {
        console.log(this.name, "triggering pre courses.");
        if (this.runCourseList(this.pre)) {
            this.isPreFinished = true;
            console.log(this.name, "pre courses are finished.");
        }
    }
    if (this.isPreFinished) {
        console.log(this.name, " triggering child courses");
        while (!this.isChildsFinsihed) {
            if (this.next < this.childs.length) {
                if (this.childs[this.next].trigger()) {
                    console.log(this.name, "child finished: ", this.childs[this.next].name);
                    this.next++;
                } else
                    break;
            } else {
                console.log(this.name, "all child courses are finished.");
                this.isChildsFinsihed = true;
                break;
            }
        }
        if (this.isChildsFinsihed && !this.isSelfFinished) {
            console.log(this.name, "trigger course of self.");
            if (this.action === null || this.action.trigger(this)) {
                this.isSelfFinished = true;
                console.log(this.name, "self execution is finished");
            } else{
                this.isSelfFinished = false;
                console.log(this.name, "self execution is not finished, will continue at next");
            }
        }
        if (this.isSelfFinished && !this.isPostFinished) {
            console.log(this.name, "triggering post courses.");
            if (this.runCourseList(this.post)) {
                console.log(this.name, "post courses are finished.");
                this.isPostFinished = true;
                this.isFinished = true;
            }
        }
    }
    return this.isFinished;
};

Course.prototype.runCourseList = function (courseList) {
    var i,
        toBeRemoved = [];
    for (i = 0; i < courseList.length; i++) {
        if (courseList[i].trigger()) {
            toBeRemoved.push(courseList[i]);
        }
    }
    for (i = 0; i < toBeRemoved.length; i++) {
        console.log('Removing course', toBeRemoved[i].name, 'from pre of ', this.name)
        courseList.splice(courseList.indexOf(toBeRemoved[i]), 1);
    }
    if (courseList.length == 0)
        return true;
    else
        return false;
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


// ************ Fields ************  //

var Field = function (name) {
    this.name = name;
    this.childs = {};
    this.interfaces = {};
};

Field.prototype.addChild = function (field) {
    this.childs[field.name] = field;
    return this;
};

Field.prototype.removeChild = function (field) {
    delete this.childs[field.name];
    return this;
};

Field.prototype.getChild = function (name) {
    if (name in this.childs)
        return this.childs[name];
    return null;
};

Field.prototype.addInterface = function (name) {
    this.interfaces[name] = [];
    return this;
};

Field.prototype.removeInterface = function (name) {
    delete this.childs[name];
    return this;
};

Field.prototype.subscribeToInterface = function (name, fn) {
    if (!(name in this.interfaces))
        this.addInterface(name);
    this.interfaces[name].push(fn);
    return this;
};

Field.prototype.unsubscribeFromInterface = function (name, fn) {
    if (!(name in this.interfaces))
        return;
    this.interfaces[name].splice(this.interfaces[name].indexOf(fn), 1);
    return this;
};

Field.prototype.triggerAction = function (name, args) {
    console.log("Firing field action: ", name);
    if (!(name in this.interfaces))
        return;
    console.log("Found field action: ", this.interfaces[name], " would Call with args:", args);
    var i,
        res = true;
    for (i = 0; i < this.interfaces[name].length; i++){
        console.log("calling function: ", this.interfaces[name][i]);
        res = res && this.interfaces[name][i](args);
    }
    return res;
};


var Fields = function (name) {
};

Fields.root = new Field("root");
Fields.register = function (field) {
    Fields.root.addChild(field);
};

Fields.unregister = function (field) {
    Fields.root.removeChild(field);
};

Fields.getField = function (name) {
    return Fields.root.getChild(name);
};

