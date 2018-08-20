'use strict';

var Config = require('../config/config.js');

module.exports.getLoggerMock = function () {
    return {
        silly: console.log,
        debug: console.log,
        verbose: console.log,
        info: console.log,
        warn: console.log,
        error: console.log
    };
};

module.exports.thenFail = function (data) {
    var formatted = data;
    if (data !== undefined) {
        try {
            formatted = JSON.stringify(data);
        } catch (e) {
            formatted = data;
        }
    }
    fail('Promise rejection expected, instead fulfilled with: ' + formatted);
};

module.exports.getConfig = function () {
    return Config;
};
