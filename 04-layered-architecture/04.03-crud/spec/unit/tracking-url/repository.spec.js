'use strict';

var helper = require('../../helper'),
    Repository = require('../../../src/tracking-url/repository.js');

describe('TrackingUrl Repository', function () {
    var config, client, sut;
    beforeEach(function () {
        config = helper.getConfig();
        client = {
            put: function () {},
            batchWrite: function () {}
        };
        sut = new Repository(helper.getLoggerMock(), config, client);
    });

    describe('createTrackingObj()', function () {
        var trackingObj = {
            uuid: 'thisUUID',
            trackers: [
                {
                    uuid: 'trackerUUID',
                    target: 'this@email.com'
                }
            ]
        };

        it('should pass the right parameters to client.batchWrite()', function () {
            let expectedParams = {
                RequestItems: {}
            };
            expectedParams.RequestItems[config.identityTable] = [];
            expectedParams.RequestItems[config.identityTable].push({
                PutRequest: {
                    Item: {
                        URL: trackingObj.uuid,
                        tracker: trackingObj.trackers[0].trackerId,
                        email: trackingObj.trackers[0].target,
                        created: undefined,
                        lastModified: undefined
                    }
                }
            });

            spyOn(client, 'batchWrite').and.returnValue(Promise.resolve());
            return sut.createTrackingUrl(trackingObj).then(function () {
                expect(client.batchWrite).toHaveBeenCalledWith(expectedParams);
            });
        });
        it('should throw if client.batchWrite() throws', function () {
            var error = new Error('error');
            spyOn(client, 'batchWrite').and.returnValue(Promise.reject(error));
            return sut
                .createTrackingUrl(trackingObj)
                .then(helper.thenFail)
                .catch(function (err) {
                    expect(err).toEqual(error);
                    expect(client.batchWrite).toHaveBeenCalled();
                });
        });
        it('should return the result of client.batchWrite()', function () {
            var result = 'result';
            spyOn(client, 'batchWrite').and.returnValue(Promise.resolve(result));
            return sut.createTrackingUrl(trackingObj).then(function (result) {
                expect(result).toBe(result);
                expect(client.batchWrite).toHaveBeenCalled();
            });
        });
    });
});
