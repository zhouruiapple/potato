'use strict'

const request = require('request');
const async = require('async');
const ipcmain = require('electron').ipcMain;
const serviceConfig = require('../config/service_config.js');
const JsonRpc2 = require('../jsonrpc2/jsonrpc2.js');

var host_jsonrpc2_method = {
    get_nodes : 'test',
};

var host_jsonrpc2 = new JsonRpc2(serviceConfig.configuration().welcomeServiceUrl());

exports.initIpc = function() {
    ipcmain.on('async-obtain-register-host', function(event, arg) {
        async.parallel([
            function(callback) {
                host_jsonrpc2.invoke(host_jsonrpc2_method.get_nodes, [], function(error, result) {
                    callback(error, result);
                });
            }
        ],
        function(error, results) {
            if(null != error) {
                event.sender.send('async-obtian-register-host-reply', error);
            }
            else {
                console.log(results);
                event.sender.send('async-obtian-register-host-reply', results);
            }
        });
    });
};
