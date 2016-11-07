/**
 * @author kecso / https://github.com/kecso
 */
define([
    'text!./javascript.bat.ejs',
    'text!./javascript.generated.js.ejs'
], function (javascriptBat,
             javascriptGenerated) {
    'use strict';

    return {
        javascript: {
            batch: javascriptBat,
            code: javascriptGenerated,
            extension: 'js'
        }
    };
});