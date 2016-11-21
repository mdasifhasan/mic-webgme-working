/**
 * @author kecso / https://github.com/kecso
 */
define([
    'text!./generated.js.ejs'
], function (javascriptGenerated) {
    'use strict';

    return {
        javascript: {
            code: javascriptGenerated,
            extension: 'js'
        }
    };
});