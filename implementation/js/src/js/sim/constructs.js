/**
 * Created by AH on 10/30/2016.
 */
var Simulation = function (name) {
    this.name = name;
    this.agents = [];
};

Simulation.prototype.addAgent = function (agent) {
    this.agents.push(agent);
}

Simulation.prototype.removeAgent = function (agent) {
    this.agents.splice(this.queue.indexOf(agent), 1);
}

Simulation.prototype.update = function () {
    var i;
    for (i = 0; i < this.agents.length; i++) {
        this.agents[i].update();
    }
};

var Agent = function (name) {
    this.name = name;
    this.courses = [];
};


Agent.prototype.sayHello = function () {
    console.log("Hello, I'm " + this.name);
};

Agent.prototype.update = function () {
    //console.log("Updating " + this.name);
    var i = 0;
    for (; i < this.courses.length; i++) {
        if (this.courses[i] !== null) {
            while (!this.courses[i].isFinished && !this.courses[i].isWait) {
                this.courses[i].trigger();
            }
        }
    }
};


Agent.prototype.addCourse = function (course) {
    console.log("adding" + this.name);
    this.courses.push(course);
};


// this need to be changed to be implementing multiple types of
// start line and multiple outgoing lines
var Course = function (name, childs, action) {
    this.name = name;
    //this.next = childs === null? null : childs.length === 0? null : childs[0];
    this.next = null;
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
            if (this.next.action === null){
                this.isWait = this.next.action(this.next);
                if(this.next === this && !this.isWait && !this.isFinished){
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
