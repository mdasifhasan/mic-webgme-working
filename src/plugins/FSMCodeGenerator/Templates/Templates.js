/**
 * @author kecso / https://github.com/kecso
 */
define([
    'text!./javascript.bat.ejs',
    'text!./javascript.generated.js.ejs',
    'text!./python.bat.ejs',
    'text!./python.generated.py.ejs',
], function (javascriptBat,
             javascriptGenerated,
             pythonBat,
             pythonGenerated) {
    'use strict';

    return {
        javascript: {
            batch: javascriptBat,
            code: javascriptGenerated,
            extension: 'js'
        },
        python: {
            batch: pythonBat,
            code: pythonGenerated,
            extension: 'py'
        }
    };
});