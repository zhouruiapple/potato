'use strict'

const request = require('request');
const async = require('async');
const ipcmain = require('electron').ipcMain;

exports.initIpc = function() {
    ipcmain.on('async-obtain-register-software', function(event, arg) {
        async.parallel([
            function(callback) {
                request('http://www.baidu.com', function(error, response, body) {
                    callback(null, body);
                });
            },
            function(callback) {
                request('http://www.126.com', function(error, response, body) {
                    callback(null, body);
                });
            }
        ],
        function(err, results) {
            console.log(results.length);
            event.sender.send('async-obtian-register-software-reply', results);
        });
    });
};
