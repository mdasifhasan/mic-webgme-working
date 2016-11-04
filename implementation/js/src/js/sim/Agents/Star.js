/**
 * Created by AH on 10/31/2016.
 */
addStar = function (sim, name, x, y) {
    var OnStarCreate = function () {
    };
    OnStarCreate.prototype.trigger = function (course) {
        var star = game.add.sprite(x, y, 'star');
        game.physics.arcade.enable(star);
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        return true;
    };

    var star = new Agent(name);
    var starCreate = new Course("starCreate", null, new OnStarCreate());
    star.addCourse(starCreate);

    sim.agents["Canvas"].courses["create"].subscribePostCourse(starCreate);
    sim.addAgent(star);
};