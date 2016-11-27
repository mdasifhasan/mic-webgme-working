// ************ Fields ************  //

var Field = function (name) {
this.name = name;
this.interfaces = {};
this.data = {};
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



// generated code

Fields.FieldGameEngine = new Field('FieldGameEngine');
Fields.FieldDebug = new Field('FieldDebug');
Fields.FieldDebug.DebugChild = new Field('DebugChild');
Fields.FieldDebug.DebugChild.DebugChildChild = new Field('DebugChildChild');
Fields.FieldDebug.CountDataSubscribers = function(OutTotalCount){
    return this.triggerAction('CountDataSubscribers', OutTotalCount);
};
Fields.FieldParse = new Field('FieldParse');
Fields.FieldParse.NumberToString = function(Number-type, Text-type){
    return this.triggerAction('NumberToString', Number-type, Text-type);
};
Fields.FieldCanvas = new Field('FieldCanvas');
Fields.FieldCanvas.FieldTextView = new Field('FieldTextView');
Fields.FieldCanvas.FieldTextView.CreateTextView = function(DataText-type){
    if(!(DataText-type instanceof DataText)){
        throw {name:"Bad Parameter", message: "DataText-type is not instance of DataText"};
    }
    return this.triggerAction('CreateTextView', DataText-type);
};
Fields.FieldCanvas.FieldTextView.UpdateTextView = function(DataText-type){
    if(!(DataText-type instanceof DataText)){
        throw {name:"Bad Parameter", message: "DataText-type is not instance of DataText"};
    }
    return this.triggerAction('UpdateTextView', DataText-type);
};
Fields.FieldCanvas.FieldSprites = new Field('FieldSprites');
Fields.FieldCanvas.FieldSprites.Group = new Field('Group');
Fields.FieldCanvas.FieldSprites.Group.CreateGroup = function(Group-type, signal_Error){
    if(!(Group-type instanceof Group)){
        throw {name:"Bad Parameter", message: "Group-type is not instance of Group"};
    }
    if(!(signal_Error instanceof Signal)){
        throw {name:"Bad Parameter", message: "signal_Error is not instance of Signal"};
    }
    return this.triggerAction('CreateGroup', Group-type, signal_Error);
};
Fields.FieldCanvas.FieldSprites.CreateSprite = function(DataSprite, DataSprite2, signal_Error){
    if(!(DataSprite instanceof DataSprite)){
        throw {name:"Bad Parameter", message: "DataSprite is not instance of DataSprite"};
    }
    if(!(DataSprite2 instanceof DataSprite)){
        throw {name:"Bad Parameter", message: "DataSprite2 is not instance of DataSprite"};
    }
    if(!(signal_Error instanceof Signal)){
        throw {name:"Bad Parameter", message: "signal_Error is not instance of Signal"};
    }
    return this.triggerAction('CreateSprite', DataSprite, DataSprite2, signal_Error);
};
Fields.FieldCanvas.FieldSprites.DataSprite-type = new ReferFieldData(Fields.FieldCanvas.FieldSprites, 'DataSprite-type');
    
Fields.FieldCanvas.FieldSprites.DataSprite2 = new ReferFieldData(Fields.FieldCanvas.FieldSprites, 'DataSprite2');
    
Fields.FieldErrorHandler = new Field('FieldErrorHandler');
Fields.FieldTestGame = new Field('FieldTestGame');
Fields.FieldTestGame.Stars = new ReferFieldData(Fields.FieldTestGame, 'Stars');
    


// end of generated code













