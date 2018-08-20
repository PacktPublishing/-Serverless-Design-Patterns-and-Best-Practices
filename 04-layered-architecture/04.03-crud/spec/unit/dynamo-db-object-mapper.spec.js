'use strict';

var _ = require('lodash'),
    AWS = require('aws-sdk'),
    DynamoDBObjectMapper = require('../../src/dynamodb-object-mapper.js');

describe('DynamoDBObjectMapper', function () {

    var dynamoDBDocumentClient, sut;
    beforeEach(function () {
        dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();
        sut = new DynamoDBObjectMapper();
    });

    describe('int2date()', function () {
        it('should wrap the integer with a new Date', function () {
            var int = new Date('2012-12-26T00:00:00Z').getTime();
            var result = sut.int2date(int);
            expect(result).toEqual(new Date(int));
        });
    });

    describe('date2int()', function () {
        it('should return getTime() on the passed Date', function () {
            var date = new Date('2000-01-01T00:00:00Z');
            var result = sut.date2int(date);
            expect(result).toBe(date.getTime());
        });
    });

    describe('set2array()', function () {
        it('should return the values of the passed Set', function () {
            var set = dynamoDBDocumentClient.createSet(['A', 'B']);
            var result = sut.set2array(set);
            expect(result).toEqual(set.values);
        });
    });

    describe('array2set()', function () {
        it('should wrap an array of String with a new Set of String', function () {
            var array = ['A', 'B'];
            var result = sut.array2set(array);
            expect(result).toEqual(dynamoDBDocumentClient.createSet(array));
        });
        it('should wrap an array of Number with a new Set of Number', function () {
            var array = [1, 2];
            var result = sut.array2set(array);
            expect(result).toEqual(dynamoDBDocumentClient.createSet(array));
        });
        it('should wrap an array of Binary with a new Set of Binary', function () {
            var array = [new Buffer('HELLO')];
            var result = sut.array2set(array);
            expect(result).toEqual(dynamoDBDocumentClient.createSet(array));
        });
    });

    describe('item2entity()', function () {
        it('should return null if the item is null', function () {
            var result = sut.item2entity(null);
            expect(result).toBe(null);
        });
        it('should return null if the item is undefined', function () {
            var result = sut.item2entity();
            expect(result).toBe(null);
        });
        it('should return a clone of the item if there is nothing to convert', function () {
            var item = {
                uuid: 'uuid',
                timestamp: Date.now()
            };
            var result = sut.item2entity(item);
            expect(result).toEqual(item);
        });
        it('should return a clone of the item with the passed properties converted to Date with ' +
            'int2date() and the Sets converted to arrays with set2array()', function () {
            var item = {
                uuid: 'uuid',
                timestamp: Date.now(),
                created: new Date('2000-01-01T00:00:00Z').getTime(),
                lastModified: new Date('2000-02-29T00:00:00Z').getTime(),
                roles: dynamoDBDocumentClient.createSet(['A', 'B', 'C']),
                subLevel: {
                    nestedSet: dynamoDBDocumentClient.createSet(['1']),
                    nestedDate: Date.now()
                }
            };
            var entity = _.cloneDeep(item);
            entity.created = sut.int2date(item.created);
            entity.lastModified = sut.int2date(item.lastModified);
            entity.roles = sut.set2array(item.roles);
            entity.subLevel.nestedSet = sut.set2array(item.subLevel.nestedSet);
            entity.subLevel.nestedDate = sut.int2date(item.subLevel.nestedDate);
            var result = sut.item2entity(item, ['created', 'lastModified', 'nestedDate']);
            expect(result).toEqual(entity);
        });
    });

    describe('entity2item()', function () {
        it('should return null if the entity is null', function () {
            var result = sut.entity2item(null);
            expect(result).toBe(null);
        });
        it('should return null if the entity is undefined', function () {
            var result = sut.entity2item();
            expect(result).toBe(null);
        });
        it('should return a clone of the entity if there is nothing to convert', function () {
            var entity = {
                uuid: 'uuid',
                roles: ['ROLE1']
            };
            var result = sut.entity2item(entity);
            expect(result).toEqual(entity);
        });
        it('should return a clone of the entity with the Dates converted to int with ' +
            'date2int() and with the passed arrays converted to Sets with array2set()', function () {
            var entity = {
                uuid: 'uuid',
                created: new Date('2000-01-01T00:00:00Z'),
                lastModified: new Date('2000-02-29T00:00:00Z'),
                roles: ['A', 'B', 'C'],
                authRoles: ['A', 'B', 'C'],
                unauthRoles: ['A', 'B', 'C'],
                array: [1, 2],
                subLevel: {
                    anotherDate: new Date(),
                    anotherSet: [1, 2, 3]
                }
            };
            var item = _.cloneDeep(entity);
            item.created = sut.date2int(entity.created);
            item.lastModified = sut.date2int(entity.lastModified);
            item.roles = sut.array2set(entity.roles);
            item.authRoles = sut.array2set(entity.authRoles);
            item.unauthRoles = sut.array2set(entity.unauthRoles);
            item.subLevel.anotherDate = sut.date2int(entity.subLevel.anotherDate);
            item.subLevel.anotherSet = sut.array2set(entity.subLevel.anotherSet);
            var result = sut.entity2item(entity, ['roles', 'authRoles', 'unauthRoles', 'anotherSet']);
            expect(result).toEqual(item);
        });
    });

});
