/**
 * Created by hasanm on 11/4/2016.
 */
var Star = function (name) {
    console.log("calling star constructor 1");
    Agent.apply(this, [name]);

    // child agents
    this.sprite = new Sprite("sprite");
    this.addChild(this.sprite);

    // setting the data of its child
    this.sprite.data.dataSprite.group.name = "Stars";
    this.sprite.data.dataSprite.imageName = "star";
    this.sprite.data.dataSprite.enablePhysics = true;
    this.sprite.data.dataSprite.group.enablePhysics = true;
    this.sprite.data.dataSprite.physics.bounce.y = 0.7 + Math.random() * 0.2;
    // setting the courses of its child
    var childs = [];
    childs.push(this.sprite.courses["createGroup"]);
    childs.push(this.sprite.courses["createSprite"]);
    var starCreate = new Course(this, "starCreate", childs, null);
    this.sprite.addCourse(starCreate);
    sim.agents["Canvas"].courses["create"].subscribePostCourse(starCreate);
};
inheritsFrom(Star, Agent);