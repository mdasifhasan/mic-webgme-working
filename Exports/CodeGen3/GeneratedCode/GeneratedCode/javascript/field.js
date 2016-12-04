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
if (!(name in this.interfaces)){
console.log("No component subscribed to the interface: ", name, "of", this);
return true;
}
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
var Fields = {};

Fields.FieldGameEngine = new Field('FieldGameEngine');
Fields.FieldDebug = new Field('FieldDebug');
Fields.FieldDebug.DebugChild = new Field('DebugChild');
Fields.FieldDebug.DebugChild.DebugChildChild = new Field('DebugChildChild');
Fields.FieldDebug.CountDataSubscribers = function(data_OutTotalCount, fd_IFieldData){
    if(fd_IFieldData && !(fd_IFieldData instanceof ReferFieldData)){
        throw {name:"Bad Parameter", message: "fd_IFieldData is not instance of ReferFieldData"};
    }
    return this.triggerAction('CountDataSubscribers', data_OutTotalCount, fd_IFieldData);
};
Fields.FieldParse = new Field('FieldParse');
Fields.FieldParse.NumberToString = function(data_Number_type, data_Text_type){
    return this.triggerAction('NumberToString', data_Number_type, data_Text_type);
};
Fields.FieldCanvas = new Field('FieldCanvas');
Fields.FieldCanvas.FieldTextView = new Field('FieldTextView');
Fields.FieldCanvas.FieldTextView.CreateTextView = function(data_DataText_type){
    if(data_DataText_type && !(data_DataText_type instanceof DataText)){
        throw {name:"Bad Parameter", message: "data_DataText_type is not instance of DataText"};
    }
    return this.triggerAction('CreateTextView', data_DataText_type);
};
Fields.FieldCanvas.FieldTextView.UpdateTextView = function(data_DataText_type){
    if(data_DataText_type && !(data_DataText_type instanceof DataText)){
        throw {name:"Bad Parameter", message: "data_DataText_type is not instance of DataText"};
    }
    return this.triggerAction('UpdateTextView', data_DataText_type);
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
    
Fields.FieldErrorHandler = new Field('FieldErrorHandler');
Fields.FieldTestGame = new Field('FieldTestGame');
Fields.FieldTestGame.Stars = new ReferFieldData(Fields.FieldTestGame, 'Stars');
    


// end of generated code













