// generated code

var Canvas = function (name) {
    if(!name)
        name = "Canvas";
    Agent.apply(this, [name]);
    
};
inheritsFrom(Canvas, Agent);
Canvas.library = {};
Canvas.library.Text = function (name) {
    if(!name)
        name = "Text";
    Agent.apply(this, [name]);
    
    this.data = {};
    this.data['DataText'] = new DataText();
    


};
inheritsFrom(Canvas.library.Text, Agent);
Canvas.library.Sprite = function (name) {
    if(!name)
        name = "Sprite";
    Agent.apply(this, [name]);
    
    this.data = {};
    this.data['DataSprite'] = new DataSprite();
    


};
inheritsFrom(Canvas.library.Sprite, Agent);
var GameEngine = function (name) {
    if(!name)
        name = "GameEngine";
    Agent.apply(this, [name]);
    
};
inheritsFrom(GameEngine, Agent);
var TestGame = function (name) {
    if(!name)
        name = "TestGame";
    Agent.apply(this, [name]);
    
    var child = null;
    var child = new TestGame.library.Star('Star2');
    this.addChild(child);
    


    var child = new TestGame.library.Star('Star1');
    this.addChild(child);
    child.childs['Sprite'].data['DataSprite']['y'].value = 100;
child.childs['Sprite'].data['DataSprite']['x'].value = 100;

child.childs['Sprite'].data['DataSprite']['Group']['enable physics'].value = true;



};
inheritsFrom(TestGame, Agent);
TestGame.library = {};
TestGame.library.Star = function (name) {
    if(!name)
        name = "Star";
    Agent.apply(this, [name]);
    
    var child = null;
    var child = new Canvas.library.Sprite('Sprite');
    this.addChild(child);
    


};
inheritsFrom(TestGame.library.Star, Agent);
TestGame.library.Star.library = {};
TestGame.library.Star.library.SampleAgent = function (name) {
    if(!name)
        name = "SampleAgent";
    Agent.apply(this, [name]);
    
};
inheritsFrom(TestGame.library.Star.library.SampleAgent, Agent);
TestGame.library.Star.library.SampleAgent.library = {};
TestGame.library.Star.library.SampleAgent.library.SampleAgent2 = function (name) {
    if(!name)
        name = "SampleAgent2";
    Agent.apply(this, [name]);
    
};
inheritsFrom(TestGame.library.Star.library.SampleAgent.library.SampleAgent2, Agent);
var ErrorHandler = function (name) {
    if(!name)
        name = "ErrorHandler";
    Agent.apply(this, [name]);
    
};
inheritsFrom(ErrorHandler, Agent);
var Debug = function (name) {
    if(!name)
        name = "Debug";
    Agent.apply(this, [name]);
    
    var child = null;
    var child = new Canvas.library.Text('Text');
    this.addChild(child);
    


};
inheritsFrom(Debug, Agent);

// end of generated code










