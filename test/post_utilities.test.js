const mongoose = require("mongoose");
const expect = require("expect");
const utilities = require("../utils/posts_utilities");
const Post = require("../models/post");
const { getAllPosts } = require("../utils/posts_utilities");

let postId = null;
// set up connection for test database
const dbConn = "mongodb://localhost/blog_app_test";

// Use done to deal with asynchronous code - done is called when the hooks completes. before hook will be  executed to connect to db before any test is run
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

// Set up test data before each test
beforeEach(async function () {
  // Load a test record in setupData
  // Use await so we can access the postId, which is used by some tests
  let post = await setupData();
  postId = post._id;
});
//created a function to create a post for testing
function setupData() {
  let date = Date.now();
  let testPost = {};
  testPost.title = "Test post 1";
  testPost.username = "tester";
  testPost.create_date = date;
  testPost.modified_date = date;
  testPost.content = "This is the first test post";
  testPost.category = "";

  return Post.create(testPost);
}
//delete the post after running each test
afterEach((done) => {
  tearDownData().exec(() => done());
});

function tearDownData() {
  return Post.deleteMany(); //delete all posts
}
// Disconnect from the test database after all tests run. Call done to indicate complete.
after((done) => {
  mongoose.disconnect(() => done());
});

describe("getAllPosts with one posts", () => {
  it("should get a post if one exist", async function () {
    let req = {};
    await getAllPosts(req).exec((err, posts) => {
      expect(posts.length).toBe(1);
    });
  });

  it("username of the first post should be tester", async function () {
    let req = {};
    await getAllPosts(req).exec((err, posts) => {
      expect(posts[0].username).toBe("tester");
    });
  });
});
