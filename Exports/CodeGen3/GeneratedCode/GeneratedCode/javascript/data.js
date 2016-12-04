var Data = function () {

};

// the primitives
var Number = function (value) {
Data.apply(this);
if (value === null)
value = false;
this.value = value;
};
inheritsFrom(Number, Data);

var Boolean = function (value) {
Data.apply(this);
if (value === null)
value = false;
this.value = value;
};
inheritsFrom(Boolean, Data);

var Text = function (value) {
Data.apply(this);
if (value === null)
value = "";
this.value = value;
};
inheritsFrom(Text, Data);

var Obj = function (value, objType) {
Data.apply(this);
this.objType = objType;
this.value = value;
};
inheritsFrom(Obj, Data);

var ReferData = function (referValue, dataType) {
Data.apply(this);
this.dataType = dataType;
this.referValue = referValue;
};
inheritsFrom(ReferData, Data);
// end of the primitives


// generated code

var Physics = function () {
Data.apply(this);
this['physics body']=new Obj(null, 'object');
this['enable physics']=new Boolean(false);
};
inheritsFrom(Physics , Data);


var DataSprite = function () {
Data.apply(this);
this['image name']=new Text('default');
this['SpriteObject']=new Obj(null, 'object');
this['Group']=new Group();
this['Group']['name']=new Text('default');
this['Group']['enable physics']=new Boolean(false);
this['Group']['group object']=new Obj(null, 'object');
this['Physics']=new Physics();
this['Physics']['physics body']=new Obj(null, 'object');
this['Physics']['enable physics']=new Boolean(false);
this['x']=new Number(0);
this['y']=new Number(0);
};
inheritsFrom(DataSprite , Data);


var DataText = function () {
Data.apply(this);
this['Y']=new Number(0);
this['Text']=new Text('');
this['TextObject']=new Obj(null, 'object');
this['X']=new Number(0);
};
inheritsFrom(DataText , Data);


var Group = function () {
Data.apply(this);
this['name']=new Text('default');
this['enable physics']=new Boolean(false);
this['group object']=new Obj(null, 'object');
};
inheritsFrom(Group , Data);










// end of generated code