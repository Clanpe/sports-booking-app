const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Ground = require("../models/Ground");
const protect = require("../middleware/authMiddleware");

// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// file filter for image types
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp/;
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );

  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const mimetype = allowedMimes.includes(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png, webp files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.get("/", async (req, res) => {
  try {
    const grounds = await Ground.find().sort({ createdAt: -1 });
    res.json(grounds);
  } catch (error) {
    console.log("GET grounds error:", error);
    res.status(500).json({ message: "Failed to fetch grounds" });
  }
});

router.get("/mygrounds", protect, async (req, res) => {
  try {
    const grounds = await Ground.find({ owner: req.user.email }).sort({
      createdAt: -1,
    });
    res.json(grounds);
  } catch (error) {
    console.log("MY grounds error:", error);
    res.status(500).json({ message: "Failed to fetch my grounds" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);

    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }

    res.json(ground);
  } catch (error) {
    console.log("GET single ground error:", error);
    res.status(500).json({ message: "Failed to fetch ground details" });
  }
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { groundName, sportType, location, pricePerHour, availableSlots } =
      req.body;

    let parsedSlots = [];

    if (availableSlots) {
      try {
        parsedSlots = JSON.parse(availableSlots);
      } catch (err) {
        parsedSlots = Array.isArray(availableSlots)
          ? availableSlots
          : availableSlots.split(",").map((slot) => slot.trim());
      }
    }

    const newGround = new Ground({
      groundName,
      sportType,
      location,
      pricePerHour,
      availableSlots: parsedSlots,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      owner: req.user.email,
    });

    const savedGround = await newGround.save();
    res.status(201).json(savedGround);
  } catch (error) {
    console.log("POST ground error:", error);
    res.status(500).json({ message: "Failed to add ground" });
  }
});

module.exports = router;