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
    


    var course;
    course = new Course(this, "CreateText", null, new this.CA_CreateText());

    this.addCourse(CreateText);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalCreate', course);
    course = new Course(this, "UpdateText", null, new this.CA_UpdateText());

    this.addCourse(UpdateText);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalUpdate', course);

};
inheritsFrom(Canvas.library.Text, Agent);
Canvas.library.Text.prototype.CA_UpdateText = function () {

    var caData = {};

    this.caData.DataText-type = this.data.DataText;


    this.res = {};

    this.res.UpdateTextView = false;
        
};

Canvas.library.Text.prototype.CA_UpdateText.prototype.trigger = function (course) {

    if(!this.res.UpdateTextView){
        this.res.UpdateTextView = Fields.FieldCanvas.FieldTextView.Update TextView(this.caData.DataText-type);
        if(!this.res.UpdateTextView)
            return false;
    }

    return true;
};

Canvas.library.Text.prototype.CA_CreateText = function () {

    var caData = {};

    this.caData.DataText-type = this.data.DataText;


    this.res = {};

    this.res.CreateTextView = false;
        
};

Canvas.library.Text.prototype.CA_CreateText.prototype.trigger = function (course) {

    if(!this.res.CreateTextView){
        this.res.CreateTextView = Fields.FieldCanvas.FieldTextView.Create TextView(this.caData.DataText-type);
        if(!this.res.CreateTextView)
            return false;
    }

    return true;
};

Canvas.library.Sprite = function (name) {
    if(!name)
        name = "Sprite";
    Agent.apply(this, [name]);
    
    this.data = {};
    this.data['DataSprite'] = new DataSprite();
    


    var course;
    course = new Course(this, "create sprite under group");
    this.addCourse(create sprite under group);
    
    course = new Course(this, "Create Group", null, new this.CA_CreateGroup());
    
    this['create sprite under group'].addCourse(course);

    course = new Course(this, "Create Sprite", null, new this.CA_CreateSprite());
    
    this['create sprite under group'].addCourse(course);

    course = new Course(this, "Create Sprite", null, new this.CA_CreateSprite());

    this.addCourse(Create Sprite);
    
    course = new Course(this, "Create Group", null, new this.CA_CreateGroup());

    this.addCourse(Create Group);
    

    this.mod_SpriteActions = new Canvas.library.Sprite.SpriteActions();
    this.mod_SpriteActions.init();
    
    Fields.FieldCanvas.FieldSprites.subscribeToInterface('CreateSprite', this.mod_SpriteActions.CreateSprite-refer);

    Fields.FieldCanvas.FieldSprites.subscribeData('DataSprite-type', this.data.DataSprite);

    Fields.FieldCanvas.FieldSprites.Group.subscribeToInterface('CreateGroup', this.mod_SpriteActions.CreateGroup-refer);

};
inheritsFrom(Canvas.library.Sprite, Agent);
Canvas.library.Sprite.prototype.CA_CreateGroup = function () {

    var caData = {};

    this.caData.Group-type = this.data.DataSprite.Group;

    this.caSignals = {};
    this.caSignals.signal_Error = new Signal(Fields.FieldErrorHandler.signals, 'Critical Error');


    this.res = {};

    this.res.CreateGroup = false;
        
};

Canvas.library.Sprite.prototype.CA_CreateGroup.prototype.trigger = function (course) {

    if(!this.res.CreateGroup){
        this.res.CreateGroup = Fields.FieldCanvas.FieldSprites.Group.Create Group(this.caData.Group-type, this.caSignals.Error);
        if(!this.res.CreateGroup)
            return false;
    }

    return true;
};

Canvas.library.Sprite.prototype.CA_CreateSprite = function () {

    var caData = {};

    this.caData.DataSprite-type = this.data.DataSprite;

    this.caSignals = {};
    this.caSignals.signal_Error = new Signal(Fields.FieldErrorHandler.signals, 'Critical Error');


    this.res = {};

    this.res.CreateSprite = false;
        
};

Canvas.library.Sprite.prototype.CA_CreateSprite.prototype.trigger = function (course) {

    if(!this.res.CreateSprite){
        this.res.CreateSprite = Fields.FieldCanvas.FieldSprites.CreateSprite(this.caData.DataSprite-type, null, this.caSignals.Error);
        if(!this.res.CreateSprite)
            return false;
    }

    return true;
};

var GameEngine = function (name) {
    if(!name)
        name = "GameEngine";
    Agent.apply(this, [name]);
    
    
    this.mod_GameEngine = new ModGameEngine();
    this.mod_GameEngine.init(new Signal(Fields.FieldGameEngine.signals, 'SignalUpdate'), new Signal(Fields.FieldGameEngine.signals, 'SignalCreate'));
    
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
    


Fields.FieldTestGame.subscribeData('Stars', this.childs.Sprite.data.DataSprite);

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
    
    var course;
    course = new Course(this, "Report Critical Error");
    this.addCourse(Report Critical Error);
    

};
inheritsFrom(ErrorHandler, Agent);
var Debug = function (name) {
    if(!name)
        name = "Debug";
    Agent.apply(this, [name]);
    
    var course;
    course = new Course(this, "SampleCourse");
    this.addCourse(SampleCourse);
    
    course = new Course(this, "CourseComposite");
    this['SampleCourse'].addCourse(course);

    course = new Course(this, "Course1");
    this['SampleCourse']['CourseComposite'].addCourse(course);

    course = new Course(this, "Course2");
    this['SampleCourse']['CourseComposite'].addCourse(course);

    course = new Course(this, "SignalCreate-refer");
    this['SampleCourse'].addCourse(course);

    course = new Course(this, "Course");
    this['SampleCourse'].addCourse(course);

    course = new Course(this, "SignalUpdate-refer");
    this['SampleCourse'].addCourse(course);

    course = new Course(this, "Course");
    this['SampleCourse'].addCourse(course);

    this.signals.subscribeSignal('DebugSignal', course);
    Fields.FieldDebug.DebugChild.DebugChildChild.signals.subscribeSignal('DebugChildSignal', course);
    course = new Course(this, "SampleCourse2");
    this.addCourse(SampleCourse2);
    
    Fields.FieldDebug.DebugChild.DebugChildChild.signals.subscribeSignal('DebugChildSignal', course);
    course = new Course(this, "Show Stars Count", null, new this.CA_CountSubscribers());

    this.addCourse(Show Stars Count);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalUpdate', course);

    var child = null;
    var child = new Canvas.library.Text('Text');
    this.addChild(child);
    


    this.mod_DebugSubscribers = new Debug.DebugSubscribers();
    this.mod_DebugSubscribers.init();
    
    Fields.FieldDebug.subscribeToInterface('CountDataSubscribers', this.mod_DebugSubscribers.CountDataSubscribers-refer);

};
inheritsFrom(Debug, Agent);
Debug.prototype.CA_CountSubscribers = function () {

    var caData = {};
    this.caData.CountText = this.childs.Text.data.DataText.Text;

    this.caData.Count = this.data.StarCount;

    this.caData.fd_InputWhichFieldData = Fields.FieldTestGame.Stars;

    this.caSignals = {};
    this.caSignals.signal_CASampleSignal = new Signal(this.childs.Text.signals, 'TextSignal');


    this.res = {};

    this.res.CountDataSubscribers = false;
        
    this.res.NumberToString = false;
        
};

Debug.prototype.CA_CountSubscribers.prototype.trigger = function (course) {

    if(!this.res.CountDataSubscribers){
        this.res.CountDataSubscribers = Fields.FieldDebug.CountDataSubscribers(this.caData.Count, this.caData.fd_InputWhichFieldData);
        if(!this.res.CountDataSubscribers)
            return false;
    }

    if(!this.res.NumberToString){
        this.res.NumberToString = Fields.FieldParse.NumberToString(this.caData.Count, this.caData.CountText);
        if(!this.res.NumberToString)
            return false;
    }

    return true;
};


// end of generated code
































