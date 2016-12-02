var MongoClient = require('mongodb').MongoClient;

/*
var demoPerosn = { name: 'John', lastName: 'Smith' };
var findKey = { name: 'John' };
*/

var website = {
  url: 'http://www.google.com',
  visits: 0
};
var findKey = {
  url: 'http://www.google.com'
};

MongoClient.connect('mongodb://127.0.0.1:27017/demo', function(err, db) {
  if(err) throw err;
  console.log('Successfully connected');

  //var collection = db.collection('people');
  /*
  collection.insert(demoPerosn, function(err, docs) {
    console.log('Inserted', docs);
    console.log('ID:', demoPerosn._id);

    collection.find(findKey).toArray(function(err, results) {
      console.log('Found results:', results);

      collection.remove(findKey, function(err, results){
        console.log('Deleted person');

        db.close();
      });
    });
  });
  */
  /*
  collection.insert(demoPerosn, function(err, docs) {
    console.log('Inserted', demoPerosn);
    demoPerosn.lastName = 'Martin';
    collection.save(demoPerosn, function(err) {
      console.log('Updated');

      collection.find(findKey).toArray(function(err, results) {
        console.log(results);

        collection.drop(function(){
          db.close();
        });
      });
    });
    */

    var collection = db.collection('websites');
    collection.insert(website, function(err, docs) {
      var done = 0;
      function onDone(err) {
        done++;
        if(done < 4) return;

        collection.find(findKey).toArray(function(err, results) {
          console.log('Visits:', results[0].visits);

          collection.drop(function(){
            db.close();
          });
        });
      }

      var incrementVisists = { '$inc': { 'visits': 1 } };
      collection.update(findKey, incrementVisists, onDone);
      collection.update(findKey, incrementVisists, onDone);
      collection.update(findKey, incrementVisists, onDone);
      collection.update(findKey, incrementVisists, onDone);
    });
    
});
