'use strict';

var helper = require('../../helper'),
    RepositoryAdapter = require('../../../src/tracking-url/repository-adapter.js');

describe('TrackingUrl RepositoryAdapter', function () {
    var repository, objectMapper, sut;
    beforeEach(function () {
        repository = {
            createTrackingUrl: function () {}
        };
        objectMapper = {
            item2entity: function () {},
            entity2item: function () {}
        };
        sut = new RepositoryAdapter(helper.getLoggerMock(), repository, objectMapper);
    });

    describe('createTrackingUrl()', function () {
        it('should pass the right parameters to repository.createTrackingUrl()', function () {
            var trackingObj = 'trackingObj';
            spyOn(objectMapper, 'entity2item').and.returnValue('item');
            spyOn(repository, 'createTrackingUrl').and.returnValue(Promise.resolve());
            return sut.createTrackingUrl(trackingObj).then(function () {
                expect(objectMapper.entity2item).toHaveBeenCalledWith(trackingObj);
                expect(repository.createTrackingUrl).toHaveBeenCalledWith('item');
            });
        });

        it('should throw if repository.createTrackingUrl() throws', function () {
            var trackingObj = 'trackingObj';
            var error = new Error('error');
            spyOn(repository, 'createTrackingUrl').and.returnValue(Promise.reject(error));
            spyOn(objectMapper, 'entity2item').and.returnValue('item');
            return sut
                .createTrackingUrl(trackingObj)
                .then(helper.thenFail)
                .catch(function (err) {
                    expect(err).toEqual(error);
                    expect(repository.createTrackingUrl).toHaveBeenCalled();
                });
        });
        it('should return a clone of the passed trackingObj', function () {
            var trackingObj = { uuid: 'uuid', secret: 'my secret' };
            spyOn(repository, 'createTrackingUrl').and.returnValue(Promise.resolve());
            spyOn(objectMapper, 'entity2item').and.returnValue('item');
            return sut.createTrackingUrl(trackingObj).then(function (result) {
                expect(result).not.toBe(trackingObj);
                expect(result).toEqual(trackingObj);
                expect(repository.createTrackingUrl).toHaveBeenCalled();
            });
        });
    });
});
