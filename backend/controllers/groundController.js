const Ground = require("../models/Ground")

// Add Ground
const addGround = async (req, res) => {

  try {

    const ground = new Ground({
      ...req.body,
      owner: req.user._id
    })

    const savedGround = await ground.save()

    res.status(201).json(savedGround)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


// Get All Grounds
const getGrounds = async (req, res) => {

  try {

    const grounds = await Ground.find()

    res.json(grounds)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


// Update Ground
const updateGround = async (req, res) => {

  try {

    const ground = await Ground.findById(req.params.id)

    if (!ground) {
      return res.status(404).json({ message: "Ground not found" })
    }

    const updatedGround = await Ground.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedGround)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


// Delete Ground
const deleteGround = async (req, res) => {

  try {

    const ground = await Ground.findById(req.params.id)

    if (!ground) {
      return res.status(404).json({ message: "Ground not found" })
    }

    await ground.deleteOne()

    res.json({ message: "Ground removed" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

module.exports = {
  addGround,
  getGrounds,
  updateGround,
  deleteGround
}