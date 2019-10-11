const openTask = (req, res, next) => {
  if (req.session.user && req.cookies) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  openTask,
};
