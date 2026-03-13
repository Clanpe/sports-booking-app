const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res) => {

  const { email, password } = req.body

  // simple login check (for now)
  if(email && password){

    const token = jwt.sign(
      { email },
      "secretkey",
      { expiresIn: "1h" }
    )

    res.json({
      message: "Login successful",
      token: token
    })

  } else {

    res.status(401).json({
      message: "Invalid credentials"
    })

  }

})

module.exports = router