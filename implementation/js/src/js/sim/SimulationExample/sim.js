/**
 * Created by AH on 11/22/2016.
 */
var SimulationExample = function (name) {
    Simulation.apply(this, [name]);
};
inheritsFrom(SimulationExample, Simulation);


var testDataSprite = function () {
    console.log("Testing DataSprite");
    var ds = new DataSprite();
    console.log("ds", ds);
    console.log("ds.x.value", ds.x.value);
    console.log("ds.scale.x.value", ds.scale.x.value);
    console.log("ds.physics.bounce.x.value", ds.physics.bounce.y.value);
};

var testDictionary =function(){
    console.log("Testing DataType Dictionary");
    var ds = new DictionarySample();
    console.log("ds", ds);
    console.log("ds.value['0'].value", ds.value['0'].value);
    console.log("ds.value[1].value", ds.value[1].value);
    console.log("ds.value.abs.value", ds.value.abs.value);
    console.log("ds.value[3].value[0].value", ds.value[3].value[0].value);
};


var testField = function () {
    var ds = new DataSprite();
    Fields.Canvas.CreateSprite(ds);
    Fields.Canvas.Group.CreateGroup(ds.Group);

    var d1 = Fields.Canvas.dataSprite.first(); //DataSprite
    console.log("d1: ", d1);
    var dR = Fields.Canvas.dataSprite.random(); //DataSprite
    console.log("dR: ", dR);
    var dAll = Fields.Canvas.dataSprite.all(); //array
    console.log("dAll: ", dAll);
};

var test=function(){
    testField();
    // testDictionary();
    // testDataSprite();
};

test();