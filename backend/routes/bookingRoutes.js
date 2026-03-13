const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Ground = require("../models/Ground");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, async (req, res) => {
  try {
    const { groundId, date, slot } = req.body;

    const ground = await Ground.findById(groundId);

    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }

    const existingBooking = await Booking.findOne({
      ground: groundId,
      date,
      slot,
    });

    if (existingBooking) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    const newBooking = new Booking({
      user: req.user.email,
      ground: groundId,
      date,
      slot,
      status: "Confirmed",
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.log("BOOKING ERROR:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

router.get("/mybookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.email })
      .populate("ground")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.log("MY BOOKINGS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

module.exports = router;