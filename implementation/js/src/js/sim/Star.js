/**
 * Created by AH on 10/31/2016.
 */
addStarAgent = function (sim) {
    var star = new Agent("Star");

    var starCreate = new Course("star create", null, OnStarCreate);
    var starUpdate = new Course("star update", null, OnStarUpdate);
    var childs = [starCreate, starUpdate];
    var starCourse = new Course("star course", childs, null);

    star.addCourse(starCourse);


    var OnStarCreate = function (course) {
        // The player and its settings
        var star = game.add.sprite(32, 0, 'star');

        //  We need to enable physics on the player
        game.physics.arcade.enable(star);

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

        console.log("Star Created");
        return false;
    };


    var OnStarUpdate = function (course) {
        return true;
    };

    sim.addAgent(star);
};