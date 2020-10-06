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

const deletePost = function (id) {
  return Post.findByIdAndRemove(id);
};

const updatePost = function (req) {
  // console.log("req=> ", req);
  req.body.modified_date = Date.now();
  //the below method takes 3 arguments id, document object properties to be modified and option new:true  which returns the post document after modification, by default it returns document prior to modification
  return Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
};
module.exports = { getAllPosts, getPostById, addPost, deletePost, updatePost };
