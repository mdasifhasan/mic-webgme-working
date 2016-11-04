/**
 * Created by AH on 11/2/2016.
 */

var sim = new Simulation("Game Simulation");


var SimAgent = new Agent("sim");
sim.addAgent(SimAgent);

addCanvas(sim);
addStar(sim, "star1", 21, 0);
addStar(sim, "star2", 144, 0);

platforms = addGroup("platforms", true);
g = addSprite(sim, 'ground', 0, 600-64, 'ground');
g.immovable = true;
g.group = platforms;
