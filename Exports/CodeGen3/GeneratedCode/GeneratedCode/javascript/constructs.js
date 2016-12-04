/**
 * Created by AH on 11/22/2016.
 */

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

debug = {};
debug.log = function () {
    console.log.apply(null, arguments);
    if (arguments[0] === "_force") {
        console.log.apply(null, arguments);
    }
};

debug.force = function () {
    console.log.apply(null, arguments);
};


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
    this.signals = new Signals();
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


// Agent.prototype.update = function () {
//     console.log("Updating " + this.name);
//     console.log("Updating the childs of", this.name);
//     var isChildsFinished = true;
//     for (var c in this.childs) {
//         console.log("Updating child " + this.childs[c]);
//         isChildsFinished = isChildsFinished && this.childs[c].update();
//         console.log("isChildsFinished: ", isChildsFinished);
//     }
//     console.log("Finished updating this childs of", this.name);
//
//     var i;
//     var toBeRemoved = [];
//     var k = 0;
//     for (var key in this.fired) {
//         var a = this.fired[key];
//         for (i = 0; i < a.length; i++) {
//             if (a[i].trigger()) {
//                 console.log(key, ' - finished course: ', a[i].name);
//                 toBeRemoved.push({signal: key, course: a[i]});
//             }
//         }
//     }
//     for (i = 0; i < toBeRemoved.length; i++) {
//         console.log(key, ' - unsubscribe course: ', a[i].name);
//         var signal = toBeRemoved[i].signal;
//         var course = toBeRemoved[i].course;
//         if (signal in this.fired) {
//             var l = this.fired[signal];
//             l.splice(l.indexOf(course), 1);
//             if (l.length === 0) {
//                 delete this.fired[signal];
//             }
//         }
//     }
//     console.log(this.name, ": fired signals length: ", Object.keys(this.fired).length);
//     if (Object.keys(this.fired).length === 0)
//         return true && isChildsFinished;
//     else
//         return false;
// };


// ************ Course ************  //

// this need to be changed to be implementing multiple types of
// start line and multiple outgoing lines
var Course = function (owner, name, childs, action) {
    this.owner = owner;
    this.name = name;
    this.next = 0;
    this.action = action;
    this.childs = !childs? {} : childs;
    this.isChildsFinsihed = false;
    this.isFinished = false;
};

Course.prototype.addCourse = function (course) {
    console.log("adding", course.name, "to parent course", this.name);
    this.childs[course.name] = course;
};

Course.prototype.removeCourse = function (course) {
    console.log("removing", course.name, "from parent course", this.name);
    if (course.name in this.childs)
        delete this.childs[course.name];
};

Course.prototype.reset = function () {
    this.next = 0;
    this.isChildsFinsihed = false;
    this.isFinished = false;
}

Course.prototype.trigger = function () {
    console.log("triggering course: ", this.name);
    // run pre first, run childs one by one, when all the childs are finished then run itself
    if (this.isFinished)
        this.reset();

    console.log(this.name, " triggering child courses, total childs:", this.childs.length, " currentIndex:", this.next);
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
    if (this.isChildsFinsihed && !this.isFinished) {
        console.log(this.name, "trigger course of self.");
        if (!this.action|| this.action.trigger(this)) {
            this.isFinished = true;
            console.log(this.name, "self execution is finished");
        } else {
            this.isFinished = false;
            console.log(this.name, "self execution is not finished, will continue at next");
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
        } else
            isFinished = false;
    }
    for (i = 0; i < toBeRemoved.length; i++) {
        console.log('Removing child course', toBeRemoved[i].name, 'from ', this.name)
        courseList.splice(courseList.indexOf(toBeRemoved[i]), 1);
    }
    // if (courseList.length == 0)
    //     return true;
    // else
    //     return false;

    return isFinished;
};


// ************ Signals ************  //

var Signals = function () {
    this.signals = {};
    this.fired = {};
};
Signals.prototype.subscribeSignal = function (signal, course) {
    console.log(signal, "subscribe signal, ", course);
    if (!(signal in this.signals))
        this.signals[signal] = [];
    if (course)
        if(!(course in this.signals[signal]))
            this.signals[signal].push(course);
};

Signals.prototype.unsubscribeSignal = function (signal, course) {
    if (course) {
        if (signal in this.signals) {
            var a = this.signals[signal];
            a.splice(a.indexOf(course), 1);
            if (a.length === 0) {
                delete this.signals[signal];
            }
        }
    }
};

Signals.prototype.fireSignal = function (signal) {
    console.log(signal, "fire signal, currently subscribed", this.signals[signal]);
    if (!(signal in this.fired)) {
        if (signal in this.signals) {
            this.fired[signal] = this.signals[signal].slice(0);
            return this._processSignal(signal);
        }
    } else {
        return this._processSignal(signal);
    }
};

Signals.prototype._processSignal = function (signal) {
    console.log(signal, "processing signal, ", this.fired[signal]);
    if(this.fired[signal].length === 0) {
        delete this.fired[signal];
        return true;
    }
    var i;
    var toBeRemoved = [];
    var a = this.fired[signal];
    for (i = 0; i < a.length; i++) {
        if (a[i].trigger()) {
            console.log(signal, ' - finished course: ', a[i].name);
            toBeRemoved.push({signal: signal, course: a[i]});
        }
    }
    for (i = 0; i < toBeRemoved.length; i++) {
        console.log(signal, ' - unsubscribe course: ', toBeRemoved[i].course.name);
        var signal = toBeRemoved[i].signal;
        var course = toBeRemoved[i].course;
        if (signal in this.fired) {
            var l = this.fired[signal];
            l.splice(l.indexOf(course), 1);
            if (l.length === 0) {
                delete this.fired[signal];
                console.log(signal, ' - processing finished');
                return true;
            }
        }
    }
    return false;
};



var Signal = function (signals, signalName) {
    this.signals = signals;
    this.signalName = signalName;
};

Signal.prototype.fire = function () {
    if(this.signals)
        if(this.signalName)
            return this.signals.fireSignal(this.signalName);
    return true;
};