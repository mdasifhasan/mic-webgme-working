/**
 * Created by AH on 10/31/2016.
 */
addCanvas = function (sim) {
    var canvas = new Agent("Canvas");

    var courseCreate = new Course(canvas, "create", null, null);
    var courseUpdate = new Course(canvas, "update", null, null);

    canvas.addCourse(courseCreate);
    canvas.addCourse(courseUpdate);

    SimAgent.subscribeSignal("create", courseCreate);
    SimAgent.subscribeSignal("update", courseUpdate);

    sim.addAgent(canvas);
};