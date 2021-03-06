var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var studentRouter = require("./routes/students");
var cors = require("cors");

var app = express();
var mongoose = require("mongoose");
var connexionStringLocal =
  "mongodb+srv://idkbutimlucas:3tAJyb54E89QLfSxKEao@iut.0hmqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var mongodb = process.env.MONGO_URI || connexionStringLocal;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/students", studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
