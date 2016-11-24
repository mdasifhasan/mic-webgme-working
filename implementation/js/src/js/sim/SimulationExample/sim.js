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

var test=function(){
    testDictionary();
    testDataSprite();
};

test();