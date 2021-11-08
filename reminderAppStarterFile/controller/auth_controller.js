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
      failureRedirect: "/login"
    })
  },  

  registerSubmit: (req, res) => {
    // implement
    res.render("/login");
  },
};

module.exports = authController;
