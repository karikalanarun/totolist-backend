var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const userRouter = require("./user/user.route");
const usersRouter = require("./user/users.route");
const todoListRouter = require("./todolist/todolist.route");
const friendReqRouter = require("./friend_requests/friend_request.route");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("express-jwt")({
  algorithms: ["HS256"],
  secret: config.get("session.secret"),
});

mongoose.connect(config.get("mongo.url"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);

app.use("/todolist", jwt, todoListRouter);
app.use("/users", jwt, usersRouter);
app.use("/friend_request", jwt, friendReqRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.status === 401) {
    res.status(401).json(err);
    return;
  }
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
