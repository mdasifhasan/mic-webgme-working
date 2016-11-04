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
    return true;
};


var createSprite = function (dataSprite) {
    var a;
    if (dataSprite.group === null || dataSprite.group.value === null) {
        a = game.add.sprite(dataSprite.x, dataSprite.y, dataSprite.imageName);
        if (dataSprite.enablePhysics)
            game.physics.arcade.enable(a);
    }
    else
        dataSprite.group.value.create(dataSprite.x, dataSprite.y, dataSprite.imageName);

    a.scale.setTo(dataSprite.scaleX, dataSprite.scaleY);
    a.body.immovable = dataSprite.immovable;
    a.body.gravity.x = dataSprite.gravityX;
    a.body.gravity.y = dataSprite.gravityY;
    a.body.bounce.y = dataSprite.bounceY;
    a.body.bounce.y = dataSprite.bounceY;

    console.log("create sprite");
    return true;
};