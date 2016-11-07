/*globals define*/
/*jshint node:true, browser:true*/

/**
 * Generated by PluginGenerator 1.7.0 from webgme on Sat Nov 05 2016 18:48:11 GMT-0500 (Central Daylight Time).
 * A plugin that inherits from the PluginBase. To see source code documentation about available
 * properties and methods visit %host%/docs/source/PluginBase.html.
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
            } else if (self.core.isTypeOf(childNode, self.META['Signals'])) {
                nodeSignals = childNode;
            }else{
                self.logger.info("Ignoring unexpected models under simulation.");
            }
        }

        if(nodeSignals !== null)
            self.extractSimSignals(nodes, nodeSignals, jsonModel);

        return jsonModel;
    };

    JSCodeGenerator.prototype.extractSimSignals = function (nodes, nodeSignals, jsonModel) {
        var self = this;
        var signalNames = [];
        var childrenPaths = self.core.getChildrenPaths(nodeSignals);
        self.logger.info("extracting sim signals, total childrens: ", childrenPaths.length );
        for (var i = 0; i < childrenPaths.length; i++) {
            var childNode = nodes[childrenPaths[i]];
            var cname = self.core.getAttribute(childNode, 'name');
            if (self.core.isTypeOf(childNode, self.META['Sim Signal'])) {
                signalNames.push(self.core.getAttribute(childNode, 'name')) ;
            } else{
                self.logger.info("Ignoring unexpected model under signals.");
            }
        }
        if(signalNames.length !== 0)
            jsonModel.SimSignals = signalNames;
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


    return JSCodeGenerator;
});
