// generated code

var Canvas = function (name) {
    if(!name)
        name = "Canvas";
    Agent.apply(this, [name]);
    this.signals = new Signals();
    
    this.mod_SpriteActions = new Canvas.SpriteActions();
    this.mod_SpriteActions.init();
    
    Fields.FieldCanvas.FieldSprites.subscribeToInterface('CreateSprite', this.mod_SpriteActions.CreateSprite_refer.bind(this.mod_SpriteActions));

    Fields.FieldCanvas.FieldSprites.Group.subscribeToInterface('CreateGroup', this.mod_SpriteActions.CreateGroup_refer.bind(this.mod_SpriteActions));

};
inheritsFrom(Canvas, Agent);
Canvas.library = {};
Canvas.library.Text = function (name) {
    if(!name)
        name = "Text";
    Agent.apply(this, [name]);
    this.signals = new Signals();
    
    this.data = {};
    this.data['DataText'] = new DataText();
    

var course;
    course = new Course(this, "CreateText", null, new this.CA_CreateText(this));

    this.addCourse(course);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalCreate', this.courses['CreateText']);
    course = new Course(this, "UpdateText", null, new this.CA_UpdateText(this));

    this.addCourse(course);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalUpdate', this.courses['UpdateText']);

};
inheritsFrom(Canvas.library.Text, Agent);
Canvas.library.Text.prototype.CA_UpdateText = function (self) {

    this.caData = {};

    this.caData.DataText_type = self.data.DataText;


    this.res = {};

    this.res.UpdateTextView = false;
        
};

Canvas.library.Text.prototype.CA_UpdateText.prototype.trigger = function (course) {

    if(!this.res.UpdateTextView){
        this.res.UpdateTextView = Fields.FieldCanvas.FieldTextView.UpdateTextView(this.caData.DataText_type);
        if(!this.res.UpdateTextView)
            return false;
    }

    return true;
};

Canvas.library.Text.prototype.CA_CreateText = function (self) {

    this.caData = {};

    this.caData.DataText_type = self.data.DataText;


    this.res = {};

    this.res.CreateTextView = false;
        
};

Canvas.library.Text.prototype.CA_CreateText.prototype.trigger = function (course) {

    if(!this.res.CreateTextView){
        this.res.CreateTextView = Fields.FieldCanvas.FieldTextView.CreateTextView(this.caData.DataText_type);
        if(!this.res.CreateTextView)
            return false;
    }

    return true;
};

Canvas.library.Sprite = function (name) {
    if(!name)
        name = "Sprite";
    Agent.apply(this, [name]);
    this.signals = new Signals();
    
    this.data = {};
    this.data['DataSprite'] = new DataSprite();
    

var course;
    course = new Course(this, "create sprite under group");
    this.addCourse(course);
    
    course = new Course(this, "CreateGroup", null, new this.CA_CreateGroup(this));
    
    this.courses['create sprite under group'].addCourse(course);

    course = new Course(this, "CreateSprite", null, new this.CA_CreateSprite(this));
    
    this.courses['create sprite under group'].addCourse(course);

    Fields.FieldGameEngine.signals.subscribeSignal('SignalCreate', this.courses['create sprite under group']);

    Fields.FieldCanvas.FieldSprites.subscribeData('DataSprite_type', this.data.DataSprite);

};
inheritsFrom(Canvas.library.Sprite, Agent);
Canvas.library.Sprite.prototype.CA_CreateGroup = function (self) {

    this.caData = {};

    this.caData.Group_type = self.data.DataSprite.Group;

    this.caSignals = {};
    this.caSignals.Error = new Signal(Fields.FieldErrorHandler.signals, 'Critical Error');


    this.res = {};

    this.res.CreateGroup = false;
        
};

Canvas.library.Sprite.prototype.CA_CreateGroup.prototype.trigger = function (course) {

    if(!this.res.CreateGroup){
        this.res.CreateGroup = Fields.FieldCanvas.FieldSprites.Group.CreateGroup(this.caData.Group_type, this.caSignals.Error);
        if(!this.res.CreateGroup)
            return false;
    }

    return true;
};

Canvas.library.Sprite.prototype.CA_CreateSprite = function (self) {

    this.caData = {};

    this.caData.DataSprite_type = self.data.DataSprite;

    this.caSignals = {};
    this.caSignals.Error = new Signal(Fields.FieldErrorHandler.signals, 'Critical Error');


    this.res = {};

    this.res.CreateSprite = false;
        
};

Canvas.library.Sprite.prototype.CA_CreateSprite.prototype.trigger = function (course) {

    if(!this.res.CreateSprite){
        this.res.CreateSprite = Fields.FieldCanvas.FieldSprites.CreateSprite(this.caData.DataSprite_type, null, this.caSignals.Error);
        if(!this.res.CreateSprite)
            return false;
    }

    return true;
};

var GameEngine = function (name) {
    if(!name)
        name = "GameEngine";
    Agent.apply(this, [name]);
    this.signals = new Signals();
    
    this.mod_GameEngine = new ModGameEngine();
    this.mod_GameEngine.init(new Signal(Fields.FieldGameEngine.signals, 'SignalUpdate'), new Signal(Fields.FieldGameEngine.signals, 'SignalCreate'));
    
};
inheritsFrom(GameEngine, Agent);
var TestGame = function (name) {
    if(!name)
        name = "TestGame";
    Agent.apply(this, [name]);
    this.signals = new Signals();
    
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
    this.signals = new Signals();
    
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
    this.signals = new Signals();
    
};
inheritsFrom(TestGame.library.Star.library.SampleAgent, Agent);
TestGame.library.Star.library.SampleAgent.library = {};
TestGame.library.Star.library.SampleAgent.library.SampleAgent2 = function (name) {
    if(!name)
        name = "SampleAgent2";
    Agent.apply(this, [name]);
    this.signals = new Signals();
    
};
inheritsFrom(TestGame.library.Star.library.SampleAgent.library.SampleAgent2, Agent);
var ErrorHandler = function (name) {
    if(!name)
        name = "ErrorHandler";
    Agent.apply(this, [name]);
    this.signals = new Signals();
    var course;
    course = new Course(this, "Report Critical Error");
    this.addCourse(course);
    

};
inheritsFrom(ErrorHandler, Agent);
var Debug = function (name) {
    if(!name)
        name = "Debug";
    Agent.apply(this, [name]);
    this.signals = new Signals();
    
    var child = null;
    var child = new Canvas.library.Text('Text');
    this.addChild(child);
    

var course;
    course = new Course(this, "SampleCourse");
    this.addCourse(course);
    
    course = new Course(this, "CourseComposite");
    this.courses['SampleCourse'].addCourse(course);

    course = new Course(this, "Course1");
    this.courses['SampleCourse'].childs['CourseComposite'].addCourse(course);

    course = new Course(this, "Course11");
    this.courses['SampleCourse'].childs['CourseComposite'].childs['Course1'].addCourse(course);

    course = new Course(this, "Course12");
    this.courses['SampleCourse'].childs['CourseComposite'].childs['Course1'].addCourse(course);

    course = new Course(this, "Course2");
    this.courses['SampleCourse'].childs['CourseComposite'].addCourse(course);

    course = new Course(this, "SignalCreate-refer");
    this.courses['SampleCourse'].addCourse(course);

    course = new Course(this, "Course");
    this.courses['SampleCourse'].addCourse(course);

    course = new Course(this, "SignalUpdate-refer");
    this.courses['SampleCourse'].addCourse(course);

    course = new Course(this, "Course");
    this.courses['SampleCourse'].addCourse(course);

    this.signals.subscribeSignal('DebugSignal', this.courses['SampleCourse']);
    Fields.FieldDebug.DebugChild.DebugChildChild.signals.subscribeSignal('DebugChildSignal', this.courses['SampleCourse']);
    course = new Course(this, "SampleCourse2");
    this.addCourse(course);
    
    Fields.FieldDebug.DebugChild.DebugChildChild.signals.subscribeSignal('DebugChildSignal', this.courses['SampleCourse2']);
    course = new Course(this, "Show Stars Count", null, new this.CA_CountSubscribers(this));

    this.addCourse(course);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalUpdate', this.courses['Show Stars Count']);

    this.mod_DebugSubscribers = new Debug.DebugSubscribers();
    this.mod_DebugSubscribers.init();
    
    Fields.FieldDebug.subscribeToInterface('CountDataSubscribers', this.mod_DebugSubscribers.CountDataSubscribers_refer.bind(this.mod_DebugSubscribers));

};
inheritsFrom(Debug, Agent);
Debug.prototype.CA_CountSubscribers = function (self) {

    this.caData = {};
    this.caData.CountText = self.childs.Text.data.DataText.Text;

    this.caData.Count = self.data.StarCount;

    this.caData.fd_InputWhichFieldData = Fields.FieldTestGame.Stars;

    this.caSignals = {};
    this.caSignals.CASampleSignal = new Signal(self.childs.Text.signals, 'TextSignal');


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
































