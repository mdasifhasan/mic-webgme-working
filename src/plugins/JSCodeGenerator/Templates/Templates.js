/**
 * @author kecso / https://github.com/kecso
 */
define([
    'text!./javascript.data.ejs',
    'text!./javascript.field.ejs',
    'text!./javascript.agent.ejs'
], function (javascriptData,
             javascriptField,
             javascriptAgent
) {
    'use strict';

    return {
        javascript: {
            data: javascriptData,
            field: javascriptField,
            agents: javascriptAgent,
            extension: 'cs'
        }
    };
});