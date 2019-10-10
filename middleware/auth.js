const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.redirect('/login');
  }
};

const noSessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

const getUserId = (req, res, next) => {
  return req.user && req.user._id;
};

module.exports = {
  sessionChecker,
  noSessionChecker,
  getUserId,
};
