/**
 * Created by AH on 10/30/2016.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function createTest() {
    var count = 0;
    while(count < 30){
        count++;
        console.log(count, " updating simulation - ", count)
        if(sim.update())
            break;
    }
    console.log("simulation finished- ", count)
}


function create() {

}

function update() {



}
