const { promisify } = require("util");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { is } = require("express/lib/request");

const cookieOptions = {
  expires: new Date(
    Date.now() +
      parseInt(process.env.JWT_COOKIE_EXPIRES_IN) +
      24 * 60 * 60 * 1000
  ),
  httpOnly: true,
};
if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

// jwt decodes the token to read the payload (param1) -> user id
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// AUTHENTICATION ROUTES:
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const token = signToken(newUser._id);
  res.cookie("jwt", token, cookieOptions);
  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("Please provide email and password!");
    err.statusCode = 400;
    err.status = "fail";
    throw err;
  }

  // +password because select is set to false in userModel
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    const err = new Error("Incorrect email or password");
    err.statusCode = 401;
    err.status = "fail";
    throw err;
  }

  const token = signToken(user._id);
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    // common practive to send a token via a http header called Authorization
    // Value should be "Bearer <token>"
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    const err = new Error(
      "You are not logged in! Please log in to get access."
    );
    err.statusCode = 401;
    err.status = "fail";
    return next(err);
  }

  // Decode payload to access user id`{}
  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const currentUser = await User.findById(decodedPayload.id);
  if (!currentUser) {
    const err = new Error("The user belonging to this token no longer exists.");
    err.statusCode = 401;
    err.status = "fail";
    return next(err);
  }

  const passwordChangedAfter = await currentUser.changedPasswordAfter(
    decodedPayload.iat
  );

  if (passwordChangedAfter) {
    const err = new Error(
      "User recently changed password! Please log in again."
    );
    err.statusCode = 401;
    err.status = "fail";
    return next(err);
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    try {
      const decodedPayload = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decodedPayload.id);
      if (!currentUser) {
        return next();
      }

      const passwordChangedAfter = await currentUser.changedPasswordAfter(
        decodedPayload.ia
      );

      if (passwordChangedAfter) {
        return next();
      }

      res.locals.user = currentUser;
      console.log("HERE");
      res.redirect("/me");
    } catch (err) {
      return next();
    }
  }
  next();
};
