/**
 * Created by AH on 10/30/2016.
 */


// ************ Simulation ************  //
var Simulation = function (name) {
    this.name = name;
    this.agents = [];
};

Simulation.prototype.addAgent = function (agent) {
    this.agents.push(agent);
}

Simulation.prototype.removeAgent = function (agent) {
    this.agents.splice(this.agents.indexOf(agent), 1);
}

Simulation.prototype.update = function () {
    var i;
    for (i = 0; i < this.agents.length; i++) {
        this.agents[i].update();
    }
};


// ************ Agent ************  //


var Agent = function (name) {
    this.name = name;
    this.courses = [];
    this.signals = {};
};

Agent.prototype.addCourse = function (course) {
    console.log("adding" + this.name);
    this.courses.push(course);
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

Agent.prototype.sayHello = function () {
    console.log("Hello, I'm " + this.name);
};

Agent.prototype.update = function () {
    //console.log("Updating " + this.name);
    var i;
    var toBeRemoved = [];
    for (var key in this.signals) {
        var a = this.signals[key];
        for (i = 0; i < a.length; i++) {
            if (a[i].trigger()) {
                console.log(key, ' - finished course: ', a[i].name);
                toBeRemoved.add({signal: key, course: a[i]});
            }
        }
    }
    for (i = 0; i < toBeRemoved.length; i++) {
        console.log(key, ' - unsubscribe course: ', a[i].name);
        this.unsubscribeSignal(toBeRemoved[i].signal, toBeRemoved[i].course);
    }
};


// ************ Course ************  //

// this need to be changed to be implementing multiple types of
// start line and multiple outgoing lines
var Course = function (name, childs, action) {
    this.name = name;
    //this.next = childs === null? null : childs.length === 0? null : childs[0];
    this.next = 0;
    this.action = action;
    this.isFinished = false;
    this.isWait = false;
    this.childs = childs | [];
    this.currentIndex = -1;
};

Course.prototype.trigger = function () {
    console.log("triggering course: ", this.name);
    // run childs one by one, when all the childs are finished then run itself
    if (this.isFinished !== false) {
        if (this.childs === null || this.childs.length === 0) {
            this.next = this;
        } else if (this.childs.length > this.currentIndex + 1) {
            this.currentIndex++;
            this.next = this.childs[this.currentIndex];
        } else {
            this.next = this;
        }

        this.isWait = false;
        if (this.next !== null) {
            if (this.next.action === null) {
                this.isWait = this.next.action(this.next);
                if (this.next === this && !this.isWait && !this.isFinished) {
                    this.isFinished = true;
                }
            }
        }
    }
};

Course.prototype.finish = function () {
    console.log("Course ", name, " is finished");
    this.isFinished = true;
}
