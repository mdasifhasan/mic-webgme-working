/**
 * Created by AH on 10/31/2016.
 */


var sim = new Simulation("Test Simulation");
//addStarAgent(sim);


var a = new Agent("A1");


var Action = function (name, target) {
    this.name = name;
    this.i = 0;
    this.target = target;
};

Action.prototype.trigger = function (course) {
    this.i++;
    console.log('iteration: ', this.i, " triggering action " + this.name + " under " + course.name);
    if (this.i < 3) {
        console.log("not finished action");
        return false; // not finished yet
    }
    else {
        console.log("finished action");
        return true; // finished action
    }
};

var child1 = new Course("child1", null, new Action("ActionChild 1", 2));
var child2 = new Course("child2", null, new Action("ActionChild 2", 2));
var childs = [child1, child2];

var cA = new Course("cA", childs, new Action("Action A", 3));
a.addCourse(cA);

var cPre = new Course("cPre", null, new Action("Action Pre", 3));
cA.subscribePreCourse(cPre);
var cPost = new Course("cPost", null, new Action("Action Post", 3));
cA.subscribePostCourse(cPost);


a.subscribeSignal("default", cA);

sim.addAgent(a);