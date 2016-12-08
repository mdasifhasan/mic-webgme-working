
Canvas.library.Collider.Collider = function(){
};

Canvas.library.Collider.Collider.prototype.init = function(){
    
        this.implementation = new ModuleCollider();
        this.implementation.init();
    
};


Canvas.library.Collider.Collider.prototype.CheckCollision = function(){

        return this.implementation.CheckCollision();

};

Canvas.library.Collider.Collider.prototype.AddCollisionCheck = function(groupNameB, groupNameA){

        return this.implementation.AddCollisionCheck(groupNameB, groupNameA);

};

Canvas.library.Collider.Collider.prototype.CheckOverlap = function(groupName, dataSprite, signal_overlap, signal_notOverlap){

        return this.implementation.CheckOverlap(groupName, dataSprite, signal_overlap, signal_notOverlap);

};







