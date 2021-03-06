/**
 * Created by AH on 10/30/2016.
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var sim = new Simulation("Game Simulation");

var debug = {};
debug.log = function(){
    // console.log(arguments);
    if(arguments[0] === "_force"){
        console.log.apply(null, arguments);
    }
}

debug.force = function(){
    console.log.apply(null, arguments);
}




function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function register(sim) {
    RegisterAgents(sim);
    RegisterFields();
    RegisterFieldActions();
}

function create() {
    register(sim);
    sim.fireSignal("create");
    while (!sim.update())
        continue;
}

function update() {
    sim.fireSignal("update");
    sim.update();
    // debug.force("me");
}
