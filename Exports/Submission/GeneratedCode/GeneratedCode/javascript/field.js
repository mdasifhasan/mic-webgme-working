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

Field.prototype.triggerAction = function () {
//console.log("Firing field action rcvd arguments", arguments);
var name = arguments[0];
var args = Array.prototype.slice.call(arguments, 1);
//console.log("Firing field action: ", name);
if (!(name in this.interfaces)){
//console.log("No component subscribed to the interface: ", name, "of", this);
return true;
}
//console.log("Found field action: ", this.interfaces[name], " would Call with args:", args);
var i,
res = true;
for (i = 0; i < this.interfaces[name].length; i++) {
//console.log("calling function: ", this.interfaces[name][i], "with args:", args);
res = res && this.interfaces[name][i].apply(this, args);
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


// generated code
var Fields = {};

Fields.FieldGameEngine = new Field('FieldGameEngine');
Fields.FieldErrorHandler = new Field('FieldErrorHandler');
Fields.FieldTestGame = new Field('FieldTestGame');
Fields.FieldTestGame.Stars = new ReferFieldData(Fields.FieldTestGame, 'Stars');
    
Fields.FieldCanvas = new Field('FieldCanvas');
Fields.FieldCanvas.FieldCollision = new Field('FieldCollision');
Fields.FieldCanvas.FieldCollision.CheckOverlap = function(data_groupName, data_dataSprite, signal_overlap, signal_notOverlap){
    if(data_dataSprite && !(data_dataSprite instanceof DataSprite)){
        throw {name:"Bad Parameter", message: "data_dataSprite is not instance of DataSprite"};
    }
    if(signal_overlap && !(signal_overlap instanceof Signal)){
        throw {name:"Bad Parameter", message: "signal_overlap is not instance of Signal"};
    }
    if(signal_notOverlap && !(signal_notOverlap instanceof Signal)){
        throw {name:"Bad Parameter", message: "signal_notOverlap is not instance of Signal"};
    }
    return this.triggerAction('CheckOverlap', data_groupName, data_dataSprite, signal_overlap, signal_notOverlap);
};
Fields.FieldCanvas.FieldCollision.AddCollisionCheck = function(data_groupNameB, data_groupNameA){
    return this.triggerAction('AddCollisionCheck', data_groupNameB, data_groupNameA);
};
Fields.FieldCanvas.FieldCollision.CheckCollision = function(){
    return this.triggerAction('CheckCollision');
};
Fields.FieldCanvas.FieldSprites = new Field('FieldSprites');
Fields.FieldCanvas.FieldSprites.Group = new Field('Group');
Fields.FieldCanvas.FieldSprites.Group.CreateGroup = function(data_Group_type, signal_Error){
    if(data_Group_type && !(data_Group_type instanceof Group)){
        throw {name:"Bad Parameter", message: "data_Group_type is not instance of Group"};
    }
    if(signal_Error && !(signal_Error instanceof Signal)){
        throw {name:"Bad Parameter", message: "signal_Error is not instance of Signal"};
    }
    return this.triggerAction('CreateGroup', data_Group_type, signal_Error);
};
Fields.FieldCanvas.FieldSprites.CreateSprite = function(data_DataSprite, data_DataSprite2, signal_Error){
    if(data_DataSprite && !(data_DataSprite instanceof DataSprite)){
        throw {name:"Bad Parameter", message: "data_DataSprite is not instance of DataSprite"};
    }
    if(data_DataSprite2 && !(data_DataSprite2 instanceof DataSprite)){
        throw {name:"Bad Parameter", message: "data_DataSprite2 is not instance of DataSprite"};
    }
    if(signal_Error && !(signal_Error instanceof Signal)){
        throw {name:"Bad Parameter", message: "signal_Error is not instance of Signal"};
    }
    return this.triggerAction('CreateSprite', data_DataSprite, data_DataSprite2, signal_Error);
};
Fields.FieldCanvas.FieldSprites.DataSprite_type = new ReferFieldData(Fields.FieldCanvas.FieldSprites, 'DataSprite_type');
    
Fields.FieldCanvas.FieldSprites.DataSprite2 = new ReferFieldData(Fields.FieldCanvas.FieldSprites, 'DataSprite2');
    
Fields.FieldCanvas.FieldTextView = new Field('FieldTextView');
Fields.FieldCanvas.FieldTextView.CreateTextView = function(data_DataText_type){
    return this.triggerAction('CreateTextView', data_DataText_type);
};
Fields.FieldCanvas.FieldTextView.UpdateTextView = function(data_DataText_type){
    return this.triggerAction('UpdateTextView', data_DataText_type);
};


// end of generated code













