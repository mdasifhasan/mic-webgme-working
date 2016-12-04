/**
 * @author kecso / https://github.com/kecso
 */
define([
    'text!./javascript.data.ejs',
    'text!./javascript.field.ejs',
    'text!./javascript.agent.ejs',
    'text!./javascript.module.ejs'
], function (javascriptData,
             javascriptField,
             javascriptAgent,
             javascriptModule
) {
    'use strict';

    return {
        javascript: {
            data: javascriptData,
            field: javascriptField,
            agents: javascriptAgent,
            module: javascriptModule,
            extension: 'js'
        }
    };
});