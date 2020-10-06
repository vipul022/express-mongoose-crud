const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRouter = require("./routes/posts_routes");

const port = process.env.port || 3000;

const app = express();
// middlewares
app.use(cors());
app.use(bodyParser.json());

const dbConn = "mongodb://localhost/blog_app";
// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
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
    } else {
      console.log("Connected to database!");
    }
  }
);

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Blog express app listening on port ${port}`);
});
