/**
 * Created by hasanm on 11/4/2016.
 */
var DataPhysics = function () {
    this.enablePhysics = false;
    this.immovable = false;
    this.gravity = {};
    this.gravity.x = 0;
    this.gravity.y = 300;
    this.bounce = {};
    this.bounce.x = 0;
    this.bounce.y = .5;
    this.collideWorldBounds = false;
    this.body = null;
};

var DataGroup = function () {
    this.name = "default";
    this.value = null;
    this.enablePhysics = false;
};

var DataSprite = function () {
    this.x = 0;
    this.y = 0;
    this.imageName = "default";
    this.group = new DataGroup();
    this.scale = {};
    this.scale.x = 1;
    this.scale.y = 1;
    this.physics = new DataPhysics();
};