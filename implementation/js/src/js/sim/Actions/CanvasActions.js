/**
 * Created by AH on 11/3/2016.
 */
var CanvasActions = function () {

};

CanvasActions.register = function () {
    Fields.root.getChild("Canvas").getChild("Group").addInterface("addGroup", addGroup);
};

var addGroup = function (dataGroup) {
    dataGroup.value = game.add.group();
};

var createSprite = function (data) {
    var a;
    if (data.group === null) {
        a = game.add.sprite(data.x, data.y, data.imageName);
        if (data.enablePhysics)
            game.physics.arcade.ensable(a);
    }
    else
        data.group.create(data.x, data.y, data.imageName);

    a.scale.setTo(data.scaleX, data.scaleY);
    a.body.immovable = data.immovable;
    a.body.gravity.x = data.gravityX;
    a.body.gravity.y = data.gravityY;
    a.body.bounce.y = data.bounceY;
    a.body.bounce.y = data.bounceY;

    return true;
}