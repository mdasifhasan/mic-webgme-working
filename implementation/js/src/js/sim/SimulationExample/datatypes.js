/**
 * Created by AH on 11/22/2016.
 */

var Data = function () {

};

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

var ReferData = function (value, dataType) {
    Data.apply(this);
    this.dataType = dataType;
    this.value = value;
};
inheritsFrom(ReferData, Data);

var Dictionary = function () {
    Data.apply(this);
    this.value = {};
};
inheritsFrom(Dictionary, Data);


var DataPhysics = function () {
    Data.apply(this);
    this.enablePhysics = new Boolean(false);
    this.immovable = new Boolean(false);
    this.gravity = new Data();
    this.gravity.x = new Number(0);
    this.gravity.y = new Number(300);
    this.bounce = new Data();
    this.bounce.x = new Number(0);
    this.bounce.y = new Number(0.5);
    this.collideWorldBounds = new Boolean(false);
    this.body = new Obj(null);
};

var DataGroup = function () {
    this.name = new Text("default");
    this.value = new Obj(null);
    this.enablePhysics = new Boolean(false);
};
inheritsFrom(DataGroup, Data);

var DataSprite = function () {
    Data.apply(this);
    this.x = new Number(0);
    this.y = new Number(0);
    this.imageName = new Text("default");
    this.scale = new Data();
    this.scale.x = new Number(1);
    this.scale.y = new Number(1);
    this.sprite = new Obj(null);
    this.group = new DataGroup();
    this.group.name="sprite";
    this.physics = new DataPhysics();
};
inheritsFrom(DataSprite, Data);
var DictionarySample = function () {
    Dictionary.apply(this);
    this.value["0"] = new Number(11);
    this.value["1"] = new Number(21);
    this.value["2"] = new Number(31);
    this.value["abs"] = new Text("Sample Text");
    var d = new Dictionary();
    d.value["0"] = new Number(2);
    d.value["1"] = new Number(3);
    d.value["2"] = new Number(4);
    this.value["3"] = d;
};
inheritsFrom(DictionarySample, Dictionary);




