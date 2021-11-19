let database = require("../database");

let remindersController = {
  list: (req, res) => {
    for (let each_user in database) {
      if (database[each_user].id == req.user.id) {
        res.render("reminder/index", { reminders: database[each_user].reminders });
      }
      // console.log(database[each_user].id);
    }
    // console.log(req.user.id);
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    for (let each_user in database) {
      if (database[each_user].id == req.user.id) {
        let searchResult = database[each_user].reminders.find(function (reminder) {
          return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
          res.render("reminder/single-reminder", { reminderItem: searchResult });
        } else {
          res.render("reminder/index", { reminders: database[each_user].reminders });
        }
      }
    }
  },

  create: (req, res) => {
    for (let each_user in database) {
      if (database[each_user].id == req.user.id) {
        let reminder = {
          id: database[each_user].reminders.length + 1,
          title: req.body.title,
          description: req.body.description,
          completed: false,
        };
        database[each_user].reminders.push(reminder);
      }
    }
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let searchResult = {};
    for (let each_user in database) {
      if (database[each_user].id == req.user.id) {
        let reminderToFind = req.params.id;
        searchResult = database[each_user].reminders.find(function (reminder) {
          return reminder.id == reminderToFind;
        });
      }
    }
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToFind = req.params.id;
    for (let each_user in database) {
      if (database[each_user].id == req.user.id) {
        let searchResult = database[each_user].reminders.find(function (reminder) {
          return reminder.id == reminderToFind;
        });

        const index = database[each_user].reminders.indexOf(searchResult);

        if (index > -1) {
          let reminderCompleted = req.body.completed;
          if (reminderCompleted === "true") {
            reminderCompleted = true;
          } else {
            reminderCompleted = false;
          }
          console.log(req.body.title)
          console.log(req.body.description)
          console.log(reminderCompleted)
          database[each_user].reminders[index]['title'] = req.body.title;
          database[each_user].reminders[index]['description'] = req.body.description;
          database[each_user].reminders[index]['completed'] = reminderCompleted;
        }
      }
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToDelete = req.params.id;
    for (let each_user in database) {
      if (database[each_user].id == req.user.id) {
        for (let i = 0; i < database[each_user].reminders.length; i++) {
          if (database[each_user].reminders[i].id == reminderToDelete) {
            console.log(database[each_user].reminders[i].id);
            // This deletes the reminder item at index i given the id it's being chosen
            // The 1 is for how many objects it will delete on index i
            database[each_user].reminders.splice(i, 1);
          }
        }
      }
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;