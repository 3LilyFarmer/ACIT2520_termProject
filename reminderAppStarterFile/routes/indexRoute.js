const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {ensureAuthenticated, isAdmin, ensureAdmin} = require("../middleware/checkAuth");
const reminderController = require("../controller/reminderController");
const adminController = require("../controller/adminController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// Routes start here
router.get("/reminders", ensureAuthenticated, reminderController.list);

router.get("/reminder/new", ensureAuthenticated, reminderController.new);

router.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/reminder", ensureAuthenticated, reminderController.create);

router.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

router.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

router.get("/dashboard", ensureAuthenticated, reminderController.dashboard);

router.get("/admin", ensureAdmin, adminController.admin);
router.post("/admin/delete/:id", ensureAuthenticated, adminController.delete);

router.get("/upload", ensureAuthenticated, reminderController.upload);
router.post("/upload", ensureAuthenticated, upload.single("image"), reminderController.uploadImage)

module.exports = router;