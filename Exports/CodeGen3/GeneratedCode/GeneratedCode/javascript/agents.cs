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

    course = new Course(this, "CreateText");
    this.addCourse(CreateText);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalCreate', course);

    course = new Course(this, "UpdateText");
    this.addCourse(UpdateText);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalUpdate', course);

};
inheritsFrom(Canvas.library.Text, Agent);
Canvas.library.Text.ca_UpdateText = function (DataText-type) {

    var data = {};
    if(!(DataText-type instanceof DataText)){
        throw {name:"Bad Parameter", message: "DataText-type is not instance of DataText"};
    }

    data.DataText-type = DataText-type;

};

Canvas.library.Text.ca_CreateText = function (DataText-type) {

    var data = {};
    if(!(DataText-type instanceof DataText)){
        throw {name:"Bad Parameter", message: "DataText-type is not instance of DataText"};
    }

    data.DataText-type = DataText-type;

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
    
    course = new Course(this, 'Create Group');
    this['create sprite under group'].addCourse(course);

    course = new Course(this, 'Create Sprite');
    this['create sprite under group'].addCourse(course);


    course = new Course(this, "Create Sprite");
    this.addCourse(Create Sprite);
    

    course = new Course(this, "Create Group");
    this.addCourse(Create Group);
    

};
inheritsFrom(Canvas.library.Sprite, Agent);
Canvas.library.Sprite.ca_Create Group = function (Group-type, signal_Error) {

    var data = {};
    if(!(Group-type instanceof Group)){
        throw {name:"Bad Parameter", message: "Group-type is not instance of Group"};
    }

    data.Group-type = Group-type;

    var signals = {};
    if(!(signal_Error instanceof string)){
        throw {name:"Bad Parameter", message: "signal_Error is not instance of string"};
    }
    signals.signal_Error = signal_Error;

};

Canvas.library.Sprite.ca_Create Sprite = function (DataSprite-type, signal_Error) {

    var data = {};
    if(!(DataSprite-type instanceof DataSprite)){
        throw {name:"Bad Parameter", message: "DataSprite-type is not instance of DataSprite"};
    }

    data.DataSprite-type = DataSprite-type;

    var signals = {};
    if(!(signal_Error instanceof string)){
        throw {name:"Bad Parameter", message: "signal_Error is not instance of string"};
    }
    signals.signal_Error = signal_Error;

};

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
    


    var course;
    course = child.courses['create sprite under group'];
    Fields.FieldGameEngine.signals.subscribeSignal('SignalCreate', course);
    course = child.courses['Create Sprite'];
    course = child.courses['Create Group'];

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
    
    course = new Course(this, 'CourseComposite');
    this['SampleCourse'].addCourse(course);

    course = new Course(this, 'Course1');
    this['SampleCourse']['CourseComposite'].addCourse(course);

    course = new Course(this, 'Course2');
    this['SampleCourse']['CourseComposite'].addCourse(course);

    course = new Course(this, 'SignalCreate-refer');
    this['SampleCourse'].addCourse(course);

    course = new Course(this, 'Course');
    this['SampleCourse'].addCourse(course);

    course = new Course(this, 'SignalUpdate-refer');
    this['SampleCourse'].addCourse(course);

    course = new Course(this, 'Course');
    this['SampleCourse'].addCourse(course);

    this.signals.subscribeSignal('DebugSignal', course);
    Fields.FieldDebug.DebugChild.DebugChildChild.signals.subscribeSignal('DebugChildSignal', course);

    course = new Course(this, "SampleCourse2");
    this.addCourse(SampleCourse2);
    
    Fields.FieldDebug.DebugChild.DebugChildChild.signals.subscribeSignal('DebugChildSignal', course);

    course = new Course(this, "Show Stars Count");
    this.addCourse(Show Stars Count);
    
    Fields.FieldGameEngine.signals.subscribeSignal('SignalUpdate', course);

    var child = null;
    var child = new Canvas.library.Text('Text');
    this.addChild(child);
    


    var course;
    course = child.courses['CreateText'];
    Fields.FieldGameEngine.signals.subscribeSignal('SignalCreate', course);
    course = child.courses['UpdateText'];
    Fields.FieldGameEngine.signals.subscribeSignal('SignalUpdate', course);

};
inheritsFrom(Debug, Agent);
Debug.ca_Count Subscribers = function (CountText, Count, fd_InputWhichFieldData, signal_CASampleSignal) {

    var data = {};
    data.CountText = CountText;

    data.Count = Count;

    if(!(fd_InputWhichFieldData instanceof ReferFieldData)){
        throw {name:"Bad Parameter", message: "fd_InputWhichFieldData is not instance of ReferFieldData"};
    }
    data.fd_InputWhichFieldData = fd_InputWhichFieldData;

var signals = {};
    if(!(signal_CASampleSignal instanceof string)){
        throw {name:"Bad Parameter", message: "signal_CASampleSignal is not instance of string"};
    }
    signals.signal_CASampleSignal = signal_CASampleSignal;

};


// end of generated code
























