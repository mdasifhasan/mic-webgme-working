/**
 * Created by AH on 10/31/2016.
 */
addSprite = function (sim, name, x, y, imageName) {
    var group = null,
        enablePhysics = false,
        scaleX = 1,
        scaleY = 1,
        immovable = false;
    var OnCreate = function () {
    };
    OnCreate.prototype.trigger = function (course) {
        // The player and its settings
        var a;
        if (this.group === null) {
            a = game.add.sprite(this.x, this.y, imageName);
            if (this.enablePhysics)
                game.physics.arcade.enable(a);
        }
        else
            this.group.create(x, y, 'ground');

        a.scale.setTo(this.scaleX, this.scaleY);
        a.body.immovable = this.immovable;
        return true;
    };

    var a = new Agent(name);
    var create = new Course("create", null, new OnCreate());
    a.addCourse(create);

    sim.agents["Canvas"].courses["create"].subscribePostCourse(create);
    sim.addAgent(a);

    // this should be set to a data of a field
    return this;
};