const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Post schema
const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
  },
  modified_date: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: String,
  comments: [
    {
      username: String,
      comment: String,
    },
  ],
});
//Instance method
Post.methods.narrativeComments = function () {
  return this.comments.map((com) => `${com.username} says ${com.comment}`); //this is used in makeComment function
};

//Static/Class method to find post by category
Post.statics.findByCategory = function (category) {
  return this.find({ category: category });
};

module.exports = mongoose.model("Post", Post);
