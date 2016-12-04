/**
 * Created by dasif on 12/3/2016.
 */

ModuleGameEngine = function(){
    this.i = 0;
    this.isCreate = false;
};

ModuleGameEngine.prototype.init = function(signal_SignalUpdate, signal_SignalCreate){
    console.log("Initializing ModuleGameEngine, I will trigger Signal Update and Create, ", this.i);
    this.signal_SignalUpdate = signal_SignalUpdate;
    this.signal_SignalCreate = signal_SignalCreate;
    setTimeout(step(this), 1000);
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
    if(this.i < 1){
        setTimeout(step(this), 10000);
    }else{
        console.log("step finished");
    }
};

ModuleSpriteActions = function(){
};

ModuleSpriteActions.prototype.init = function(){
    console.log("Initializing ModuleSpriteActions, I am responsible for Sprite Creation");
};


ModuleSpriteActions.prototype.CreateSprite_refer = function(DataSprite, DataSprite2, signal_Error){


};

ModuleSpriteActions.prototype.CreateGroup_refer = function(Group_type, signal_Error){

};
