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
    'text!./Templates/Templates.js',
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
            } else {
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

    JSCodeGenerator.prototype.createdAgents = {};
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
            else if (self.core.isTypeOf(childNode, self.META['Fields'])) {
                self.extractFields(nodes, childNode, agentModel);
            }
            else if (self.core.isTypeOf(childNode, self.META['Data Structure'])) {
                agentModel.DataStructure = self.extractDataStructures(nodes, childNode);
            }
            else if (self.core.isTypeOf(childNode, self.META['Courses'])) {
                agentModel.Courses = self.extractCourses(nodes, childNode);
            }
            else if (self.core.isTypeOf(childNode, self.META['Course Actions'])) {
                agentModel.CourseActions = self.extractCourseActions(nodes, childNode);
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


    JSCodeGenerator.prototype.extractCourseActions = function (nodes, nodeCourseActions) {
        var self = this;
        var childrenPaths = self.core.getChildrenPaths(nodeCourseActions);
        var courseActions = {};
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['CourseAction'])) {
                courseActions[cname+"_NNN"] = self.extractCourseAction(nodes, childNode);
            }
            else {
                // self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
        return courseActions;
    };

    JSCodeGenerator.prototype.extractCourseAction = function (nodes, nodeCourse) {
        var self = this;
        self.logger.info("checking under course node:" , self.core.getAttribute(nodeCourse, 'name'));
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
        if(size === 0)
            return [];
        var n = start;
        while(true){
            n = next[n];
            if(n === null || n === end)
                break;
            if(Courses.indexOf(n) > -1)
                break;
            // stop when cyclic reference to a course is detected
            Courses.push(n);
        }
        return Courses;
    };


    JSCodeGenerator.prototype.extractCourses = function (nodes, nodeCourses) {
        var self = this;
        var childrenPaths = self.core.getChildrenPaths(nodeCourses);
        var Courses = {};
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['Course'])) {
                Courses[cname] = self.extractCourse(nodes, childNode);
            }
            else {
                // self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
        return Courses;
    };

    JSCodeGenerator.prototype.extractCourse = function (nodes, nodeCourse) {
        var self = this;
        self.logger.info("checking under course node:" , self.core.getAttribute(nodeCourse, 'name'));
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
        if(size === 0)
            return [];
        var n = start;
        while(true){
            n = next[n];
            if(n === null || n === end)
                break;
            if(Courses.indexOf(n) > -1)
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
                var data = data.map(function (node) {
                    var path = self.core.getPointerPath(node, 'refer');
                    return self.extractPathAddress(nodes, path, "Data");
                });
                iAction.data = data;

                var signals = self.extractChildOfMeta(nodes, "FireSignal", childNode);
                var signals = signals.map(function (node) {
                    var name = self.core.getAttribute(node, 'name');
                    return name;
                });
                iAction.signals = signals;
            }
            else if (self.core.isTypeOf(childNode, self.META['IData'])) {
                var iData = {};
                if (!("DataFields" in jsonModel))
                    jsonModel.DataFields = {};
                jsonModel.DataFields[cname] = iData;

                var path = self.core.getPointerPath(childNode, 'refer');
                iData.type = self.extractPathAddress(nodes, path, "Data");

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
            if (self.core.isTypeOf(childNode, self.META['Number'])) {
                DataStructure[cname] = self.core.getAttribute(childNode, 'value');
            }
            else if (self.core.isTypeOf(childNode, self.META['Text'])) {
                DataStructure[cname] = self.core.getAttribute(childNode, 'value');
            }
            else if (self.core.isTypeOf(childNode, self.META['Boolean'])) {
                DataStructure[cname] = self.core.getAttribute(childNode, 'value');
            }
            else if (self.core.isTypeOf(childNode, self.META['Object'])) {
                DataStructure[cname] = self.core.getAttribute(childNode, 'value');
            }
            else if (self.core.isTypeOf(childNode, self.META['Data'])) {
                DataStructure[cname] = self.extractDataStructures(nodes, childNode);
            }
            else {
                self.logger.info("Ignoring unexpected model under Agents.");
            }
        }
        return DataStructure;
    };

    JSCodeGenerator.prototype.extractPathAddress = function (nodes, path, metaType) {
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
            return a + "/" + b;
        }, "");
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
            if (self.core.isTypeOf(childNode, self.META['Agent Signal'])) {
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
            codeFileName,
            batchFileName;

        artifact = self.blobClient.createArtifact('GeneratedCode');
        filesToAdd['sim.json'] = JSON.stringify(jsonModel, null, 2);
        filesToAdd['metadata.json'] = JSON.stringify({
            projectId: self.projectId,
            commitHash: self.commitHash,
            branchName: self.branchName,
            timeStamp: (new Date()).toISOString(),
            pluginVersion: self.getVersion()
        }, null, 2);

        // for (language in TEMPLATES) {
        //     codeFileName = 'FSM-GeneratedCode/' + language + '/Program.' + TEMPLATES[language].extension;
        //     batchFileName = 'FSM-GeneratedCode/' + language + '/execute.bat';
        //
        //     filesToAdd[codeFileName] = ejs.render(TEMPLATES[language].code, {stateMachine: jsonModel});
        //     filesToAdd[batchFileName] = ejs.render(TEMPLATES[language].batch, {stateMachine: jsonModel});
        //
        // }

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


