/**
 * Created by dasif on 12/3/2016.
 */
var Game = null;
ModuleGameEngine = function(){
    this.i = 0;
    this.isCreate = false;
};

ModuleGameEngine.prototype.init = function(signal_SignalUpdate, signal_SignalCreate){
    console.log("Initializing ModuleGameEngine, I will trigger Signal Update and Create, ", this.i);
    this.signal_SignalUpdate = signal_SignalUpdate;
    this.signal_SignalCreate = signal_SignalCreate;
    // setTimeout(step(this), 1000);
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this)});
    Game = this.game;
};

ModuleGameEngine.prototype.preload = function () {
    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
};
ModuleGameEngine.prototype.create = function () {
    this.signal_SignalCreate.fire();
    return true;
};
ModuleGameEngine.prototype.update = function () {

};


var step =function(self){
    return function () {
        self.tick();
    }
};

ModuleGameEngine.prototype.tick = function(){
    this.i++;
    console.log("iteration: ", this.i);
    if(!this.isCreate){
        this.isCreate = true;
        this.signal_SignalCreate.fire();
    }else{
        this.signal_SignalUpdate.fire();
    }
    if(this.i < 2){
        setTimeout(step(this), 10000);
    }else{
        console.log("step finished");
    }
};

ModuleSpriteActions = function(){
    this.Groups = {};
};

ModuleSpriteActions.prototype.init = function(){
    console.log("Initializing ModuleSpriteActions, I am responsible for Sprite Creation");
};


ModuleSpriteActions.prototype.CreateSprite_refer = function(dataSprite, DataSprite2, signal_Error){
    this.game = Game;
    console.log("Creating sprite with data: ", dataSprite);
    var a;
    if (!dataSprite.Group|| !dataSprite.Group['group object'].value) {
        console.log("Creating sprite with normal method: ", a);
        a = this.game.add.sprite(dataSprite.x.value, dataSprite.y.value, dataSprite['image name'].value);
        if (dataSprite['Physics']['enable physics'].value) {
            this.game.physics.arcade.enable(a);
            dataSprite.Physics['physics body'].value = a.body;
        }
    }
    else {
        a = dataSprite.Group['group object'].value.create(dataSprite.x.value, dataSprite.y.value, dataSprite['image name'].value);
        console.log("Creating sprite with group: ", a);
    }

    a.scale.setTo(dataSprite.scale.x.value, dataSprite.scale.y.value);
    if (dataSprite.Physics['enable physics'].value || dataSprite.Group['enable physics'].value) {
        // a.body.gravity.y = 300;
        a.body.immovable = dataSprite.Physics.immovable.value;
        a.body.gravity.x = dataSprite.Physics.gravity.x.value;
        a.body.gravity.y = dataSprite.Physics.gravity.y.value;
        a.body.bounce.x = dataSprite.Physics.bounce.x.value;
        a.body.bounce.y = dataSprite.Physics.bounce.y.value;
        a.body.collideWorldBounds = dataSprite.Physics.collideWorldBounds.value;
    }
    dataSprite.SpriteObject.value = a;
    return true;

};

ModuleSpriteActions.prototype.CreateGroup_refer = function(dataGroup, signal_Error){
    this.game = Game;
    console.log("Creating group with data: ", dataGroup);
    if (dataGroup.name.value in this.Groups) {
        dataGroup['group object'].value = this.Groups[dataGroup.name.value];
    } else {
        var groupObj = this.game.add.group();
        dataGroup['group object'].value = groupObj;
        groupObj.enableBody = dataGroup['enable physics'].value;
        this.Groups[dataGroup.name.value] = groupObj;
    }
    return true;
};
