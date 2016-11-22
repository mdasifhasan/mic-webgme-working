/**
 * Created by AH on 10/31/2016.
 */
var Canvas = function (name) {
    Agent.apply(this, [name]);

    var courseCreate = new Course(this, "create", null, null);
    var courseCollision = new Course(this, "collision", null, null);
    var courseUpdate = new Course(this, "update", null, null);
    var courseCreateParent = new Course(this, "CreateComposite", [courseCreate, courseCollision], null);

    this.addCourse(courseCreate);
    this.addCourse(courseCollision);
    this.addCourse(courseCreateParent);
    this.addCourse(courseUpdate);

    sim.subscribeSignal("create", this, "create");
    sim.subscribeSignal("update", this, "update");

    this.subscribeSignal("create", courseCreateParent);
    this.subscribeSignal("update", courseUpdate);
};
inheritsFrom(Canvas, Agent);
//
// addCanvas = function (sim) {
//     var canvas = new Agent("Canvas");
//
//     var courseCreate = new Course(canvas, "create", null, null);
//     var courseUpdate = new Course(canvas, "update", null, null);
//
//     canvas.addCourse(courseCreate);
//     canvas.addCourse(courseUpdate);
//
//     SimAgent.subscribeSignal("create", courseCreate);
//     SimAgent.subscribeSignal("update", courseUpdate);
//
//     sim.addAgent(canvas);
// };