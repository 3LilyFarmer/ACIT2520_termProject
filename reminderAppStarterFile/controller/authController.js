const passport = require("../middleware/passport");
const {database} = require("../models/userModel");
const fetch = require("node-fetch");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },
  dashboard: (req, res) => {
    res.render("./dashboard", { req });
  },
  register: (req, res) => {
    res.render("auth/register");
  },

  loginTest: (req, res, next) => {
    next();
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  }),

  logout: (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  },

  registerSubmit: async (req, res,) => {
    userInput = req.body;
    const url = `https://api.unsplash.com/photos/random/?query=cats&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    let image = responseJson.urls.small;
    let image_des = responseJson.description;
    database.push({
      id: Date.now(),
      name: userInput.email.split("@")[0],
      email: userInput.email,
      password: userInput.password,
      profile_img: image,
      profile_img_des: image_des,
    });
  
      res.redirect("/auth/login");
  },

  gitLogin: passport.authenticate("github"),
  githubCB: passport.authenticate('github', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
  }),

};

module.exports = authController;