'use strict';

function Repository (logger, config, db) {
    this.createTrackingUrl = function (trackingUrlObj) {
        logger.verbose('TrackingUrl/createTracker', { trackingUrlObj });
        var params = {
            RequestItems: {}
        };
        params.RequestItems[config.trackingUrlTable] = [];
        let itemsToAdd = params.RequestItems[config.trackingUrlTable];
        trackingUrlObj.trackers.forEach(tracker => {
            itemsToAdd.push({
                PutRequest: {
                    Item: {
                        URL: trackingUrlObj.uuid,
                        tracker: tracker.trackerId,
                        email: tracker.target,
                        created: trackingUrlObj.created,
                        lastModified: trackingUrlObj.lastModified
                    }
                }
            });
        });

        return db.batchWrite(params);
    };
}

Repository.$inject = ['logger', 'dynamodb.config', 'dynamodb-client'];

module.exports = Repository;
