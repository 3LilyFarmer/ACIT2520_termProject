let database = require("../database");
const imgur = require('imgur');
const path = require('path');
const fs = require('fs');

let userName = null;

let remindersController = {
  list: (req, res) => {
    if (req.user !== undefined) {
      userName = req.user.name;

      res.render("reminder/index", {
        reminders: database[userName].reminders,
        picture: database[userName].picture,
        name: userName
      });
    } else {
      res.render("auth/login");
    }
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[userName].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[userName].reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database[userName].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };

    database[userName].reminders.push(reminder);

    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[userName].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;

    let searchResult = database[userName].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    const index = database[userName].reminders.indexOf(searchResult);

    if (index > -1) {
      let reminderCompleted = req.body.completed;

      if (reminderCompleted === "true") {
        reminderCompleted = true;
      } else {
        reminderCompleted = false;
      }

      database[userName].reminders[index]['title'] = req.body.title;
      database[userName].reminders[index]['description'] = req.body.description;
      database[userName].reminders[index]['completed'] = reminderCompleted;
    }

    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;

    let searchResult = database[userName].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    const index = database[userName].reminders.indexOf(searchResult);

    if (index > -1) {
      database[userName].reminders.splice(index, 1);
    }

    res.redirect("/reminders");
  },

  dashboard: (req, res) => {
    res.render("dashboard", {req});
  },

  admin: (req, res) => {
    res.render("admindashboard", {req});
  },

  upload: (req, res) => {
    res.render("imgur", {user: req.user});
  },

  uploadImage: async function (req,res) {
    const file = req.file;
    let user = req.user;
    try {
        const url = await imgur.uploadFile(path.resolve(__dirname, '../'+file.path));
        fs.unlinkSync(path.resolve(__dirname, '../'+file.path));
        user.profile_img = url.link;
        user.profile_img_des = url.description;
      } catch (error) {
        console.log("error: ", error);
      }
      
    res.render("imgur", {user});
  }
};

module.exports = remindersController;