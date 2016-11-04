/**
 * Created by AH on 11/2/2016.
 */
addGroup = function (groupName, enablePhysics) {
    // implementation of groups need be changed using data and field structure
    // basically there should be a field called group manager which will create and provide groups
    // each group would be indexed by a string typed group name
    // this agent would subscribe to be the group manager
    // other agents i.e. sprites which may use group would call this group manager field to set
    // the group variable by passign a group string
    // Infact, this particular use case is very good to create and test the field architecture as well as
    // the datastructure architecture
    g = game.add.group();
    g.enableBody = enablePhysics;
    return g;
}