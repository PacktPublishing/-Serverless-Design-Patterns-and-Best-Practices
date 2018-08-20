'use strict';

var _ = require('lodash'),
    Promise = require('bluebird');

function RepositoryAdapter (logger, repository, objectMapper) {
    this.createTrackingUrl = function (trackingObj) {
        return Promise.try(function () {
            var item = objectMapper.entity2item(trackingObj);
            return repository.createTrackingUrl(item).then(function () {
                return _.cloneDeep(trackingObj);
            });
        });
    };
}

RepositoryAdapter.$inject = ['logger', 'tracking.repository', 'dynamodb-object-mapper'];

module.exports = RepositoryAdapter;
