/**
 * Created by AH on 10/31/2016.
 */


var sim = new Simulation("Test Simulation");
//addStarAgent(sim);


var a = new Agent("A1");

var child1 = new Course("child1", null, null);
var child2 = new Course("child2", null, null);
var childs = [child1, child2];

var cA = new Course("cA", childs, null);
a.addCourse(cA);

a.subscribeSignal("default", cA);

sim.addAgent(a);