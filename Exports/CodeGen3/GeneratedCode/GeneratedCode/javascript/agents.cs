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

// end of generated code
















