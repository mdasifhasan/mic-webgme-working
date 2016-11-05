/**
 * Created by AH on 11/4/2016.
 */
var TestGame = function (name) {
    Agent.apply(this, [name]);

    // child agents

    // sky
    // game.add.sprite(0, 0, 'sky');
    this.sky = new Sprite("sky");
    this.sky.data.dataSprite.imageName = "sky";
    this.sky.data.dataSprite.x = 0;
    this.sky.data.dataSprite.y = 0;
    sim.agents["Canvas"].courses["create"].subscribePostCourse(this.sky.courses["createSprite"]);
    this.addChild(this.sky);



    this.star1 = new Star("star1");
    this.star1.sprite.data.dataSprite.x = 100;
    this.star1.sprite.data.dataSprite.y = 100;
    this.addChild(this.star1);

    this.star2 = new Star("star2");
    this.star2.sprite.data.dataSprite.x = 300;
    this.star2.sprite.data.dataSprite.y = 100;
    this.addChild(this.star2);
};
inheritsFrom(TestGame, Agent);