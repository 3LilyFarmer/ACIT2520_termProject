const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const imgur = require("imgur");
const cors = require("cors");
const fs = require("fs");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./controller/passport");
const checkauth = require("./middleware/checkauth");
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here

app.get("/reminders", checkauth.ensureAuthenticated, reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", passport.authenticate("local", {
  successRedirect: "/reminders",
  failureRedirect: "/login"
}));

// connect this to database
app.post("/uploads/", async (req, res) => {
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    res.json({ message: url.data.link });
    fs.unlinkSync(`./uploads/${file.filename}`);
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
