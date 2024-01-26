const session = require("express-session");
const http = require("http");
const parseString = require("xml2js").parseString;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var sakabannRouter = require("./routes/sakaban");
const colorsRouter = require('./routes/colors'); 

const bodyParser = require('body-parser'); 

var app = express();

var session_opt = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
};
app.use(session(session_opt));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/sakabann", sakabannRouter);
app.use('/colors', colorsRouter);

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