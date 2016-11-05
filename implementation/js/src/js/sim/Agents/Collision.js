/**
 * Created by AH on 11/4/2016.
 */
var Collision = function (name) {
    Agent.apply(this, [name]);

    var AddCollisionCheck = new Course(this, "Add Collision", null, AddCollisionCheck);
    this.addCourse(Check);
    sim.agents["Canvas"].courses["collision"].subscribePostCourse(Check);

    var Check = new Course(this, "Check collision", null, CheckCollision);
    this.addCourse(Check);
    sim.agents["Canvas"].courses["update"].subscribePreCourse(Check);
};
inheritsFrom(Collision, Agent);
