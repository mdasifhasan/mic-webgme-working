/**
 * Created by AH on 11/2/2016.
 */

var sim = new Simulation("Game Simulation");


var SimAgent = new Agent("sim");
sim.addAgent(SimAgent);
addCanvas(sim);
sim.addAgent(new Star("star"));

// platforms = addGroup("platforms", true);
// g = addSprite(sim, 'ground', 0, 600-64, 'ground');
// g.immovable = true;
// g.group = platforms;
