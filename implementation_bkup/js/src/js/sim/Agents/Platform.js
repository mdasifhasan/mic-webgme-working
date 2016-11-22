/**
 * Created by hasanm on 11/4/2016.
 */
var Platform = function (name) {
    Agent.apply(this, [name]);

    // child agents
    this.sprite = new Sprite("sprite");
    this.addChild(this.sprite);

    // setting the data of its own and its child
    this.sprite.data.dataSprite.group.name = "Platforms";
    this.sprite.data.dataSprite.imageName = "ground";
    this.sprite.data.dataSprite.group.enablePhysics = true;
    this.sprite.data.dataSprite.physics.immovable = true;
    this.sprite.data.dataSprite.physics.gravity.x = 0;
    this.sprite.data.dataSprite.physics.gravity.y = 0;

    // setting the courses of its own and its child
    var childs = [];
    childs.push(this.sprite.courses["createGroup"]);
    childs.push(this.sprite.courses["createSprite"]);
    var Create = new Course(this, "Create Platform", childs, null);
    this.sprite.addCourse(Create);
    sim.agents["Canvas"].courses["create"].subscribePostCourse(Create);
};
inheritsFrom(Platform, Agent);