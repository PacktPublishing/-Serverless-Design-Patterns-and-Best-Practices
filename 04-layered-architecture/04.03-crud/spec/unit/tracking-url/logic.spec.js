'use strict';

const _ = require('lodash'),
    helper = require('../../helper'),
    Logic = require('../../../src/tracking-url/logic.js');

describe('TrackingUrl Logic', function () {
    var repositoryAdapter, sut;
    beforeEach(function () {
        repositoryAdapter = {
            createTrackingUrl: function () {}
        };
        sut = new Logic(helper.getLoggerMock(), repositoryAdapter);
    });

    describe('createTrackingUrl()', function () {
        var principal = 'principal';
        var uuid = 'uuid';
        var trackingObj = {
            uuid: uuid,
            trackers: [
                {
                    email: 'test@testing.org'
                }
            ]
        };

        it('should throw if repositoryAdapter.createTrackingUrl() throws', function () {
            var error = new Error('error');
            spyOn(repositoryAdapter, 'createTrackingUrl').and.returnValue(Promise.reject(error));
            return sut
                .createTrackingUrl(principal, trackingObj)
                .then(helper.thenFail)
                .catch(function (err) {
                    expect(err).toEqual(error);
                    expect(repositoryAdapter.createTrackingUrl).toHaveBeenCalledWith(trackingObj);
                });
        });
        it('should set created and lastModified', function () {
            spyOn(repositoryAdapter, 'createTrackingUrl').and.callFake(function (ide) {
                return Promise.resolve(ide);
            });
            return sut.createTrackingUrl(principal, trackingObj).then(function (result) {
                expect(repositoryAdapter.createTrackingUrl).toHaveBeenCalled();
                expect(result.created).toBeDate();
                expect(result.lastModified).toEqual(result.created);
            });
        });
        it('should set trackers if needed', function () {
            spyOn(repositoryAdapter, 'createTrackingUrl').and.callFake(function (ide) {
                return Promise.resolve(ide);
            });
            return sut.createTrackingUrl(principal, trackingObj).then(function (result) {
                expect(result.trackers).toBeDefined();
                result.trackers.forEach(tracker => {
                    expect(tracker.trackerId).toBeDefined();
                    expect(_.isString(tracker.trackerId)).toBeTruthy();
                });
            });
        });
    });
});
