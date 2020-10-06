const Post = require("../models/post");

// get all posts
// return a query
const getAllPosts = function (req) {
  // console.log("req=>", req);
  return Post.find(); //returns all posts
};

// add post
// returns a new Post object
const addPost = function (req) {
  let date = Date.now();
  req.body.create_date = date;
  req.body.modified_date = date;
  // console.log("req=> ", req);
  return new Post(req.body); //returns new Post instance
};

const getPostById = function (req) {
  return Post.findById(req.params.id); //returns a specific post
};

const deletePost = function (req) {};

const updatePost = function (req) {};
module.exports = { getAllPosts, getPostById, addPost, deletePost, updatePost };
