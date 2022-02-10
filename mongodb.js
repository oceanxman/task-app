//CRUD creat read update delete
//Install mongodb librairy

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-app";

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

//connected to the server
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!" + "\n" + error);
    }

    //console.log("Connected correctly");
    const db = client.db(databaseName);

  });

// /Users/Ethan/Desktop/node-course/Resources/mongodb/bin/mongod.exe --dbpath=/Users/Ethan/Desktop/node-course/Resources/mongodb-data
