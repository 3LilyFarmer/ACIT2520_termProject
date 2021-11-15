const {userModel} = require("../usermodel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const userController = require("./user_controller");

let localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    console.log("I entered here")
    console.log(email, password)
    
      let user = userModel.findOne(email);
      if (user) {
        if (user.password === password) {
         return done(null, user)
        }
      }
      return done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
  }
);

const githubLogin = new GitHubStrategy(
  {
    clientID: "b4e5bb8b5c32472a25d",
    clientSecret: "6d172296ccb8c9335083ff14952985332f2e0608",
    //clientID: process.env.GITHUB_CLIENT_ID,
    //clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    let user = userController.getUserByGitHubIdOrCreate(profile);
    return done(null, user);
  }
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function (id, done) {
    let user = userModel.findById(id);
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
});
  
module.exports = passport.use(localLogin).use(githubLogin);
  