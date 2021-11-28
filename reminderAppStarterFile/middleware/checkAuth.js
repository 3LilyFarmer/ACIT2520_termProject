module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  },
  ensureAdmin: (req, res, next) => {
    if(!req.isAuthenticated() || req.user.role !== "admin"){
      res.redirect("/");
    };
    if (req.user.role === 'admin') {
        return next();
    }
  }
};