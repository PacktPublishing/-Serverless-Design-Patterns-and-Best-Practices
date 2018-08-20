'use strict';

var DynamoDBClient = require('../../src/dynamodb-client.js'),
    helper = require('../helper'),
    NspError = require('../../src/nsp-error.js'),
    Promise = require('bluebird');

describe('DynamoDBClient', function () {
    var dynamoDB, sut;
    beforeEach(function () {
        dynamoDB = {
            put: function () {},
            get: function () {},
            delete: function () {},
            query: function () {},
            scan: function () {}
        };
        sut = new DynamoDBClient(helper.getLoggerMock(), helper.getConfig().dynamodb, dynamoDB);
    });

    describe('put()', function () {
        it('should pass the param to dynamoDB.put()', function () {
            spyOn(dynamoDB, 'put').and.returnValue({
                promise: function () {
                    return Promise.resolve({});
                }
            });
            return sut.put('param').then(function () {
                expect(dynamoDB.put).toHaveBeenCalledWith('param');
            });
        });
        it('should return the result of dynamoDB.put()', function () {
            spyOn(dynamoDB, 'put').and.returnValue({
                promise: function () {
                    return Promise.resolve('result');
                }
            });
            return sut.put('param').then(function (result) {
                expect(result).toBe('result');
            });
        });
        it('should throw a NspError wrapping the error of dynamoDB.put()', function () {
            spyOn(dynamoDB, 'put').and.returnValue({
                promise: function () {
                    return Promise.reject({ code: 'code', message: 'message' });
                }
            });
            return sut
                .put('param')
                .then(helper.thenFail)
                .catch(function (error) {
                    expect(error.code).toBe(NspError.codes.INTERNAL_SERVER_ERROR);
                    expect(error.message).toBe('code: message');
                    expect(error.causes).toBeEmptyArray();
                    expect(error.timestamp).toBeDate();
                });
        });
    });

    describe('get()', function () {
        it('should pass the param to dynamoDB.get()', function () {
            spyOn(dynamoDB, 'get').and.returnValue({
                promise: function () {
                    return Promise.resolve({});
                }
            });
            return sut.get('param').then(function () {
                expect(dynamoDB.get).toHaveBeenCalledWith('param');
            });
        });
        it('should return the Item of the result of dynamoDB.get()', function () {
            spyOn(dynamoDB, 'get').and.returnValue({
                promise: function () {
                    return Promise.resolve({ Item: 'result' });
                }
            });
            return sut.get('param').then(function (result) {
                expect(result).toBe('result');
            });
        });
        it('should throw a NspError wrapping the error of dynamoDB.get()', function () {
            spyOn(dynamoDB, 'get').and.returnValue({
                promise: function () {
                    return Promise.reject({ code: 'code', message: 'message' });
                }
            });
            return sut
                .get('param')
                .then(helper.thenFail)
                .catch(function (error) {
                    expect(error.code).toBe(NspError.codes.INTERNAL_SERVER_ERROR);
                    expect(error.message).toBe('code: message');
                    expect(error.causes).toBeEmptyArray();
                    expect(error.timestamp).toBeDate();
                });
        });
    });

    describe('delete()', function () {
        it('should pass the param to dynamoDB.delete()', function () {
            spyOn(dynamoDB, 'delete').and.returnValue({
                promise: function () {
                    return Promise.resolve({});
                }
            });
            return sut.delete('param').then(function () {
                expect(dynamoDB.delete).toHaveBeenCalledWith('param');
            });
        });
        it('should return the result of dynamoDB.delete()', function () {
            spyOn(dynamoDB, 'delete').and.returnValue({
                promise: function () {
                    return Promise.resolve('result');
                }
            });
            return sut.delete('param').then(function (result) {
                expect(result).toBe('result');
            });
        });
        it('should throw a NspError wrapping the error of dynamoDB.delete()', function () {
            spyOn(dynamoDB, 'delete').and.returnValue({
                promise: function () {
                    return Promise.reject({ code: 'code', message: 'message' });
                }
            });
            return sut
                .delete('param')
                .then(helper.thenFail)
                .catch(function (error) {
                    expect(error.code).toBe(NspError.codes.INTERNAL_SERVER_ERROR);
                    expect(error.message).toBe('code: message');
                    expect(error.causes).toBeEmptyArray();
                    expect(error.timestamp).toBeDate();
                });
        });
    });

    describe('query()', function () {
        it('should pass the param to dynamoDB.query()', function () {
            spyOn(dynamoDB, 'query').and.returnValue({
                promise: function () {
                    return Promise.resolve({});
                }
            });
            return sut.query('param').then(function () {
                expect(dynamoDB.query).toHaveBeenCalledWith('param');
            });
        });
        it('should return the Items of the result of dynamoDB.query()', function () {
            spyOn(dynamoDB, 'query').and.returnValue({
                promise: function () {
                    return Promise.resolve({ Items: 'result' });
                }
            });
            return sut.query('param').then(function (result) {
                expect(result).toBe('result');
            });
        });
        it('should throw a NspError wrapping the error of dynamoDB.query()', function () {
            spyOn(dynamoDB, 'query').and.returnValue({
                promise: function () {
                    return Promise.reject({ code: 'code', message: 'message' });
                }
            });
            return sut
                .query('param')
                .then(helper.thenFail)
                .catch(function (error) {
                    expect(error.code).toBe(NspError.codes.INTERNAL_SERVER_ERROR);
                    expect(error.message).toBe('code: message');
                    expect(error.causes).toBeEmptyArray();
                    expect(error.timestamp).toBeDate();
                });
        });
    });

    describe('scan()', function () {
        it('should pass the param to dynamoDB.scan()', function () {
            spyOn(dynamoDB, 'scan').and.returnValue({
                promise: function () {
                    return Promise.resolve({});
                }
            });
            return sut.scan('param').then(function () {
                expect(dynamoDB.scan).toHaveBeenCalledWith('param');
            });
        });
        it('should return the Items of the result of dynamoDB.scan()', function () {
            spyOn(dynamoDB, 'scan').and.returnValue({
                promise: function () {
                    return Promise.resolve({ Items: 'result' });
                }
            });
            return sut.scan('param').then(function (result) {
                expect(result).toBe('result');
            });
        });
        it('should throw a NspError wrapping the error of dynamoDB.scan()', function () {
            spyOn(dynamoDB, 'scan').and.returnValue({
                promise: function () {
                    return Promise.reject({ code: 'code', message: 'message' });
                }
            });
            return sut
                .scan('param')
                .then(helper.thenFail)
                .catch(function (error) {
                    expect(error.code).toBe(NspError.codes.INTERNAL_SERVER_ERROR);
                    expect(error.message).toBe('code: message');
                    expect(error.causes).toBeEmptyArray();
                    expect(error.timestamp).toBeDate();
                });
        });
    });
});
