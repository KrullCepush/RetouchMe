const express = require("express");
const multer = require("multer");

const router = express.Router();

const { sessionChecker, isAdmin } = require("../middleware/auth");

const Task = require("../models/task");
const User = require("../models/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

router.get("/", (req, res) => {
  res.render("orders/orderForm");
});

module.exports = router;
