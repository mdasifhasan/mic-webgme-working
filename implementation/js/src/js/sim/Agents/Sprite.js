/**
 * Created by AH on 10/31/2016.
 */
var Sprite = function (name) {
    Agent.apply(this, [name]);

    // init data
    this.data.dataSprite = new DataSprite();

    // init library courses provided with this agent
    var createGroup = new Course(this, "createGroup", null, new CreateGroup());
    this.addCourse(createGroup);

    var createSprite = new Course(this, "createSprite", null, new CreateSprite());
    this.addCourse(createSprite);
};
inheritsFrom(Sprite, Agent);