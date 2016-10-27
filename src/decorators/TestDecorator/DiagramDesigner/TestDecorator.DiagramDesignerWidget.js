/*globals define, _*/
/*jshint browser: true, camelcase: false*/
/**
 * This decorator inherits from the ModelDecorator.DiagramDesignerWidget.
 * With no changes to the methods - it will functions just like the ModelDecorator.
 *
 * For more methods see the ModelDecorator.DiagramDesignerWidget.js in the webgme repository.
 *
 * @author pmeijer / https://github.com/pmeijer
 */

define([
    'js/RegistryKeys',
    'js/Constants',
    'decorators/ModelDecorator/DiagramDesigner/ModelDecorator.DiagramDesignerWidget',
    'jquery',
    'underscore'
], function (
    REGISTRY_KEYS,
    CONSTANTS,
    ModelDecoratorDiagramDesignerWidget) {

    'use strict';

    var TestDecorator,
        DECORATOR_ID = 'TestDecorator';

    TestDecorator = function (options) {
        var opts = _.extend({}, options);

        ModelDecoratorDiagramDesignerWidget.apply(this, [opts]);

        this.logger.debug('TestDecorator ctor');

        this.$resultIndicator = $('<span>', {
            text:'Will indicate result'
        });

        this.$runPluginBtn = $('<button>',{
            type : 'button',
            class: 'btn btn-primary',
            text: 'Implement'
        });
    };

    TestDecorator.prototype = Object.create(ModelDecoratorDiagramDesignerWidget.prototype);
    TestDecorator.prototype.constructor = TestDecorator;
    TestDecorator.prototype.DECORATORID = DECORATOR_ID;

    TestDecorator.prototype.on_addTo = function () {
        var client = this._control._client,
            nodeObj = client.getNode(this._metaInfo[CONSTANTS.GME_ID]);

        this.logger.debug('This node was added to the canvas', nodeObj);

        // Call the base-class method..
        ModelDecoratorDiagramDesignerWidget.prototype.on_addTo.apply(this, arguments);

        this.$el.append(this.$resultIndicator);
        this.$el.append(this.$runPluginBtn);
        this._matchType(client, nodeObj);
    };

    TestDecorator.prototype.destroy = function () {
        ModelDecoratorDiagramDesignerWidget.prototype.destroy.apply(this, arguments);
    };

    TestDecorator.prototype.update = function () {
        var client = this._control._client,
            nodeObj = client.getNode(this._metaInfo[CONSTANTS.GME_ID]);

        this.logger.debug('This node is on the canvas and received an update event', nodeObj);

        ModelDecoratorDiagramDesignerWidget.prototype.update.apply(this, arguments);

    };

    TestDecorator.prototype._matchType = function (client, nodeObj) {
        var self = this;

        //this.$resultIndicator.text("Interface not implemented");
        this.$runPluginBtn.css('display', 'inline-block');
        this.$runPluginBtn.on('click', function () {
           self.logger.debug("Not Implemented");
        });
        //this.$runPluginBtn.css('display', 'none');

    };

    return TestDecorator;
});