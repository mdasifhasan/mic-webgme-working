/**
 * Created by hasanm on 11/4/2016.
 */

var ClassA = function() {
    this.name = "class A";
}

ClassA.prototype.print = function() {
    console.log(this.name);
}

var a = new ClassA();

a.print();

var ClassB = function() {
    this.name = "class B";
    this.surname = "I'm the child";
}

inheritsFrom(ClassB, ClassA);

var b = new ClassB();
b.print();