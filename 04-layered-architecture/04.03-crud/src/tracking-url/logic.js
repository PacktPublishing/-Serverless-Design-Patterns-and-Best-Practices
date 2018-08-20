'use strict';

var Promise = require('bluebird');


function Logic (logger, repositoryAdapter) {
    this.ME = 'me';

    this.createTrackingUrl = function (principal, trackingObj) {
        logger.verbose('Logic/createTrackingUrl', { principal, trackingObj });
        return Promise.try(function () {
            var now = new Date();
            trackingObj.created = now;
            trackingObj.lastModified = now;
            trackingObj.trackers = trackingObj.trackers.map(tracker => {
                const trackerId = Math.random()
                    .toString(36)
                    .substring(2, 15);
                return Object.assign({}, tracker, { trackerId });
            });
            return repositoryAdapter.createTrackingUrl(trackingObj);
        }).then(function () {
            return trackingObj;
        });
    };
}

Logic.$inject = ['logger', 'tracking.repository-adapter'];

module.exports = Logic;
