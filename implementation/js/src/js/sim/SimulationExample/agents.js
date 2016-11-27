/**
 * Created by dasif on 11/27/2016.
 */

var Canvas = function (name) {
    if(name === null)
        name = "Canvas";
    Agent.apply(this, [name]);
};
inheritsFrom(Canvas, Agent);
Canvas.libraryAgents = {};
Canvas.libraryAgents.Sprite = function (name) {
    if(name === null)
        name = "Sprite";
    Agent.apply(this, [name]);
    this.data.DataSprite = new DataSprite();
    this.data.DataSprite.x = 100;
    this.data.DataSprite.imageName = "TestAgentSprite";
};
inheritsFrom(Canvas.libraryAgents.Sprite, Agent);

var TestGame1 = function (name) {
    if(name === null)
        name = "TestGame";
    Agent.apply(this, [name]);
    var Star1 = new TestGame1.libraryAgents.Star("Star1");
    Star1.childs.Sprite.data.DataSprite.x =300;
    Star1.childs.Sprite.data.DataSprite.imageName ="Star1";
    this.addChild(Star1);
    var Star2 = new TestGame1.libraryAgents.Star("Star2");
    Star2.childs.Sprite.data.DataSprite.x =500;
    Star2.childs.Sprite.data.DataSprite.imageName ="Star2";
    this.addChild(Star2);
};
inheritsFrom(TestGame1, Agent);
TestGame1.libraryAgents = {};
TestGame1.libraryAgents.Star = function (name) {
    if(name === null)
        name = "Star";
    Agent.apply(this, [name]);
    this.addChild(new Canvas.libraryAgents.Sprite("Sprite"));
};
inheritsFrom(TestGame1.libraryAgents.Star, Agent);
