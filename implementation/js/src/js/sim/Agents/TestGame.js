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


    // stars
    this.star1 = new Star("star1");
    this.star1.sprite.data.dataSprite.x = 100;
    this.star1.sprite.data.dataSprite.y = 100;
    this.addChild(this.star1);

    this.star2 = new Star("star2");
    this.star2.sprite.data.dataSprite.x = 300;
    this.star2.sprite.data.dataSprite.y = 100;
    this.addChild(this.star2);

    // platforms
    this.ground = new Platform("ground");
    this.ground.sprite.data.dataSprite.x = 0;
    this.ground.sprite.data.dataSprite.y = 536;
    this.ground.sprite.data.dataSprite.scale.x = 2;
    this.ground.sprite.data.dataSprite.scale.y = 2;
    this.addChild(this.ground);

    this.ground = new Platform("platform1");
    this.ground.sprite.data.dataSprite.x = 400;
    this.ground.sprite.data.dataSprite.y = 400;
    this.addChild(this.ground);

    this.ground = new Platform("platform2");
    this.ground.sprite.data.dataSprite.x = -150;
    this.ground.sprite.data.dataSprite.y = 250;
    this.addChild(this.ground);

    // player
    this.player = new Player("player");
    this.player.sprite.data.dataSprite.x = 32;
    this.player.sprite.data.dataSprite.y = 450;
    this.addChild(this.player);
};
inheritsFrom(TestGame, Agent);