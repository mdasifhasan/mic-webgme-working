
Canvas.SpriteActions = function(){
};

Canvas.SpriteActions.prototype.init = function(){
    
        this.implementation = new ModuleSpriteActions();
        this.implementation.init();
    
};


Canvas.SpriteActions.prototype.CreateSprite_refer = function(DataSprite, DataSprite2, signal_Error){

        this.implementation.CreateSprite_refer(DataSprite, DataSprite2, signal_Error);

};

Canvas.SpriteActions.prototype.CreateGroup_refer = function(Group_type, signal_Error){

        this.implementation.CreateGroup_refer(Group_type, signal_Error);

};







