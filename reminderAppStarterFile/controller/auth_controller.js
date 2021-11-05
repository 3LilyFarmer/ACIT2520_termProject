const passport = require("./passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/auth/login"
    })
  },  

  registerSubmit: (req, res) => {
    // implement
    res.render("/auth/login");
  },
};

module.exports = {authController, 
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      // we cannot make it work
      return next();
    }
    res.redirect("../views/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  }
};
