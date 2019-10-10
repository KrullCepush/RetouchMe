const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies) {
    next();
  } else {
    res.redirect("/login");
  }
};

const noSessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

const getUserId = (req, res, next) => {
  return req.session.user && req.session.user._id;
};

const isAdmin = (req, res, next) => {
  if (req.session.user.admin && req.cookies) {
    next();
  } else {
    res.redirect("/dashboard");
  }
};

const isAuthorized = (req, res, next) => {
  if (req.session.user.admin || req.session.user._id === req.params.id) {
    next();
  } else {
    res.redirect("/dashboard");
  }
};

module.exports = {
  sessionChecker,
  noSessionChecker,
  getUserId,
  isAdmin,
  isAuthorized,
};
