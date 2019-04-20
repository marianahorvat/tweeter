"use strict";

//const MongoClient = require("mongodb").MongoClient;  //or:
const {MongoClient} = require("mongodb");


const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> In typical node-callback style, any program
  //     logic that needs to use the connection needs
  //     to be invoked from within here.
  //
  // Another way to say: this is an "entry point" for
  // a database-connected application!


// ==> Let's "get all the tweets". In Mongo-speak, we "find" them.
  // db.collection("tweets").find({}, (err, results) => {
  //   // Lazy error handling:
  //   if (err) throw err;

  //   // ==> Fair warning: This is going to log a lot of stuff...
  //   //console.log("find result: ", result);
  //   //console.log("type of find result: ", typeof result);

  //   console.log("for each item yielded by the cursor:");
  //   //results.each((err, item) => console.log("  ", item));

  //   // ==> We could instead just slurp the items into an array:
  //   results.toArray((err, resultsArray) => {
  //     if (err) throw err;

  //     console.log("results.toArray:", resultsArray);
  //   });


  //   // ==> At the end, we close the connection:
  //   db.close();
  // });


  // ==> We can just get the results as an array all at once:
  // db.collection("tweets").find().toArray((err, results) => {
  //   if (err) throw err;

  //   console.log("results array: ", results);

  //   // This is the end...
  //   db.close();
  // });


 // ==> Refactored and wrapped as new, tweet-specific function:

 function getTweets(callback) {
  db.collection("tweets").find().toArray((err, tweets) => {
    if (err) {
      return callback(err);
    }
    callback(null, tweets);
  });
}

//You could instead do this:
// function getTweets(callback) {
//   db.collection("tweets").find().toArray(callback);
// }

// ==> Later it can be invoked. Remember even if you pass
//     `getTweets` to another scope, it still has closure over
//     `db`, so it will still work. Yay!

getTweets((err, tweets) => {
  if (err) throw err;

  console.log("Logging each tweet:");
  for (let tweet of tweets) {
    console.log(tweet);
  }

  db.close();
});

});