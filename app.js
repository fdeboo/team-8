const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const { auth } = require("express-openid-connect");
const req = require("express/lib/request");

const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// // OPEN AUTH
// app.use(
//   auth({
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//   })
// );

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //   console.log(req.cookies);
  next();
});

// ROUTES
app.use("/api/v1/", userRouter);
app.use("/", viewRouter);

// GLOBAL ERRORS
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
