const {
  getAllPosts,
  getPostById,
  addPost,
  deletePost,
  updatePost,
} = require("../utils/posts_utilities");

const getPosts = function (req, res) {
  // execute the query from getAllPosts
  getAllPosts(req).exec((err, posts) => {
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
  getPostById(req);
};

const makePost = function (req, res) {
  addPost(req);
};

const removePost = function (req, res) {
  deletePost(req);
};

const changePost = function (req, res) {
  updatePost(req);
};
module.exports = { getPosts, getPost, makePost, removePost, changePost };
