const {userModel} = require("../usermodel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const userCredentials = (email, password) => {
      let user = userModel.findOne(email);
      if (user) {
        if (user.password === password) {
          return user;
        }
      }
      return null;
    };

    return userCredentials
      ? done(null, userCredentials)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);


passport.serializeUser(function (user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function (id, done) {
    let user = userController.getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
});
  
module.exports = passport.use(localLogin);
  