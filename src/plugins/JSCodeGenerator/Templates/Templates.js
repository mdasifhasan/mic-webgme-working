/**
 * @author kecso / https://github.com/kecso
 */
define([
    'text!./javascript.data.ejs',
    'text!./javascript.field.ejs'
], function (javascriptData,
             javascriptField
) {
    'use strict';

    return {
        javascript: {
            data: javascriptData,
            field: javascriptField,
            extension: 'cs'
        }
    };
});