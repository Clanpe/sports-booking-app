import { useState } from "react"
import API from "../services/api"
import { useNavigate, Link } from "react-router-dom"

function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    try {

      const res = await API.post("/api/auth/signup", {
        name,
        email,
        password
      })

      console.log("Signup response:", res.data)

      alert("Signup successful")

      navigate("/login")

    } catch (error) {

      console.log("Signup error:", error.response?.data || error.message)

      alert("Signup failed")

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-green-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Create Sports Account
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Signup
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold">
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>

  )

}

export default Signup