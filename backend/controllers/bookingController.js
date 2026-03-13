const Booking = require("../models/Booking")
const Ground = require("../models/Ground")

// Create Booking
const createBooking = async (req, res) => {

  try {

    const { groundId, date, timeSlot } = req.body

    // check if ground exists
    const ground = await Ground.findById(groundId)

    if (!ground) {
      return res.status(404).json({ message: "Ground not found" })
    }

    // check if slot already booked
    const existingBooking = await Booking.findOne({
      ground: groundId,
      date,
      timeSlot
    })

    if (existingBooking) {
      return res.status(400).json({ message: "Slot already booked" })
    }

    const booking = new Booking({
      user: req.user._id,
      ground: groundId,
      date,
      timeSlot,
      totalPrice: ground.pricePerHour
    })

    const savedBooking = await booking.save()

    res.status(201).json(savedBooking)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


// Get My Bookings
const getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({ user: req.user._id })
      .populate("ground")

    res.json(bookings)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


// Cancel Booking
const cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    await booking.deleteOne()

    res.json({ message: "Booking cancelled" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking
}