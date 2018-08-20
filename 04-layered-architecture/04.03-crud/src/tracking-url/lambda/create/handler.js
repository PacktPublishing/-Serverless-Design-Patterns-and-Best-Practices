'use strict';

var Container = require('../../../container.js');

module.exports.handler = function (event, context, callback) {
    var container = new Container();

    return container
        .get('tracking.lambda-mapper')
        .createTrackingUrl(event)
        .then(function (response) {
            return callback(null, response);
        });
};
