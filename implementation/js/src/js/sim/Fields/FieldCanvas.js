/**
 * Created by AH on 11/3/2016.
 */
var FieldCanvas = new function () {};
FieldCanvas.createInstance = function (parent) {
    console.log("Creating instance of type FieldCanvas");
    var field = new Field("Canvas");
    parent.addChild(field);
    FieldCanvas.FieldGroup.createInstance(field);
    FieldCanvas.FieldCollision.createInstance(field);
    // console.log("checking if field is successfully registered: ", Fields.root.getChild("Canvas"));
};

FieldCanvas.FieldGroup = new function () {};
FieldCanvas.FieldGroup.createInstance= function (parent) {
    console.log("Creating instance of type FieldCanvas.FieldGroup");
    var field = new Field("Group");
    parent.addChild(field);
};

FieldCanvas.FieldCollision = new function () {};
FieldCanvas.FieldCollision.createInstance= function (parent) {
    console.log("Creating instance of type FieldCanvas.FieldCollsion");
    var field = new Field("Collision");
    parent.addChild(field);
};
