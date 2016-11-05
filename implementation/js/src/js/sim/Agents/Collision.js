/**
 * Created by AH on 11/4/2016.
 */
var Collision = function (name) {
    Agent.apply(this, [name]);
    var addCollisionCheck = new Course(this, "Add Collision", null, new AddCollisionCheck());
    this.addCourse(addCollisionCheck);
    sim.agents["Canvas"].courses["collision"].subscribePostCourse(addCollisionCheck);

    var Check = new Course(this, "Check collision", null, new CheckCollision());
    this.addCourse(Check);
    sim.agents["Canvas"].courses["update"].subscribePreCourse(Check);
};
inheritsFrom(Collision, Agent);
