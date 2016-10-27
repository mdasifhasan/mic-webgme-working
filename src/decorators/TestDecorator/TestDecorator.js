/*globals define, _*/
/*jshint browser: true, camelcase: false*/
/**
 * @author pmeijer / https://github.com/pmeijer
 */

define([
    'js/Decorators/DecoratorBase',
    './DiagramDesigner/TestDecorator.DiagramDesignerWidget',
    './PartBrowser/TestDecorator.PartBrowserWidget'
], function (DecoratorBase, TestDecoratorDiagramDesignerWidget, TestDecoratorPartBrowserWidget) {

    'use strict';

    var TestDecorator,
        DECORATOR_ID = 'TestDecorator';

    TestDecorator = function (params) {
        var opts = _.extend({loggerName: this.DECORATORID}, params);

        DecoratorBase.apply(this, [opts]);

        this.logger.debug('TestDecorator ctor');
    };

    _.extend(TestDecorator.prototype, DecoratorBase.prototype);
    TestDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    TestDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {
            DiagramDesigner: TestDecoratorDiagramDesignerWidget,
            PartBrowser: TestDecoratorPartBrowserWidget
        };
    };

    return TestDecorator;
});