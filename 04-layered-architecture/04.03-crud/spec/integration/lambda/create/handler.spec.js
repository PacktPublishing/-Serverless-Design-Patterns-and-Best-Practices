'use strict';

const Handler = require('../../../../src/tracking-url/lambda/create/handler');
describe('Lambda/createTrackingUrl [Integration]', function () {
    let context, sut;

    beforeEach(function () {
        context = {};
        sut = Handler.handler;
    });

    describe('Handler()', function () {
        xit('should return 401 for a missing principal', function () {
            var event = {
                body: null,
                httpMethod: 'GET',
                headers: {
                    'X-Forwarded-Proto': 'http',
                    'X-Forwarded-Port': '80',
                    Host: 'localhost'
                },
                path: '/say/hello',
                pathParameters: {},
                requestContext: {}
            };
            return sut(event, context, function (err, result) {
                expect(result.statusCode).toBe(401);
                expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
            });
        });

        xit('should return 200 with a message', function () {
            const trackingObj = {
                uuid: 'www.waylon-ai.com',
                trackers: [
                    {
                        email: 'test@anemail.com'
                    }
                ]
            };

            const event = {
                body: JSON.stringify(trackingObj),
                httpMethod: 'POST',
                headers: {
                    'X-Forwarded-Proto': 'http',
                    'X-Forwarded-Port': '80',
                    'Content-Type': 'application/json',
                    Host: 'localhost'
                },
                path: '/tracking/url',
                pathParameters: {},
                requestContext: {
                    authorizer: {
                        principalId: '{ "organizationId": "owner1" }'
                    }
                }
            };
            return sut(event, context, function (err, result) {
                expect(result.statusCode).toBe(200);
                expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
                expect(result.body).toBeDefined();
            });
        });
    });
});
