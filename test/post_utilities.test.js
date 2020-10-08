const mongoose = require("mongoose");
const expect = require("expect");
const utilities = require("../utils/posts_utilities");
const Post = require("../models/post");
const {
  getAllPosts,
  addPost,
  getPostById,
  deletePost,
  updatePost,
  addComment,
} = require("../utils/posts_utilities");

let postId = null; //postId is given a global scope and is used in beforeEach below
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
  postId = post._id; //this is used for testing getPostById and deletePost below
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

describe("getPostById", () => {
  it("username of the first post should be tester", async () => {
    let req = {
      params: {
        id: postId,
      },
    };
    await getPostById(req).exec((err, post) => {
      expect(post.username).toBe("tester");
    });
  });
});

// addPost
describe("addPost", () => {
  it("should add a post", async function () {
    // define a req object with expected structure
    const req = {
      body: {
        title: "Another post",
        username: "tester",
        content: "This is another blog post!",
        category: "",
      },
    };
    //exec is not used as Post instance is returned instead of a query
    await addPost(req).save((err, post) => {
      expect(post.title).toBe(req.body.title);
    });
  });
});

// deletePost
describe("deletePost", () => {
  it("should delete the specified post", async function () {
    await deletePost(postId).exec(); //first deleted the post created in setupData above
    await Post.findById(postId).exec((err, post) => {
      // find the the post
      expect(post).toBe(null);
    });
  });
});

// updatePost
describe("updatePost", () => {
  it("should update a post", async function () {
    // set up a req object
    const req = {
      params: {
        id: postId,
      },
      body: {
        title: "Updated post",
        username: "tester",
        content: "This is an updated blog post!",
        category: "",
      },
    };
    await updatePost(req).exec((err, post) => {
      expect(post.title).toBe(req.body.title);
    });
  });
});

//addComment returns a promise so .then is used here instead of exec()
describe.only("addComment", () => {
  it("should add a comment", async function () {
    const req = {
      params: {
        postId: postId,
      },
      body: {
        username: "vipul",
        comment: "this is a nice comment!",
      },
    };

    await addComment(req).then((post) => {
      // console.log("post=> ", post);
      expect(post.comments.length).toBe(1);
      expect(post.comments[0].username).toBe("vipul");
    });
  });
});
