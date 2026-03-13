import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function BookGround() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ground, setGround] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  useEffect(() => {
    fetchGroundDetails();
  }, []);

  const fetchGroundDetails = async () => {
    try {
      const res = await API.get(`/api/grounds/${id}`);
      setGround(res.data);
    } catch (error) {
      console.log("Ground details error:", error.response?.data || error.message);
      alert("Failed to load ground details");
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        groundId: id,
        date,
        slot,
      };

      const res = await API.post("/api/bookings", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Booking success:", res.data);
      alert("Booking successful");
      navigate("/mybookings");
    } catch (error) {
      console.log("Booking error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (!ground) {
    return <div className="p-6 text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Book Ground
        </h2>

        <div className="mb-6 space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">{ground.groundName}</h3>
          <p className="text-gray-600">
            <span className="font-semibold">Sport:</span> {ground.sportType}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Location:</span> {ground.location}
          </p>
          <p className="text-gray-800 font-semibold">
            ₹{ground.pricePerHour} / hour
          </p>
        </div>

        <form onSubmit={handleBooking} className="space-y-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            required
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Slot</option>
            {ground.availableSlots?.map((s, index) => (
              <option key={index} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookGround;