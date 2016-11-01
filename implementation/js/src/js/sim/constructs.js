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
    this.next = 0;
    this.action = action;
    this.childs = childs | [];
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
        if (this.runCourseList(this.pre))
            this.isPreFinished = true;
    } else {
        while (!this.isChildsFinsihed) {
            if (this.next < this.childs.length) {
                if (this.childs[this.next].trigger()) {
                    this.next++;
                    if (this.next === childs.length) {
                        this.isChildsFinsihed = true;
                    } else {
                        this.isChildsFinsihed = false;
                        break;
                    }
                }
            }
        }

        if (this.isChildsFinsihed) {
            if (this.action.trigger()) {
                this.isSelfFinished = true;
            } else
                this.isSelfFinished = false;
        }
        if (this.isSelfFinished)
            if (this.runCourseList(this.post)) {
                this.isPostFinished = true;
                this.isFinished = true;
            }
    }
    return this.isFinished;
};

Course.prototype.runCourseList = function (courseList) {
    var i,
        toBeRemoved;
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
}
