var Data = function () {

};

// the primitives
var Number = function (value) {
Data.apply(this);
if (value === null)
value = false;
this.value = value;
};
inheritsFrom(Number, Data);

var Boolean = function (value) {
Data.apply(this);
if (value === null)
value = false;
this.value = value;
};
inheritsFrom(Boolean, Data);

var Text = function (value) {
Data.apply(this);
if (value === null)
value = "";
this.value = value;
};
inheritsFrom(Text, Data);

var Obj = function (value, objType) {
Data.apply(this);
this.objType = objType;
this.value = value;
};
inheritsFrom(Obj, Data);

var ReferData = function (value, dataType) {
Data.apply(this);
this.dataType = dataType;
this.value = value;
};
inheritsFrom(ReferData, Data);
// end of the primitives






var DictionarySample = function () {
Data.apply(this);
this['0']=new Number(11);
this['1']=new Number(21);
this['2']=new Number(31);
this['3']={};
this['3']['0']=new Number(2);
this['3']['3']=new Number(4);
this['3']['4']={};
this['3']['4']['0']=new Number(2);
this['3']['abs']=new Number(3);

};
inheritsFrom(DictionarySample , Data);









