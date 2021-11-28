let database = require("../models/userModel");

let adminController = {
  admin: (req, res) => {
    const user = req.user;
    const sessions = {};
    req.sessionStore.all((err, session) => {
      if(err) {
        return console.log(err.message);
      }

      for (const [key, value] of Object.entries(session)) {
        sessions[value.passport.user] = key;
      }
      console.log(sessions);
      console.log(user.id)
      res.render("admindashboard", {user, sessions});
    });
    
  },

  delete: (req, res) => {
    let sessionID = req.params.id;
    req.sessionStore.destroy(sessionID);
    res.redirect("/admin");
  },
};

module.exports = adminController;