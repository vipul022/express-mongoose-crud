const mongoose = require("mongoose");
const expect = require("expect");
const utilities = require("../utils/posts_utilities");
const Post = require("../models/post");

let postId = null;
// set up connection for test database
const dbConn = "mongodb://localhost/blog_app_test";

// Use done to deal with asynchronous code - done is called when the hooks completes
before((done) => connectToDb(done));

// Connect to the test database
function connectToDb(done) {
  // Connect to the database (same as we do in app.js)
  mongoose.connect(
    dbConn,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log("Error connecting to database", err);
        done();
      } else {
        console.log("Connected to database!");
        done();
      }
    }
  );
}

// Disconnect from the test database after all tests run. Call done to indicate complete.
after((done) => {
  mongoose.disconnect(() => done());
});
