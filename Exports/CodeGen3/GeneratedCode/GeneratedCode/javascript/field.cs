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
Fields.FieldParse = new Field('FieldParse');
Fields.FieldCanvas = new Field('FieldCanvas');
Fields.FieldCanvas.FieldTextView = new Field('FieldTextView');
Fields.FieldCanvas.FieldSprites = new Field('FieldSprites');
Fields.FieldCanvas.FieldSprites.Group = new Field('Group');
Fields.FieldErrorHandler = new Field('FieldErrorHandler');
Fields.FieldTestGame = new Field('FieldTestGame');


// end of generated code


