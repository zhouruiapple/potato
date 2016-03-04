'use strict'

const fs = require('fs');

function ServiceConfig() {
    this.config = JSON.parse(fs.readFileSync('./config.json').toString());

    this.serviceUrl = function() {
        return 'http://' + this.config.atom_server_ip + ':' + this.config.atom_server_port;
    };

    this.welcomeServiceUrl = function() {
        return 'http://' + this.config.atom_server_ip + ':' + this.config.atom_server_port + this.config.atom_welcome_jsonrpc2;
    }
};

var serviceConfig = new ServiceConfig();

exports.configuration = function() {
    return serviceConfig;
}
