'use strict';

/**
  * Create & Consume MongoDB Documents
  **/

var mongoClient = require('mongodb').MongoClient;
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Mongia(options) {
    if (!(this instanceof Mongia)) {
        return new Mongia(options);
    }

    var self = this;

     var defaults = {
        mongoUrl: 'mongodb://127.0.0.1:27017/test',
    };

    self.options = _.defaults(options || {}, defaults);

    mongoClient.connect(this.options.mongoUrl, function(err, db){
        if(err) throw err;

        self.client = db;

        self.emit('connect');
    });

    return null;
}

Mongia.VERSION = require('../package.json').version;
module.exports = Mongia;
util.inherits(Mongia, EventEmitter);

Mongia.prototype.disconnect = function() {
    return this.client.close();
};

Mongia.prototype.collections = function(callback) {
    this.client.collectionNames(function(err, items){
        callback(err, items);
    });
};

Mongia.prototype.collectionsCount = function(callback) {
    this.collections(function(err, items){
        if (err) throw err;

        callback(null, items.length);
    });
};

Mongia.prototype.collection = function(collectionName, options, callback) {
    this.client.collection(collectionName, options, function(err, collection){
        callback(err, collection);
    });
};

Mongia.prototype.newCollection = function(collectionName, options, callback) {
    this.client.createCollection(collectionName, options, function(err, collection){
        callback(err, collection);
    });
};

Mongia.prototype.findOrCreateCollection = function(collectionName, callback) {
    var self = this;
    self.collection(collectionName, {strict:true}, function(err, collection){

        if (err) {
            self.newCollection(collectionName, null, function(err, collection){
                callback(err, collection);
            });
        } else {
            callback(err, collection);
        }
    });
    return;
};

Mongia.prototype.addDocuments = function(collection, documents, callback) {
    collection.insert(documents, function(err, results){
        callback(err, results);
    });
    return;
};

Mongia.prototype.findDocument = function(collection, doc, callback) {
    collection.findOne(doc, function(err, record){
        callback(err, record);
    });
};

Mongia.prototype.documentCount = function(collection, callback) {
    collection.count(function(err, count) {
        callback(err, count);
    });
};

Mongia.prototype.lastNDocuments = function(collection, field, limit, callback) {
    collection.find().sort({field: 1}).limit(limit).toArray(function(err, items){
        callback(err, items);
    });
};

Mongia.prototype.firstNDocuments = function(collection, field, limit, callback) {
    collection.find().sort({field: -1}).limit(limit).toArray(function(err, items){
        callback(err, items);
    });
};

Mongia.prototype.documentsSinceDate = function(collection, field, date, callback){
    collection.find({field: {$gte: date}}).sort({field: 1}).toArray(function(err, items){
        callback(err, items);
    });
};

Mongia.prototype.Mongia = Mongia;
