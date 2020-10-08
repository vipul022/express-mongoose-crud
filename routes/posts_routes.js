const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  makePost,
  removePost,
  changePost,
  makeComment,
} = require("../controllers/posts_controller");

// READ
// GET on '/posts'
// Returns all posts
router.get("/", getPosts);

// READ
// GET on '/posts/:id'
// Returns post with given id
router.get("/:id", getPost);

// CREATE
// POST on '/posts'
// Creates a new post
router.post("/", makePost);

// DELETE
// DELETE on '/posts/:id'
// Deletes a post with id
router.delete("/:id", removePost);

// UPDATE
// PUT on 'posts/:id'
// Updates a post with id
router.put("/:id", changePost);

//CREATE
//POST on "posts/:postId"
//Add a comment to the specified postId
router.post("/:postId/comments", makeComment);

module.exports = router;

// Adding comments on posts to the completed mongoose example app
//         - Add model to model/posts.js
//         - Add controller function to controllers/posts_controller.js
//         - Add routes to routes/posts_routes.js
//         - Add utility function to utils/posts_utilities.js
//         - Add test to tests/posts_utilities.test.js
//         - Add narrative instance method to models/post.js
//         - Add users collection, make sure at least one in mongodb has their username as a commentor
//         - show $lookup of username and comments

// Try to avoid looking at canvas or the supergoose repo for hints. Normally you have to write a program that doesn't exist yet, so start practicing!
