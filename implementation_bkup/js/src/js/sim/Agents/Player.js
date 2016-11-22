/**
 * Created by hasanm on 11/4/2016.
 */
var Player = function (name) {
    Agent.apply(this, [name]);

    // child agents
    this.sprite = new Sprite("sprite");
    this.addChild(this.sprite);

    // setting the data of its own and its child
    this.sprite.data.dataSprite.imageName = "dude";
    this.sprite.data.dataSprite.enablePhysics = true;
    this.sprite.data.dataSprite.physics.gravity.x = 0;
    this.sprite.data.dataSprite.physics.gravity.y = 300;
    this.sprite.data.dataSprite.physics.bounce.y = 0.2;
    this.sprite.data.dataSprite.physics.collideWorldBounds = true;
    // setting the courses of its own and its child
    sim.agents["Canvas"].courses["create"].subscribePostCourse(this.sprite.courses["createSprite"]);
};
inheritsFrom(Player, Agent);