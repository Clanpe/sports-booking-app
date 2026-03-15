const Ground = require("../models/Ground");
const Feedback = require("../models/feedbackModel");

// Add Ground
const addGround = async (req, res) => {
  try {
    const ground = new Ground({
      ...req.body,
      owner: req.user._id,
    });

    const savedGround = await ground.save();
    res.status(201).json(savedGround);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Grounds with rating data
const getGrounds = async (req, res) => {
  try {
    const grounds = await Ground.find().lean();

    const groundsWithRatings = await Promise.all(
      grounds.map(async (ground) => {
        const feedbacks = await Feedback.find({ ground: ground._id });

        const feedbackCount = feedbacks.length;

        const averageRating =
          feedbackCount > 0
            ? (
                feedbacks.reduce((sum, item) => sum + item.rating, 0) /
                feedbackCount
              ).toFixed(1)
            : 0;

        return {
          ...ground,
          averageRating: Number(averageRating),
          feedbackCount,
        };
      })
    );

    res.json(groundsWithRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Ground
const updateGround = async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);

    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }

    const updatedGround = await Ground.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedGround);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Ground
const deleteGround = async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);

    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }

    await ground.deleteOne();

    // also delete related feedback
    await Feedback.deleteMany({ ground: req.params.id });

    res.json({ message: "Ground removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addGround,
  getGrounds,
  updateGround,
  deleteGround,
};