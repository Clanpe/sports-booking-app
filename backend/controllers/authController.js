const getGrounds = async (req, res) => {
    res.json([
        { name: "Cricket Ground", location: "Delhi", price: 500 },
        { name: "Football Turf", location: "Noida", price: 800 }
    ])
}

const addGround = async (req, res) => {
    const { name, location, price } = req.body

    res.json({
        message: "Ground added successfully",
        ground: { name, location, price }
    })
}

module.exports = { getGrounds, addGround }