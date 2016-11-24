/**
 * Created by AH on 11/22/2016.
 */

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};



// ************ Simulation ************  //
var Simulation = function (name) {
    this.name = name;
    this.agents = {};
};

Simulation.prototype.createSignal = function (signal) {
    if (signal in this.signals)
        return;
    this.signals[signal] = [];
};

Simulation.prototype.subscribeSignal = function (signal, agent, agentSignal) {
    if (!(signal in this.signals))
        this.createSignal(signal);
    this.signals[signal].push([agent, agentSignal]);
};

Simulation.prototype.fireSignal = function (signal) {
    if (signal in this.signals) {
        var i;
        for (i = 0; i < this.signals[signal].length; i++)
            this.signals[signal][i][0].fireSignal(this.signals[signal][i][1]);
    }
};

Simulation.prototype.addAgent = function (agent) {
    this.agents[agent.name] = agent;
};

Simulation.prototype.removeAgent = function (agent) {
    if (agent.name in this.agents)
        delete this.agents[agent.name];
};

Simulation.prototype.update = function () {
    var i;
    var isFinished = true;
    for (var a in this.agents) {
        isFinished = this.agents[a].update();
    }
    return isFinished;
};
