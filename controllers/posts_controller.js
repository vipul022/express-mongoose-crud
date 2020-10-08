const { query } = require("express");

const {
  getAllPosts,
  getPostById,
  addPost,
  deletePost,
  updatePost,
  addComment,
} = require("../utils/posts_utilities");

const getPosts = function (req, res) {
  // execute the query from getAllPosts

  getAllPosts(req)
    .sort({
      //sorting the posts in descending order
      modified_date: -1,
    })
    .exec((err, posts) => {
      //here a callback is passed to exec function which takes error and results(posts ) as arguments
      if (err) {
        res.status(500);
        return res.json({
          error: err.message,
        });
      } else {
        res.send(posts);
      }
    });
};

const getPost = function (req, res) {
  getPostById(req).exec((err, post) => {
    if (err) {
      res.status(400);
      return res.send("Post not found");
    } else {
      res.send(post);
    }
  });
};

const makePost = function (req, res) {
  // exec function is not used here as this function is returning the Post instance from addPost not the query
  addPost(req).save((err, post) => {
    //saving the Post instance

    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    }
    res.status(201);
    res.send(post);
  });
};

const makeComment = function (req, res) {
  //addComment returns a promise as it is asycn function so instead of using exec(), we need to use .then here to resolve the promise
  addComment(req)
    .then((post) => {
      res.status(200);
      res.send(post);
      // res.send(post.narrativeComments());
      // console.log(post.narrativeComments());
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: err.message,
      });
    });
};

const removePost = function (req, res) {
  // execute the query from deletePost
  deletePost(req.params.id).exec((err) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    }
    res.sendStatus(204);
  });
};

const changePost = function (req, res) {
  updatePost(req).exec((err, post) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    } else {
      res.send(post);
    }
  });
};
module.exports = {
  getPosts,
  getPost,
  makePost,
  removePost,
  changePost,
  makeComment,
};
