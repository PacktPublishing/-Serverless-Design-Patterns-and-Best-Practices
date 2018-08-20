'use strict';

var AWS = require('aws-sdk'),
    NspError = require('./nsp-error.js'),
    Promise = require('bluebird');

function toNspError (dbError) {
    return new NspError(NspError.codes.INTERNAL_SERVER_ERROR, dbError.code + ': ' + dbError.message);
}

function getDynamoDB (config) {
    var options = {
        region: config.region,
        endpoint: config.endpoint,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    };
    return new AWS.DynamoDB.DocumentClient(options);
}

function DynamoDBClient (logger, config, dynamoDB) {
    dynamoDB = dynamoDB || getDynamoDB(config);

    this.batchWrite = function (params) {
        logger.verbose('DynamoDBClient/batchWrite', { params: params });
        return Promise.try(function () {
            return dynamoDB
                .batchWrite(params)
                .promise()
                .then(function (result) {
                    return result;
                })
                .catch(function (dbErr) {
                    throw toNspError(dbErr);
                });
        });
    };

    this.put = function (params) {
        logger.verbose('DynamoDBClient/put', { params: params });
        return Promise.try(function () {
            return dynamoDB
                .put(params)
                .promise()
                .then(function (result) {
                    return result;
                })
                .catch(function (dbErr) {
                    throw toNspError(dbErr);
                });
        });
    };

    this.get = function (params) {
        logger.verbose('DynamoDBClient/get', { params: params });
        return Promise.try(function () {
            return dynamoDB
                .get(params)
                .promise()
                .then(function (result) {
                    return result.Item ? result.Item : null;
                })
                .catch(function (dbErr) {
                    throw toNspError(dbErr);
                });
        });
    };

    this.delete = function (params) {
        logger.verbose('DynamoDBClient/delete', { params: params });
        return Promise.try(function () {
            return dynamoDB
                .delete(params)
                .promise()
                .then(function (result) {
                    return result;
                })
                .catch(function (dbErr) {
                    throw toNspError(dbErr);
                });
        });
    };

    this.query = function (params) {
        logger.verbose('DynamoDBClient/query', { params: params });
        return Promise.try(function () {
            return dynamoDB
                .query(params)
                .promise()
                .then(function (result) {
                    return result.Items;
                })
                .catch(function (dbErr) {
                    throw toNspError(dbErr);
                });
        });
    };

    this.scan = function (params) {
        logger.verbose('DynamoDBClient/scan', { params: params });
        return Promise.try(function () {
            return dynamoDB
                .scan(params)
                .promise()
                .then(function (result) {
                    return result.Items;
                })
                .catch(function (dbErr) {
                    throw toNspError(dbErr);
                });
        });
    };
}

DynamoDBClient.$inject = ['logger', 'dynamodb.config', 'dynamoDB?'];

module.exports = DynamoDBClient;
