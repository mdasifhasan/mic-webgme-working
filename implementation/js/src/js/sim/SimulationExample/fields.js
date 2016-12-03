/**
 * Created by AH on 11/24/2016.
 */

// ************ Fields ************  //

var Field = function (name) {
    this.name = name;
    this.interfaces = {};
    this.data = {};
    this.signals = new Signals();
};

Field.prototype.addData = function (name) {
    this.data[name] = [];
    return this;
};

Field.prototype.removeData = function (name) {
    delete this.data[name];
    return this;
};

Field.prototype.subscribeData = function (name, data) {
    if (!(name in this.data))
        this.addData(name);
    this.data[name].push(data);
    return this;
};

Field.prototype.unsubscribeData = function (name, data) {
    if (!(name in this.data))
        return;
    this.data[name].splice(this.data[name].indexOf(data), 1);
    return this;
};

Field.prototype.getData =function(name, mode){
    if (!(name in this.data))
        return;
    if(mode === null || mode === "all")
        return this.data[name];
    else if(mode === "first")
        return this.data[name][0];
    else if(mode === "random")
        return this.data[name][Math.floor(Math.random() * this.data[name].length)];
    else
        return this.data[name];
};

Field.prototype.addInterface = function (name) {
    this.interfaces[name] = [];
    return this;
};

Field.prototype.removeInterface = function (name) {
    delete this.interfaces[name];
    return this;
};

Field.prototype.subscribeToInterface = function (name, fn) {
    if (!(name in this.interfaces))
        this.addInterface(name);
    this.interfaces[name].push(fn);
    return this;
};

Field.prototype.unsubscribeFromInterface = function (name, fn) {
    if (!(name in this.interfaces))
        return;
    this.interfaces[name].splice(this.interfaces[name].indexOf(fn), 1);
    return this;
};

Field.prototype.triggerAction = function (name, args) {
    console.log("Firing field action: ", name);
    if (!(name in this.interfaces))
        return;
    //console.log("Found field action: ", this.interfaces[name], " would Call with args:", args);
    var i,
        res = true;
    for (i = 0; i < this.interfaces[name].length; i++) {
        //console.log("calling function: ", this.interfaces[name][i]);
        res = res && this.interfaces[name][i](args);
    }
    return res;
};

var ReferFieldData = function (field, fieldDataName) {
    this.field = field;
    this.fieldDataName = fieldDataName;
};
ReferFieldData.prototype.first = function () {
    return this.field.getData(this.fieldDataName, "first");
};
ReferFieldData.prototype.random = function () {
    return this.field.getData(this.fieldDataName, "random");
};
ReferFieldData.prototype.all = function () {
    return this.field.getData(this.fieldDataName);
};

// end of fields constructs

/*
*
*
*
*
*
 */

// generated code

// Fields
var Fields = {};
Fields.Canvas = new Field("Canvas");
Fields.Canvas.Sprites = new Field("Sprites");
Fields.Canvas.Group = new Field("Group");

Fields.Canvas.CreateSprite = function (d, signalError) {
    if(!(d instanceof DataSprite)){
        throw {name:"Bad Parameter", message: "d is not instance of DataSprite"};
    }
    return this.triggerAction("CreateSprite", d);
};

Fields.Canvas.Group.CreateGroup = function (d) {
    if(!(d instanceof DataGroup)){
        throw {name:"Bad Parameter", message: "d is not instance of DataGroup"};
    }
    return this.triggerAction("CreateGroup", d);
};

Fields.Canvas.dataSprite = new ReferFieldData(Fields.Canvas, "dataSprite");
// End of Fields


// Modules & Components
var createSprite = function (d) {
    console.log("creating sprite with sprite data", d);
    return true;
};

var createGroup = function (d) {
    console.log("creating Group with Group data", d);
    return true;
};

// End of Modules & Components


// Subscripions of Fields
Fields.Canvas.subscribeToInterface("CreateSprite", createSprite);
Fields.Canvas.Group.subscribeToInterface("CreateGroup", createGroup);

var dataSprite = new DataSprite();
dataSprite.imageName = "d1";
Fields.Canvas.subscribeData("dataSprite", dataSprite);
dataSprite = new DataSprite();
dataSprite.imageName = "d2";
Fields.Canvas.subscribeData("dataSprite", dataSprite);
dataSprite = new DataSprite();
dataSprite.imageName = "d3";
Fields.Canvas.subscribeData("dataSprite", dataSprite);
// end of Subscripions of Fields



// end of generated code


