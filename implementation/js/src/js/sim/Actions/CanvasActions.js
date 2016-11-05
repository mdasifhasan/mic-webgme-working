/**
 * Created by AH on 11/3/2016.
 */
var CanvasActions = function () {

};


var fnTest = function (a) {
    console.log("calling fnTest: ", a);

}

var f = [];
f.push(fnTest);
for (var i = 0; i < f.length; i++)
    f[i].apply(null, ["comeon!"]);


CanvasActions.register = function () {
    Fields.root.getChild("Canvas").subscribeToInterface("createSprite", createSprite);
    Fields.root.getChild("Canvas").getChild("Group").subscribeToInterface("addGroup", addGroup);
};

var Groups = {};
var addGroup = function (dataGroup) {
    if (dataGroup.name in Groups) {
        dataGroup.value = Groups[dataGroup.name];
    } else {
        dataGroup.value = game.add.group();
        dataGroup.value.enableBody = dataGroup.enablePhysics;
        console.log("enabling physics for group: ", dataGroup.enablePhysics)
        Groups[dataGroup.name] = dataGroup.value;
    }
    return true;
};


var createSprite = function (dataSprite) {
    console.log("FieldAction create sprite called with args:", dataSprite);
    var a;
    if (dataSprite.group === null || dataSprite.group.value === null) {
        a = game.add.sprite(dataSprite.x, dataSprite.y, dataSprite.imageName);
        if (dataSprite.enablePhysics) {
            game.physics.arcade.enable(a);
        }
    }
    else {
        a = dataSprite.group.value.create(dataSprite.x, dataSprite.y, dataSprite.imageName);
        console.log("a:", a, " body:", a.body);
    }


    a.scale.setTo(dataSprite.scale.x, dataSprite.scale.y);
    a.body.immovable = dataSprite.physics.immovable;
    a.body.gravity.x = dataSprite.physics.gravity.x;
    a.body.gravity.y = dataSprite.physics.gravity.y;
    a.body.bounce.x = dataSprite.physics.bounce.x;
    a.body.bounce.y = dataSprite.physics.bounce.y;

    return true;
};