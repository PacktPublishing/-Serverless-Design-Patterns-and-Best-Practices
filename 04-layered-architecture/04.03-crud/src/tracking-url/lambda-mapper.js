'use strict';

const Promise = require('bluebird');
const principal = { organizationId: 'waylon' };

const createTrackingObjSchema = require('../../resources/json-schemas/createTracking.json');

/**
 * Uncomment this to provide principal schema checking
 * const principalSchema = require('../resources/json-schemas/principal.json');
 */

const LambdaMapper = function (logger, logic, lambdaEvent) {
    this.createTrackingUrl = function (event) {
        logger.verbose('LambdaMapper/createTRackingUrl');
        return Promise.try(function () {
            const trackingObj = lambdaEvent.extractResourceFromEvent(event, createTrackingObjSchema);
            return logic.createTrackingUrl(principal, trackingObj);
        })
            .then(function (result) {
                return lambdaEvent.buildSuccessResponseEvent(event, result);
            })
            .catch(function (error) {
                return lambdaEvent.buildErrorResponseEvent(event, error, error.statusCode);
            });
    };
};

LambdaMapper.$inject = ['logger', 'tracking.logic', 'lambda-event'];

module.exports = LambdaMapper;
