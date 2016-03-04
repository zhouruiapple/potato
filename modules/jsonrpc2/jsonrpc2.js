'use strict'

const request = require('request');
const uuid = require('node-uuid');

function Rpc2Request(method) {
    this.jsonrpc = '2.0';
    this.method = method;
    this.id = uuid.v4();
};

function JsonRpc2(serviceUrl) {
    this.serviceUrl = serviceUrl;
    this.invoke = function(method, params, callback) {
        var rpcrequest = new Rpc2Request(method);
        if(null != params) {
            rpcrequest.params = params;
        }
        var options = {
            headers: {"Connection" : "close"},
            url : this.serviceUrl,
            method : 'POST',
            body : JSON.stringify(rpcrequest)
        };
        request(options, function(error, response, body) {
            if(null != error) {
                callback(error, null);
                return;
            }
            try {
                var rpcresult = JSON.parse(body);

                if(undefined == rpcresult.error) {
                    callback(null, rpcresult.result);
                }
                else {
                    callback(rpcresult.error, null);
                }
            }
            catch(e) {
                callback(body, null);
            }
        });
    };
};

module.exports = JsonRpc2;
