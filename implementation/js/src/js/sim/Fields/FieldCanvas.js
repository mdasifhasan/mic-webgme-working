/**
 * Created by AH on 11/3/2016.
 */
var FieldCanvas = new function () {};
FieldCanvas.createInstance = function (parent) {
    console.log("Creating instance of type FieldCanvas");
    var canvas = new Field("Canvas");
    parent.addChild(canvas);
    FieldCanvas.FieldGroup.createInstance(canvas);
    console.log("checking if field is successfully registered: ", Fields.root.getChild("Canvas"));
};

FieldCanvas.FieldGroup = new function () {};
FieldCanvas.FieldGroup.createInstance= function (parent) {
    console.log("Creating instance of type FieldCanvas.FieldGroup");
    var group = new Field("Group");
    parent.addChild(group);
};
