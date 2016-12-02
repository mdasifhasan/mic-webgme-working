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


Canvas.libraryAgents.Sprite.CourseAction_CreateSprite = function (DataSprite) {
    var signals = {};
    signals.error = false;
    var data = {};
    data.DataSprite = DataSprite;
};

CourseAction_CreateSprite.prototype.trigger = function (course) {
    var dataSprite = this.data.DataSprite;

    Fields.Canvas.CreateSprite(dataSprite, this.signals.error);
    var res = Fields.root.getChild("Canvas").triggerAction("createSprite", dataSprite);
    return res;
};


var TestGame1 = function (name) {
    if(!name)
        name = "TestGame";
    Agent.apply(this, [name]);
    var Star1 = new TestGame1.libraryAgents.Star("Star1");
    Star1.childs.Sprite.data.DataSprite.x =300;
    Star1.childs.Sprite.data.DataSprite.imageName ="Star1";
    this.addChild(Star1);
    // var Star2 = new TestGame1.libraryAgents.Star("Star2");
    // Star2.childs.Sprite.data.DataSprite.x =500;
    // Star2.childs.Sprite.data.DataSprite.imageName ="Star2";
    // this.addChild(Star2);
};
inheritsFrom(TestGame1, Agent);
TestGame1.libraryAgents = {};
TestGame1.libraryAgents.Star = function (name) {
    if(name === null)
        name = "Star";
    Agent.apply(this, [name]);
    var sprite = new Canvas.libraryAgents.Sprite("Sprite");
    this.addChild(sprite);


    var courseStar = new Course(this, "courseStar");
    sprite.addCourse(courseStar);
    Fields.GameEngine.signals.subscribeSignal("update", courseStar);
    var courseCreate = new Course(this, "courseCreate");
    var courseUpdate = new Course(this, "courseUpdate");
    courseStar.childs = [courseCreate, courseUpdate];
};
inheritsFrom(TestGame1.libraryAgents.Star, Agent);
