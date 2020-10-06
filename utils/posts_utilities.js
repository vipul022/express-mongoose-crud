const Post = require("../models/post");

// get all posts
// return a query
const getAllPosts = function (req) {
  return Post.find(); //returns all posts
};

const addPost = function (req) {};

const getPostById = function (req) {};

const deletePost = function (req) {};

const updatePost = function (req) {};
module.exports = { getAllPosts, getPostById, addPost, deletePost, updatePost };
