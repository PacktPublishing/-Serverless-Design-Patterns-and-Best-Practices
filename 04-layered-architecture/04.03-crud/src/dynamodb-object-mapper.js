'use strict';

var _ = require('lodash'),
    AWS = require('aws-sdk');

var dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();

function assignToTree (node, filter, getValue) {
    if (!(_.isArray(node) || _.isPlainObject(node))) {
        return;
    }
    _.forOwn(node, function (child, key, parent) {
        if (filter(child, key, parent)) {
            var newChild = getValue(child, key, parent);
            if (newChild !== child) {
                parent[key] = newChild;
            }
        }
        assignToTree(child, filter, getValue);
    });
}

function isDate (value) {
    return _.isDate(value);
}

function isSet (value) {
    return _.isObject(value) &&
    _.isObject(value.constructor) && value.constructor.name === 'Set' &&
    _.isArray(value.values) && _.isString(value.type);
}

function DynamoDBObjectMapper () {

    this.int2date = function (n) {
        return new Date(n);
    };

    this.date2int = function (d) {
        return d.getTime();
    };

    this.set2array = function (set) {
        return set.values;
    };

    this.array2set = function (array) {
        return dynamoDBDocumentClient.createSet(array);
    };

    this.item2entity = function (item, dateProperties) {
        if (!item) {
            return null;
        }
        var self = this;
        function filter (child, key) {
            return _.includes(dateProperties, key) || isSet(child);
        }
        function getValue (child) {
            if (isSet(child)) {
                return self.set2array(child);
            } else {
                return self.int2date(child);
            }
        }
        var entity = _.cloneDeep(item);
        assignToTree(entity, filter, getValue);
        return entity;
    };

    this.entity2item = function (entity, setProperties) {
        if (!entity) {
            return null;
        }
        var self = this;
        function filter (child, key) {
            return _.includes(setProperties, key) || isDate(child);
        }
        function getValue (child) {
            if (isDate(child)) {
                return self.date2int(child);
            } else {
                return self.array2set(child);
            }
        }
        var item = _.cloneDeep(entity);
        assignToTree(item, filter, getValue);
        return item;
    };

}

module.exports = DynamoDBObjectMapper;
