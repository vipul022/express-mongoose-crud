const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//custom error messages for validations
//  docs link https://mongoosejs.com/docs/4.x/docs/validation.html
const minlengthErrorMsg =
  "The value of path `{PATH}` (`{VALUE}`) is beneath the limit ({MINLENGTH}).  ";
const maxlengthErrorMsg =
  "The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).  ";
const requiredErrorMsg = "{PATH} is required!}"; //custom error message for required validation
const maxlengthContent = [60, maxlengthErrorMsg];
const minlengthTitle = [3, minlengthErrorMsg];
const minlengthUsername = [3, minlengthErrorMsg];
const minlengthContent = [30, minlengthErrorMsg];

// Define Post schema
const Post = new Schema({
  title: {
    type: String,
    required: true,
    minlength: minlengthTitle,
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
    required: requiredErrorMsg,
    // minlength: minlengthUsername,
  },
  content: {
    type: String,
    required: requiredErrorMsg,
    // minlength: minlengthContent,
    // maxlength: maxlengthContent,
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

Post.statics.findByUsername = function (username) {
  return this.find({ username: username });
};

module.exports = mongoose.model("Post", Post);
