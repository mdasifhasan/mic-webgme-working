/**
 * Created by dasif on 12/3/2016.
 */

ModuleGameEngine = function(){
};

ModuleGameEngine.prototype.init = function(signal_SignalUpdate, signal_SignalCreate){
    console.log("Initializing ModuleGameEngine, I will trigger Signal Update and Create");
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
