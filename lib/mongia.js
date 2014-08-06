'use strict';

/**
  * Create & Consume MongoDB Documents
  **/

var mongoClient = require('mongodb').MongoClient;
var _ = require('underscore');

function Mongia(options) {
    if (!(this instanceof Mongia)) {
        return new Mongia(options);
    }

    var defaults = {
        mongoUrl: options.url || 'mongodb://127.0.0.1:27017/test',
    };

    var client = MongoClient.connect(this.defaults.mongoUrl, function(err, db){
        if(err) throw err;

        return db;
    });

    return this;
}

Mongia.VERSION = require('../package.json').version;
module.exports = Mongia;

Mongia.prototype.disconnect = function() {
    return this.client.close();
};


/***
   * COLLECTIONS
   *
   * funct collections:
   *     params: none
   *     returns: Array
   *
   * funct collection:
   *     params: collectionName, options
   *     returns: Mongo Collection object
   *
   * funct collectionsCount
   *     params: none
   *     returns: Integer
   *
   * funct newCollection
   *     params: collectionName, options
   *     returns: Mongo Collection Object
   ***/

Mongia.prototype.collections = function() {
    return this.client.collectionNames(function(err, items){
        if(err) throw err;

        if (items.length > 0)
            return items;
        else
            return [];
    });
};

Mongia.prototype.collection = function(collectionName, options) {
    var collection = this.client.collection(collectionName, options, function(err, col){
        if(err)
            return null;

        return col;
    });

    return collection;
};

Mongia.prototype.collectionsCount = functions() {
    return this.collections.length;
}

Mongia.prototype.newCollection = function(collectionName, options) {
    var collection = this.client.createCollection(collectionName, options, function(err, col){
        if(err) throw err;

        return col;
    });

    return collection;
};

Mongia.prototype.findOrCreateCollection = function(collectionName, options) {
    var collection = this.collection(collectionName, options);

    if (collection !== null)
        return collection;
    else
        return this.newCollection(collectionName, options);
}

/***
   * DOCUMENTS
   *
   ***/

Mongia.prototype.Mongia = Mongia;
