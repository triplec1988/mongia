mongia.js
======

Mangia (v.) Eat!

Mongia is a JavaScript library for easily creating and consuming MongoDB documents. For more information about MongoDB, or it's core API, check out the docs for the Node.js driver: http://mongodb.github.io/node-mongodb-native/contents.html

# Installation

    npm install mongia

Or add a specific version directly from GitHub to your dependencies in the package.json of your project

    "mongia": "git://github.com/triplec1988/mongia.git#v0.3.0",

# Usage

    var Mongia = require('/Users/triplec1988/projects/mongia/lib/mongia');
    var mongia = new Mongia();

#API

##Basic
#### Mongia
**Options**

 * mongoUrl: The URL to your MongoDB instance. Defaults to localhost

Instantiate a new instance of the Mongia object and connect to MongoDB

Example:

    var mongia = new Mongia({'mongoUrl' : process.env.MONGOHQ_URL});

#### disconnect
Disconnect from MongoDB

example:

    mongia.disconnect();
    
##Collections
#### collections(callback)
 * callback(function)
 
Expects a callback function, which has access to `err` and `items`. `items` is an array of objects. Each object contains a single key, `name`.

Example:

    mongia.collections(function(err, items){
        if (err) throw err;
        console.log(items);
        return;
    });
    // [
    //   {name: 'test.something'},
    //   {name: 'test.anotherthing'},...
    // ]
    
#### collectionsCount(callback)
 * callback(function)
 
Expects a callback function, which has access to `err` and `count`. `count` is an integer representing the number of collections in the database.

Example:

    mongia.collectionsCount(function(err, count){
        if (err) throw err;
        console.log(count);
        return;
    });
    // 3
#### collection(collectionName, callback)
 * collectionName(string)
 * callback(function)
 
Expects a collection name and a callback. The callback has access to `err` and `collection`. If no collection is found with the provided name then `err` will be present. `collection` is an existing MongoDB collection object.

Example:

    mongia.collection('something', function(err, collection){
        if (err) throw err;
        console.log(collection);
        return;
    });
    // MongoDB Collection Object

#### newCollection(collectionName, callback)
 * collectionName(string)
 * callback(function)
 
Expects a collection name and a callback. The callback has access to `err` and `collection`. A new collection will be created with the provided name. `collection` is a MongoDB collection object

Example:

    mongia.collection('something', function(err, collection){
        if (err) throw err;
        console.log(collection);
        return;
    });
    // MongoDB Collection Object

####findfOrCreateCollection(collectionName, callback)
 * collectionName(string)
 * callback(function)
 
Expects a collection name and a callback. The callback has access to `err` and `collection`. A new collection will be created with the provided name if an existing collection with the same name does not already exist. `collection` is a MongoDB collection object

Example:

    mongia.findOrCreateCollection('something', function(err, collection){
        if (err) throw err;
        console.log(collection);
        return;
    });
    // MongoDB Collection Object

##Documents
####addDocuments(collection, documents, callback)
 * collection(object)
 * documents(array)
 * callback(function)
 
Expects a MongoDB collection object, an array of documents and a callback. Callback has access to `err` and `result`. `result` is an array of the inserted documents.

Example:

    mongia.findOrCreateCollection('something', function(err, collection){

        mongia.addDocuments(collection, [{a:'foo'}, {b:'bar'}], function(err, result){
            if (err) throw err;
            console.log(result);
            return;
        });
        return;
    });
    // [{a:'foo'}, {b:'bar'}]
    
####findDocument(collection, doc, callback)
 * collection(object)
 * doc(object)
 * callback(function)
 
Expects a MongoDB collection object, a document, or partial of a document, and a callback. Callback has access to `err` and `record`. `record` is a document.

Example:

    mongia.collection('something', function(err, collection){

        mongia.findDocument(collection, {a:'foo'}, function(err, record){
            if (err) throw err;
            console.log(record);
            return;
        });
        return;
    });
    // {a:'foo'}

####documentCount(collection, callback)
 * collection(object)
 * callback(function)
 
Expects a MongoDB collection object and a callback. Callback has access to `err` and `count`. `record` is an integer representing the total number of documents in the given collection.

Example:

    mongia.collection('something', function(err, collection){

        mongia.documentCount(collection, function(err, count){
            if (err) throw err;
            console.log(count);
            return;
        });
        return;
    });
    // 2

####lastNDocuments(collection, field, limit, callback)
 * collection(object)
 * field(string)
 * limit(integer)
 * callback(function)
 
Expects a MongoDB collection object, field to sort by, limit and a callback. Callback has access to `err` and `items`. `items` is an array of MongoDB documents from the given collection.

Example:

    mongia.collection('something', function(err, collection){

        mongia.lastNDocuments(collection, 'createdAt', 10, function(err, items){
            if (err) throw err;
            console.log(itmes);
            return;
        });
        return;
    });
    // [document, document, ...]
####firstNDocuments(collection, field, limit, callback)
 * collection(object)
 * field(string)
 * limit(integer)
 * callback(function)
 
Expects a MongoDB collection object, field to sort by, limit and a callback. Callback has access to `err` and `items`. `items` is an array of MongoDB documents from the given collection.

Example:

    mongia.collection('something', function(err, collection){

        mongia.firstNDocuments(collection, 'createdAt', 10, function(err, items){
            if (err) throw err;
            console.log(itmes);
            return;
        });
        return;
    });
    // [document, document, ...]
    
####documentsSinceDate(collection, field, date, callback)
 * collection(object)
 * field(string)
 * date(Date)
 * callback(function)
 
Expects a MongoDB collection object, field to sort by, date and a callback. Callback has access to `err` and `items`. `items` is an array of MongoDB documents from the given collection.

Example:

    mongia.collection('something', function(err, collection){
        var date = new Date(2014, 7, 21);
        mongia.documentsSinceDate(collection, 'createdAt', date, function(err, items){
            if (err) throw err;
            console.log(itmes);
            return;
        });
        return;
    });
    // [document, document, ...]

#Contribute

To contribute to this project fork the repo and submit a pull request!



