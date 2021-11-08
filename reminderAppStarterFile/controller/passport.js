const {userModel} = require("../usermodel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
  
module.exports = passport.use(localLogin);
  