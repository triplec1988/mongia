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
}

Mongia.VERSION = require('../package.json').version;
module.exports = Mongia;

Mongia.prototype.disconnect = function() {
    return this.client.close();
};

Mongia.prototype.collections = function() {
    return this.client.collectionNames(function(err, items){
        if(err) throw err;

        if (items.length > 0)
            return items;
        else
            return [];
    });
};

Mongia.prototype.collectionsCount = functions() {
    return this.collections.length;
}
