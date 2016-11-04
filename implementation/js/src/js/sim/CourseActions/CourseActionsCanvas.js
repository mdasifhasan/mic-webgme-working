/**
 * Created by hasanm on 11/4/2016.
 */
var CreateSprite = function () {
};

CreateSprite.prototype.trigger = function (course) {
    var dataSprite = course.owner.data.dataSprite;
    Fields.root.getChild("Canvas").triggerAction("createSprite", dataSprite);
};

var CreateGroup = function () {
};

CreateGroup.prototype.trigger = function (course) {
    var dataSprite = course.owner.data.dataSprite;
    console.log("Course CreateGroup is running, dataSprite: ", dataSprite);
    Fields.root.getChild("Canvas").getChild("Group").triggerAction("addGroup", dataSprite.group);
    console.log("Course CreateGroup is finished");
};