/**
 * Created by AH on 11/2/2016.
 */
addGroup = function (groupName, enablePhysics) {
    g = game.add.group();
    g.enableBody = enablePhysics;
    return g;
}