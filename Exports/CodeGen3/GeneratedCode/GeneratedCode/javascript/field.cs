/**
* Created by AH on 11/24/2016.
*/

// ************ Fields ************  //

var Field = function (name) {
this.name = name;
this.interfaces = {};
};

Field.prototype.addInterface = function (name) {
this.interfaces[name] = [];
return this;
};

Field.prototype.removeInterface = function (name) {
delete this.childs[name];
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

// end of fields constructs



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
Fields.FieldErrorHandler = new Field('FieldErrorHandler');
Fields.FieldTestGame = new Field('FieldTestGame');


// end of generated code











