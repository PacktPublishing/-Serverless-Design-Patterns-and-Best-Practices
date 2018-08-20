'use strict';

var config = require('../config/config.js'),
    intravenous = require('intravenous');

function Container () {
    var container = intravenous.create({
        onDispose: function (obj) {
            obj.dispose();
        }
    });

    container.register('logger', require('./util/logger.js'));
    container.register('logger.config', config.logger);
    container.register('lambda-event', require('./lambda-event'));

    container.register('dynamodb-client', require('./dynamodb-client.js'), 'singleton');
    container.register('dynamodb-object-mapper', require('./dynamodb-object-mapper.js'), 'singleton');
    container.register('dynamodb.config', config.dynamodb);

    // Tracking URL configuration
    container.register('tracking.lambda-mapper', require('./tracking-url/lambda-mapper'));
    container.register('tracking.logic', require('./tracking-url/logic.js'));
    container.register('tracking.repository-adapter', require('./tracking-url/repository-adapter'));
    container.register('tracking.repository', require('./tracking-url/repository'));

    return container;
}

module.exports = Container;
