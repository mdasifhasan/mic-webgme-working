console.log("Hey I am running");
var canvas = new Canvas("canvas");
// var testGame = new TestGame("testgame");
var sprite = new Canvas.library.Sprite("sprite");
var sprite = new Canvas.library.Sprite("sprite");

var f = function () {
    console.log("f");
};

f.library = {};
f.library.a = function () {
    console.log("a");
};

f.library.a.b = function () {
    console.log("b");
};

a = f.library.a.b();