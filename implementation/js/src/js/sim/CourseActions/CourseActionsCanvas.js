/**
 * Created by hasanm on 11/4/2016.
 */
var CreateSprite = function () {
};

CreateSprite.prototype.trigger = function (course) {
    var dataSprite = course.owner.data.dataSprite;
    var res = Fields.root.getChild("Canvas").triggerAction("createSprite", dataSprite);
    return res;
};

var CreateGroup = function () {
};

CreateGroup.prototype.trigger = function (course) {
    var dataSprite = course.owner.data.dataSprite;
    var res = Fields.root.getChild("Canvas").getChild("Group").triggerAction("addGroup", dataSprite.group);
    console.log("Course CreateGroup is finished :", res);
    return res;
};

var CheckCollision = function () {
};

CheckCollision.prototype.trigger = function (course) {
    var res = Fields.root.getChild("Canvas").getChild("Collision").triggerAction("checkCollision");
    return res;
};


var AddCollisionCheck = function () {
};

AddCollisionCheck.prototype.trigger = function (course) {
    var data = [];
    data[0] = sim.agents["player"].sprite.data.dataSprite.physics.body;
    data[1] = sim.agents["star1"].sprite.data.dataSprite.group.value;
    var res = Fields.root.getChild("Canvas").getChild("Collision").triggerAction("addCollisionCheck", data);

    data = [];
    data[0] = sim.agents["player"].sprite.data.dataSprite.physics.body;
    data[1] = sim.agents["ground"].sprite.data.dataSprite.group.value;
    res = res && Fields.root.getChild("Canvas").getChild("Collision").triggerAction("addCollisionCheck", data);

    return res;
};

