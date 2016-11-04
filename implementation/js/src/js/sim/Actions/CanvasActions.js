/**
 * Created by AH on 11/3/2016.
 */
var CanvasActions = function () {

};

CanvasActions.register = function () {
    Fields.root.getChild("Canvas").subscribeToInterface("createSprite", createSprite);
    Fields.root.getChild("Canvas").getChild("Group").subscribeToInterface("addGroup", addGroup);
};

var Groups = {};
var addGroup = function (groupName, dataGroup) {
    console.log("Field Action addGroup is called");
    if (dataGroup in Groups) {
        dataGroup.value = Groups[dataGroup.name];
    } else {
        dataGroup.value = game.add.group();
        Groups[dataGroup.name] = dataGroup.value;
    }
    a.a(0);
};


var createSprite = function (data) {
    var a;
    if (data.group === null || data.group.value === null) {
        a = game.add.sprite(data.x, data.y, data.imageName);
        if (data.enablePhysics)
            game.physics.arcade.enable(a);
    }
    else
        data.group.value.create(data.x, data.y, data.imageName);

    a.scale.setTo(data.scaleX, data.scaleY);
    a.body.immovable = data.immovable;
    a.body.gravity.x = data.gravityX;
    a.body.gravity.y = data.gravityY;
    a.body.bounce.y = data.bounceY;
    a.body.bounce.y = data.bounceY;

    console.log("create sprite");
    return true;
}