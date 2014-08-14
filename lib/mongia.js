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

Mongia.prototype.collection = function(collectionName, options, callback) {
    this.client.collection(collectionName, options, function(err, collection){
        callback(err, collection);
    });
};

Mongia.prototype.collectionsCount = function(callback) {
    this.collections(function(err, items){
        if (err) throw err;

        callback(null, items.length);
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
};

Mongia.prototype.addDocuments = function(collectionName, documents, callback) {
    var self = this;
    self.collection(collectionName, function(err, collection){
        if (err) throw err;
        collection.insert(documents);
        callback(err, collection);
    });
};

Mongia.prototype.documentCount = function(collectionName, callback) {
    this.collection(collectionName, function(err, collection){
        collection.count(function(err, count) {
            callback(err, count);
        });
    });
};

Mongia.prototype.findDocument = function(collectionName, doc, callback) {
    this.collection(collectionName, function(err, collection){
        collection.findOne(doc, function(err, record){
            callback(err, record);
        });
    });
};

Mongia.prototype.lastNDocuments = function(collectionName, n, callback) {
    this.collection(collectionName, function(err, collection){
        var limit;
        if (n < 1) {
            limit = 10;
        } else {
            limit = n;
        }
        collection.find().sort({'createdAt': 1}).limit(limit).toArray(function(err, items){
            callback(err, items);
        });
    });
};

Mongia.prototype.Mongia = Mongia;
