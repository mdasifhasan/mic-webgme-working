/*globals define*/
/*jshint node:true, browser:true*/

/**
 * Generated by PluginGenerator 1.7.0 from webgme on Sat Nov 05 2016 18:48:11 GMT-0500 (Central Daylight Time).
 * A plugin that inherits from the PluginBase. To see source code documentation about available
 * properties and methods visit %host%/docs/source/PluginBase.template.
 */

define([
    'plugin/PluginConfig',
    'text!./metadata.json',
    'plugin/PluginBase',
    'common/util/ejs',
    'plugin/JSCodeGenerator/JSCodeGenerator/Templates/Templates',
    'q'

], function (PluginConfig,
             pluginMetadata,
             PluginBase,
             ejs,
             TEMPLATES,
             Q) {
    'use strict';

    pluginMetadata = JSON.parse(pluginMetadata);

    /**
     * Initializes a new instance of JSCodeGenerator.
     * @class
     * @augments {PluginBase}
     * @classdesc This class represents the plugin JSCodeGenerator.
     * @constructor
     */
    var JSCodeGenerator = function () {
        // Call base class' constructor.
        PluginBase.call(this);
        this.pluginMetadata = pluginMetadata;
    };

    /**
     * Metadata associated with the plugin. Contains id, name, version, description, icon, configStructue etc.
     * This is also available at the instance at this.pluginMetadata.
     * @type {object}
     */
    JSCodeGenerator.metadata = pluginMetadata;

    // Prototypical inheritance from PluginBase.
    JSCodeGenerator.prototype = Object.create(PluginBase.prototype);
    JSCodeGenerator.prototype.constructor = JSCodeGenerator;


    /**
     * Main function for the plugin to execute. This will perform the execution.
     * Notes:
     * - Always log with the provided logger.[error,warning,info,debug].
     * - Do NOT put any user interaction logic UI, etc. inside this method.
     * - callback always has to be called even if error happened.
     *
     * @param {function(string, plugin.PluginResult)} callback - the result callback
     */
    JSCodeGenerator.prototype.main = function (callback) {
        // Use self to access core, project, result, logger etc from PluginBase.
        // These are all instantiated at this point.
        var self = this,
            nodeObject,
            jsonModel;

        // Using the coreAPI to make changes.

        nodeObject = self.activeNode;

        self.loadNodeMap(nodeObject)
            .then(function (nodes) {
                self._nodes = nodes;

                // for testing purpose
                // detecting Simulation Example
                var childrenPaths = self.core.getChildrenPaths(nodeObject);
                for (var i = 0; i < childrenPaths.length; i++) {
                    var childNode = nodes[childrenPaths[i]];
                    var name = self.core.getAttribute(childNode, 'name');
                    if (name === "Simulation Example") {
                        nodeObject = childNode;
                        break;
                    }
                }
                // delete the code segment above written
                // for testing purpose

                jsonModel = self.getJSONModel(nodeObject, nodes);
                self.logger.info(JSON.stringify(jsonModel, null, 2));

                return self.generateArtifact(jsonModel);
            })
            .then(function (artifactHash) {
                self.result.addArtifact(artifactHash);
                self.result.setSuccess(true);
                callback(null, self.result);
            })
            .catch(function (err) {
                // Result success is false at invocation.
                self.logger.error(err.stack);
                callback(err, self.result);
            });

    };

    JSCodeGenerator.prototype.getJSONModel = function (root, nodes) {
        var self = this;
        var jsonModel = {};
        var name = self.core.getAttribute(root, 'name');
        jsonModel.name = name;
        self.logger.info("The simulation node's name: ", name);

        var nodeAgents = null,
            nodeSignals = null;
        var childrenPaths = self.core.getChildrenPaths(root);
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            if (self.core.isTypeOf(childNode, self.META['Agents'])) {
                nodeAgents = childNode;
            }
            else if (self.core.isTypeOf(childNode, self.META['Fields'])) {
                self.extractFields(nodes, childNode, jsonModel);
            }
            else if (self.core.isTypeOf(childNode, self.META['DataTypes'])) {
                jsonModel.DataTypes = self.extractDataStructures(nodes, childNode);
            }
            else {
                self.logger.info("Ignoring unexpected models under simulation.");
            }
        }


        if (nodeAgents !== null) {
            var agents = self.extractAgents(nodes, nodeAgents);
            if (agents.length !== 0)
                jsonModel.Agents = agents;
        }

        return jsonModel;
    };
    JSCodeGenerator.prototype.errorMessages = [];

    JSCodeGenerator.prototype.extractAgents = function (nodes, nodeAgents) {
        var self = this;
        var agents = {};
        var childrenPaths = self.core.getChildrenPaths(nodeAgents);
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['Agent'])) {
                var agent = {};
                agent.name = cname;
                agents[cname] = agent;
                self.extractAgent(nodes, childNode, agent);
            } else {
                self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
        return agents;
    };

    JSCodeGenerator.prototype.extractAgent = function (nodes, nodeAgent, agentModel) {
        var self = this;
        var childrenPaths = self.core.getChildrenPaths(nodeAgent);
        var aname = self.core.getAttribute(nodeAgent, 'name');
        self.logger.info("extracting agent", aname + ", total childrens: ", childrenPaths.length);
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['Agent Signals'])) {
                self.extractAgentSignals(nodes, childNode, agentModel);
            }
            else if (self.core.isTypeOf(childNode, self.META['Data Structure'])) {
                agentModel.Data = self.extractDataStructures(nodes, childNode);
            }
            else if (self.core.isTypeOf(childNode, self.META['Courses'])) {
                agentModel.Courses = self.extractCourses(nodes, childNode, nodeAgent);
            }
            else if (self.core.isTypeOf(childNode, self.META['Course Actions'])) {
                agentModel.CourseActions = self.extractCourseActions(nodes, childNode, nodeAgent);
            }
            else if (self.core.isTypeOf(childNode, self.META['library agents'])) {
                var lagents = self.extractAgents(nodes, childNode);
                if (lagents.length !== 0)
                    agentModel.libraryAgents = lagents;
            }
            else if (self.core.isTypeOf(childNode, self.META['Childs'])) {
                var lagents = self.extractAgents(nodes, childNode);
                if (lagents.length !== 0)
                    agentModel.childs = lagents;
            }
            else {
                self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
    };


    JSCodeGenerator.prototype.extractCourseActions = function (nodes, nodeCourseActions, nodeAgent) {
        var self = this;
        var childrenPaths = self.core.getChildrenPaths(nodeCourseActions);
        var courseActions = {};
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['CourseAction'])) {
                courseActions[cname] = self.extractCourseAction(nodes, childNode, nodeAgent);
            }
            else {
                // self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
        return courseActions;
    };

    JSCodeGenerator.prototype.extractConnNode = function (node, nodes, isReturnName) {
        var self = this;
        var value = null;
        var t = self.core.getCollectionPaths(node, 'dst');
        if (t !== null && t.length !== 0) {
            t = t[0];
            var v = self.core.getPointerPath(nodes[t], "src");
            value = nodes[v];
            if (isReturnName)
                value = self.core.getAttribute(value, 'name');
        }

        if (value === null) {
            t = self.core.getCollectionPaths(node, 'src');
            if (t !== null && t.length !== 0) {
                t = t[0];
                var v = self.core.getPointerPath(nodes[t], "dst");
                value = nodes[v];
                if (isReturnName)
                    value = self.core.getAttribute(value, 'name');
            }
        }
        return value;
    }
    JSCodeGenerator.prototype.extractConnNodeFromParent = function (node, nodes, transitionMeta, isReverse) {
        var self = this;
        var valueNode = null;
        var t = self.extractChildOfMeta(nodes, transitionMeta, self.core.getParent(self.core.getParent(node)));

        if (!isReverse) {
            for (var i = 0; i < t.length; i++) {
                var dst = self.core.getPointerPath(t[i], 'dst');
                if (dst == self.core.getPath(node)) {
                    var src = self.core.getPointerPath(t[i], 'src');
                    valueNode = nodes[src];
                    break;
                }
            }
        } else {
            for (var i = 0; i < t.length; i++) {
                var dst = self.core.getPointerPath(t[i], 'src');
                if (dst == self.core.getPath(node)) {
                    var src = self.core.getPointerPath(t[i], 'dst');
                    valueNode = nodes[src];
                    break;
                }
            }
        }
        return valueNode;
    }
    JSCodeGenerator.prototype.extractCourseAction = function (nodes, nodeCourseAction, nodeAgent) {
        var self = this;
        var ca = {};
        var data = self.extractChildOfMeta(nodes, "IData", nodeCourseAction);
        if (data.length !== 0) {
            ca.data = {};
            data.map(function (node) {
                var path = self.core.getPointerPath(node, 'type');
                path = self.extractPathAddress(nodes, path, "Data", "DataTypes");
                var j = {};
                var name = self.core.getAttribute(node, "name");
                j.type = path;
                var valueNode = self.extractConnNodeFromParent(node, nodes, "Feed Data");
                valueNode = self.core.getPointerPath(valueNode, 'refer');
                j.value = self.extractLocalPathAddress(nodes, valueNode, "Data", "Data", nodeAgent);
                ca.data[name] = j;
                return j;
            });

        }

        var dataFields = self.extractChildOfMeta(nodes, "IFieldData", nodeCourseAction);
        if (dataFields.length !== 0) {
            ca.FieldData = {};
            dataFields.map(function (node) {
                var path = self.core.getPointerPath(node, 'type');
                path = self.extractPathAddress(nodes, path, "Data", "DataTypes");
                var j = {};
                var name = self.core.getAttribute(node, "name");
                j.type = path;
                var valueNode = self.extractConnNodeFromParent(node, nodes, "FeedFieldData");
                valueNode = self.core.getPointerPath(valueNode, 'refer');
                j.value = self.extractFieldDataAddress(nodes, valueNode);
                ca.FieldData[name] = j;
                return j;
            });
        }

        var signals = self.extractChildOfMeta(nodes, "CourseActionSignal", nodeCourseAction);
        if (signals.length !== 0) {
            ca.CourseActionSignals = {};
            signals.map(function (node) {
                var j = {};
                var name = self.core.getAttribute(node, "name");
                // j.Signal = self.extractConnNode(node, nodes, true)
                var valueNode = self.extractConnNodeFromParent(node, nodes, "ConnectSignal", true);
                valueNode = self.core.getPointerPath(valueNode, 'refer');
                // j.Signal = self.extractFieldDataAddress(nodes, valueNode);
                j.Signal = self.extractSignalPath(nodes, nodes[valueNode], nodeAgent);
                ca.CourseActionSignals[name] = j;
                return j;
            });
        }

        ca.fieldActions = [];

        var start = self.extractChildOfMeta(nodes, "Course Action Start", nodeCourseAction)[0];
        var nc = start;
        while (nc !== null) {
            self.logger.info("nc name:", self.core.getPath(nc));
            var transition = self.core.getCollectionPaths(nc, 'src');
            self.logger.info("transition:", transition);
            if (transition === null || transition.length === 0)
                break;
            transition = transition[0];
            nc = self.core.getPointerPath(nodes[transition], "dst");
            if (nc !== null) {
                nc = nodes[nc];
                if (self.core.isTypeOf(nc, self.META['Course Action End'])) {
                    break;
                }
                nc = self.core.getParent(nc);
                var s = {};
                s.name = self.core.getAttribute(nc, "name");
                if (self.core.isTypeOf(nc, self.META['IAction'])) {
                    s.type = "IAction";

                    var data = self.extractChildOfMeta(nodes, "IData", nc);
                    if (data.length !== 0) {
                        s.data = {};
                        data.map(function (node) {
                            var path = self.core.getPointerPath(node, 'type');
                            path = self.extractPathAddress(nodes, path, "Data", "DataTypes");
                            var j = {};
                            var name = self.core.getAttribute(node, "name");
                            j.type = path;
                            j.value = self.extractConnNode(node, nodes, true);
                            s.data[name] = j;
                            return j;

                        });
                    }

                    var dataFields = self.extractChildOfMeta(nodes, "IFieldData", nc);
                    if (dataFields.length !== 0) {
                        s.FieldData = {};
                        dataFields.map(function (node) {
                            var path = self.core.getPointerPath(node, 'type');
                            path = self.extractPathAddress(nodes, path, "Data", "DataTypes");
                            var j = {};
                            var name = self.core.getAttribute(node, "name");
                            j.type = path;
                            j.value = self.extractConnNode(node, nodes, true);
                            s.FieldData[name] = j;
                            return j;
                        });
                    }


                    var signals = self.extractChildOfMeta(nodes, "ActionSignal", nc);
                    if (signals.length !== 0) {
                        s.ActionSignals = {};
                        signals.map(function (node) {
                            var j = {};
                            var name = self.core.getAttribute(node, "name");
                            j.CourseActionSignal = self.extractConnNode(node, nodes, true);
                            s.ActionSignals[name] = j;
                            return j;
                        });
                    }
                }
                ca.fieldActions.push(s);
                nc = self.extractChildOfMeta(nodes, "End Action", nc)[0];
            }
            else break;
        }

        return ca;
    };

    JSCodeGenerator.prototype.extractSignalPath = function (nodes, s, agentNode) {
        var self = this;
        var parent = self.core.getParent(s);
        var signal = {};
        if (self.core.isTypeOf(parent, self.META['Field'])) {
            // signal.name = self.core.getAttribute(s, "name");
            // signal.type = "Field";
            // signal.path = self.extractPathAddress(nodes, self.core.getPath(parent),
            //     "Field", "Fields");
            signal = self.extractFieldDataAddress(nodes, self.core.getPath(s));
        } else {
            // agents local signal
            signal.name = self.core.getAttribute(s, "name");
            signal.type = "local";
            signal = self.extractLocalPathAddress(nodes, self.core.getPath(s), "Signal", "AgentSignals", agentNode);
        }
        return signal;
    };

    JSCodeGenerator.prototype.extractCourses = function (nodes, nodeCourses, nodeAgent) {
        var self = this;
        var childrenPaths = self.core.getChildrenPaths(nodeCourses);
        var Courses = {};
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['Course'])) {
                var c = self.extractCourse(nodes, childNode);
                var signals = [];
                var connNodes = self.core.getCollectionPaths(childNode, 'dst');
                if (connNodes != null) {
                    connNodes.map(function (p) {
                        var s = self.core.getPointerPath(nodes[p], "src");
                        s = nodes[s];
                        s = nodes[self.core.getPointerPath(s, "refer")];
                        var signal = self.extractSignalPath(nodes, s, nodeAgent);
                        signals.push(signal);
                    });
                }

                Courses[cname] = {};
                if (c.length > 0)
                    Courses[cname].childs = c;
                if (signals.length > 0)
                    Courses[cname].signals = signals;
            }
            else {
                // self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
        return Courses;
    };

    JSCodeGenerator.prototype.extractCourse = function (nodes, nodeCourse, nodeAgent) {

        var self = this;

        var start = self.extractChildOfMeta(nodes, "Start", nodeCourse)[0];

        var courses = [];
        var nc = start;
        while (nc !== null) {
            var transition = self.core.getCollectionPaths(nc, 'src');
            self.logger.info("transition:", transition);
            if (transition === null || transition.length === 0)
                break;
            transition = transition[0];
            nc = self.core.getPointerPath(nodes[transition], "dst");
            if (nc !== null) {
                nc = nodes[nc];
                var s = {};
                s.name = self.core.getAttribute(nc, "name");
                if (!self.core.isTypeOf(nc, self.META['End'])) {
                    if (self.core.isTypeOf(nc, self.META['FireSignal'])) {
                        s.type = "FireSignal";
                        s.isWait = self.core.getAttribute(nc, 'wait');
                        var path = self.core.getPointerPath(nc, "refer");
                        var signal = self.extractSignalPath(nodes, nodes[path], nodeAgent);
                        s.signal = signal;
                    } else if (self.core.isTypeOf(nc, self.META['WaitForSignal'])) {
                        s.type = "WaitForSignal";
                        var path = self.core.getPointerPath(nc, "refer");
                        var signal = self.extractSignalPath(nodes, nodes[path], nodeAgent);
                        s.signal = signal;
                    } else if (self.core.isTypeOf(nc, self.META['Course'])) {
                        s.type = "Course";
                        var childs = self.extractCourse(nodes, nc);
                        if (childs.length > 0)
                            s.childs = childs;
                    }
                    courses.push(s);
                }
            }
            else break;
        }
        return courses;
    };

    JSCodeGenerator.prototype.extractCourseOld = function (nodes, nodeCourse) {

        var self = this;
        self.logger.info("checking under course node:", self.core.getAttribute(nodeCourse, 'name'));
        var start = self.extractChildOfMeta(nodes, "Start", nodeCourse)[0];
        start = self.core.getAttribute(start, "name");
        var end = self.extractChildOfMeta(nodes, "End", nodeCourse)[0];
        end = self.core.getAttribute(end, "name");
        // self.logger.info("start:" , self.core.getAttribute(start, 'name'));
        // self.logger.info("end:" , self.core.getAttribute(end, 'name'));
        var childrenPaths = self.core.getChildrenPaths(nodeCourse);
        var Courses = [];
        var next = {};
        var size = 0;
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            // var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['Transition'])) {
                var src = self.core.getPointerPath(childNode, 'src');
                var dst = self.core.getPointerPath(childNode, 'dst');
                src = nodes[src];
                dst = nodes[dst];
                src = self.core.getAttribute(src, "name");
                dst = self.core.getAttribute(dst, "name");
                next[src] = dst;
                size++;
            }
        }
        if (size === 0)
            return [];
        var n = start;
        while (true) {
            n = next[n];
            if (n === null || n === end)
                break;
            if (Courses.indexOf(n) > -1)
                break;
            // stop when cyclic reference to a course is detected
            Courses.push(n);
        }
        return Courses;
    };


    JSCodeGenerator.prototype.extractFields = function (nodes, nodeFields, jsonModel) {
        var self = this;
        var childrenPaths = self.core.getChildrenPaths(nodeFields);
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['Field'])) {
                var cfield = {};
                // cfield.name = cname;
                self.extractFields(nodes, childNode, cfield);
                if (!("Fields" in jsonModel))
                    jsonModel.Fields = {};
                jsonModel.Fields[cname] = cfield;
            }
            else if (self.core.isTypeOf(childNode, self.META['IAction'])) {
                var iAction = {};
                // iAction.name = cname;
                if (!("Actions" in jsonModel))
                    jsonModel.Actions = {};
                jsonModel.Actions[cname] = iAction;
                var data = self.extractChildOfMeta(nodes, "IData", childNode);
                data = data.map(function (node) {
                    var path = self.core.getPointerPath(node, 'type');
                    path = self.extractPathAddress(nodes, path, "Data", "DataTypes");
                    var j = {};
                    j.name = self.core.getAttribute(node, "name");
                    j.type = path;
                    return j;
                });
                if (data.length !== 0)
                    iAction.Data = data;

                var dataFields = self.extractChildOfMeta(nodes, "IFieldData", childNode);
                dataFields = dataFields.map(function (node) {
                    var path = self.core.getPointerPath(node, 'type');
                    path = self.extractPathAddress(nodes, path, "Data", "DataTypes");
                    var j = {};
                    j.name = self.core.getAttribute(node, "name");
                    j.type = path;
                    return j;
                });
                if (dataFields.length !== 0)
                    iAction.FieldData = dataFields;

                var signals = self.extractChildOfMeta(nodes, "ActionSignal", childNode);
                var signals = signals.map(function (node) {
                    var name = self.core.getAttribute(node, 'name');
                    return name;
                });
                if (signals.length !== 0)
                    iAction.ActionSignals = signals;
            }
            else if (self.core.isTypeOf(childNode, self.META['FieldData'])) {
                var iData = {};
                if (!("FieldData" in jsonModel))
                    jsonModel.FieldData = {};
                jsonModel.FieldData[cname] = iData;

                var path = self.core.getPointerPath(childNode, 'type');
                iData.type = self.extractPathAddress(nodes, path, "Data", "DataTypes");

            }
            else {
                self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
        return jsonModel;
    };


    JSCodeGenerator.prototype.extractDataStructures = function (nodes, nodeFields) {
        var self = this;
        var childrenPaths = self.core.getChildrenPaths(nodeFields);
        var DataStructure = {};
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            DataStructure[cname] = self.extractData(nodes, childNode);
            DataStructure[cname].name = cname;
        }
        return DataStructure;
    };

    JSCodeGenerator.prototype.extractData = function (nodes, childNode) {
        var self = this;

        if (self.core.isTypeOf(childNode, self.META['Number'])) {
            var j = {};
            j.type = "Number";
            j.value = self.core.getAttribute(childNode, 'value');
            return j;
        }
        else if (self.core.isTypeOf(childNode, self.META['Text'])) {
            var j = {};
            j.type = "Text";
            j.value = self.core.getAttribute(childNode, 'value');
            return j;
        }
        else if (self.core.isTypeOf(childNode, self.META['Boolean'])) {
            var j = {};
            j.type = "Boolean";
            j.value = self.core.getAttribute(childNode, 'value');
            return j;
        }
        else if (self.core.isTypeOf(childNode, self.META['Object'])) {
            var j = {};
            j.type = "Object";
            j.objType = self.core.getAttribute(childNode, 'type');
            j.value = null;
            return j;
        }
        else if (self.core.isTypeOf(childNode, self.META['ReferData'])) {
            // not implemented yet
            var j = {};
            j.type = "ReferData";
            var path = self.core.getPointerPath(childNode, 'type');
            j.dataType = self.extractPathAddress(nodes, path, "Data", "DataTypes");
            j.value = null;
            return j;
        }
        else if (self.core.isTypeOf(childNode, self.META['Dictionary'])) {
            var t = "KeyValuePair";
            var pairs = self.extractChildOfMeta(nodes, t, childNode);
            var j = {};
            j.type = "Dictionary";
            j.values = {};
            pairs.map(function (node) {
                // var j = {};
                var key = self.core.getPointerPath(node, "src");
                var value = self.core.getPointerPath(node, "dst");
                key = nodes[key];
                value = nodes[value];
                key = self.core.getAttribute(key, "value");
                // value = self.core.getAttribute(value, "value");
                value = self.extractData(nodes, value);

                j.values[key] = value;
                value.name = key;
                return 0;
            });
            return j;
        }
        else if (self.core.isTypeOf(childNode, self.META['Data'])) {
            var j = {};
            j.type = "Data";
            j.value = self.extractDataStructures(nodes, childNode);
            return j;
        }
        else {
            self.logger.info("Ignoring unexpected model under Agents.");
        }
    };

    JSCodeGenerator.prototype.extractPathAddress = function (nodes, path, metaType, prefix) {
        if (prefix === null)
            prefix = metaType;
        var self = this;
        var pathNames = [];
        if (path != null) {
            var node = nodes[path];
            while (node !== null && (self.core.isTypeOf(node, self.META[metaType]))) {
                var name = self.core.getAttribute(node, 'name');
                pathNames.push(name);
                node = self.core.getParent(node);
            }
        }
        else
            return null;
        pathNames = pathNames.reverse();
        var address = pathNames.reduce(function (a, b) {
            return a + "." + b;
        }, prefix);
        return address;
    };

    JSCodeGenerator.prototype.extractLocalPathAddress = function (nodes, path, metaType, prefix, me) {
        if (prefix === null)
            prefix = metaType;
        var self = this;
        var pathNames = [];
        if (path != null) {
            var node = nodes[path];
            while (node !== null && (self.core.isTypeOf(node, self.META[metaType]))) {
                var name = self.core.getAttribute(node, 'name');
                pathNames.push(name);
                node = self.core.getParent(node);
            }
            var agents = [];
            var p = self.core.getParent(node);
            while (true) {
                if (p === me)
                    break;
                else if (self.core.isTypeOf(p, self.META['Agent']))
                    agents.push(self.core.getAttribute(p, 'name'));
                else if (self.core.isTypeOf(p, self.META['Simulation'])) {
                    break;
                }
                p = self.core.getParent(p);
            }
        }
        else
            return null;
        pathNames = pathNames.reverse();
        var address = pathNames.reduce(function (a, b) {
            return a + "." + b;
        }, prefix);


        if (agents.length > 0) {
            agents = agents.reverse();
            var first = true;
            var agentsAddress = agents.reduce(function (a, b) {
                if (first) {
                    first = false;
                    return a + b;
                }
                else
                    return a + ".childs." + b;
            }, "childs.");
            return agentsAddress + "." + address;
        }

        return address;
    };
    JSCodeGenerator.prototype.extractFieldDataAddress = function (nodes, path) {
        var prefix = "Fields";
        var self = this;
        var pathNames = [];
        if (path != null) {
            var fieldData = nodes[path];
            pathNames.push(self.core.getAttribute(fieldData, 'name'));
            var node = self.core.getParent(fieldData);
            while (node !== null && (self.core.isTypeOf(node, self.META['Field']))) {
                var name = self.core.getAttribute(node, 'name');
                pathNames.push(name);
                node = self.core.getParent(node);
            }
        }
        else
            return null;
        pathNames = pathNames.reverse();
        var address = pathNames.reduce(function (a, b) {
            return a + "." + b;
        }, prefix);
        return address;
    };

    // done
    JSCodeGenerator.prototype.extractAgentSignals = function (nodes, nodeAgentSignals, agentModel) {
        var self = this;
        var AgentSignals = [];
        var childrenPaths = self.core.getChildrenPaths(nodeAgentSignals);
        // self.logger.info("extracting agent signals, total childrens: ", childrenPaths.length);
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['Signal'])) {
                AgentSignals.push(cname);
            }
            else {
                // self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
        if (AgentSignals.length !== 0)
            agentModel.AgentSignals = AgentSignals;
    };

    JSCodeGenerator.prototype.extractChildOfMeta = function (nodes, metaName, holderNode) {
        var self = this;
        var childNodes = [];
        var childrenPaths = self.core.getChildrenPaths(holderNode);
        var holderName = self.core.getAttribute(holderNode, 'name');
        // self.logger.info("extracting", metaName, ", total childrens: ", childrenPaths.length);
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            if (self.core.isTypeOf(childNode, self.META[metaName])) {
                childNodes.push(childNode);
            }
            else {
                // self.logger.info("Ignoring unexpected model under", holderName + ".");
            }
        }
        return childNodes;
    };


    JSCodeGenerator.prototype.loadNodeMap = function (node) {
        var self = this;
        // We need to keep a reference to our plugin instance, inside the callback
        // this no longer refers to the plugin instance.
        return self.core.loadSubTree(node)
            .then(function (nodeArr) {
                var nodes = {},
                    i;
                for (i = 0; i < nodeArr.length; i += 1) {
                    nodes[self.core.getPath(nodeArr[i])] = nodeArr[i];
                }

                return nodes;
            });
    };


    JSCodeGenerator.prototype.generateArtifact = function (jsonModel) {
        var self = this,
            deferred = Q.defer(),
            language,
            artifact,
            filesToAdd = {},
            codeFileName;

        artifact = self.blobClient.createArtifact('GeneratedCode');
        filesToAdd['sim.json'] = JSON.stringify(jsonModel, null, 2);
        filesToAdd['metadata.json'] = JSON.stringify({
            projectId: self.projectId,
            commitHash: self.commitHash,
            branchName: self.branchName,
            timeStamp: (new Date()).toISOString(),
            pluginVersion: self.getVersion()
        }, null, 2);


        for (language in TEMPLATES) {
            codeFileName = 'GeneratedCode/' + language + '/Sim.' + TEMPLATES[language].extension;
            filesToAdd[codeFileName] = ejs.render(TEMPLATES[language].code, {sim: jsonModel});
        }

        artifact.addFiles(filesToAdd, function (err) {
            if (err) {
                deferred.reject(new Error(err));
                return;
            }
            self.blobClient.saveAllArtifacts(function (err, hashes) {
                if (err) {
                    deferred.reject(new Error(err));
                    return;
                }

                deferred.resolve(hashes[0]);
            });
        });

        return deferred.promise;
    };


    var CourseTable = function () {

    };
    CourseTable.prototype.addCourse = function (nodes, path) {

    };

    CourseTable.prototype.getCourseJsonPath = function (path) {

    };


    return JSCodeGenerator;
});


