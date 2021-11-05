let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToFind = req.params.id;

    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    const index = database.cindy.reminders.indexOf(searchResult);
    
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
      database.cindy.reminders[index]['title'] = req.body.title;
      database.cindy.reminders[index]['description'] = req.body.description;
      database.cindy.reminders[index]['completed'] = reminderCompleted;
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToDelete = req.params.id;
    for (let i = 0; i < database.cindy.reminders.length; i++) {
      if (database.cindy.reminders[i].id == reminderToDelete) {
        // This deletes the reminder item at index i given the id it's being chosen
        // The 1 is for how many objects it will delete on index i
        database.cindy.reminders.splice(i,1);
      }
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
// hi