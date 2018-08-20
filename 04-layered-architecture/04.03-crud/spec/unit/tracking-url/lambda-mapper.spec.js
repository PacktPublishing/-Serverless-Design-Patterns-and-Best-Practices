'use strict';

describe('LambdaMapper', function () {
    const LambdaMapper = require('../../../src/tracking-url/lambda-mapper');

    describe('is istantiable', function () {
        let mockLogger = require('../../helper').getLoggerMock();
        let logic, sut, lambdaEvent;

        beforeEach(function () {
            logic = {
                createTrackingUrl: function () {}
            };

            lambdaEvent = {
                resolveResourceUrl: () => {},
                buildSuccessResponseEvent: () => {},
                buildErrorResponseEvent: () => {},
                wasModifiedSince: () => {},
                extractUUIDFromEvent: () => {},
                extractResourceFromEvent: () => {},
                mangleEntityDates: () => {},
                extractParamFromEvent: () => {}
            };
        });

        it('with a logger, logic and lambdaEvent', function () {
            sut = new LambdaMapper(mockLogger, logic, lambdaEvent);
            expect(sut).toBeDefined();
        });

        describe('createTrackingUrl()', function () {
            it('returns a tracker object from event resource', function () {
                const schema = require('../../../resources/json-schemas/createTracking.json');
                sut = new LambdaMapper(mockLogger, logic, lambdaEvent);
                const trackingObj = {
                    uuid: 'www.waylon-ai.com',
                    trackers: [
                        {
                            email: 'test@anemail.com'
                        }
                    ]
                };
                let event = {
                    requestContext: {},
                    headers: {
                        'X-Forwarded-Proto': 'http',
                        'X-Forwarded-Port': '8080',
                        Host: 'localhost'
                    },
                    path: '/tracking/url',
                    httpMethod: 'POST',
                    pathParameters: null,
                    body: trackingObj
                };

                spyOn(lambdaEvent, 'buildSuccessResponseEvent');
                spyOn(lambdaEvent, 'buildErrorResponseEvent');
                spyOn(lambdaEvent, 'extractResourceFromEvent').and.returnValue(Promise.resolve(trackingObj));
                spyOn(logic, 'createTrackingUrl');
                return sut.createTrackingUrl(event).then(function () {
                    expect(lambdaEvent.buildErrorResponseEvent).not.toHaveBeenCalled();
                    expect(lambdaEvent.extractResourceFromEvent).toHaveBeenCalledWith(event, schema);
                    expect(lambdaEvent.buildSuccessResponseEvent).toHaveBeenCalled();
                });
            });
        });
    });
});
