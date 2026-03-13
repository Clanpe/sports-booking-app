import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await API.get("/api/bookings/mybookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.log("My bookings error:", error.response?.data || error.message);
      alert("Failed to load bookings");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-8">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md p-5 border"
              >
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {booking.ground?.groundName}
                </h3>

                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span>{" "}
                  {booking.ground?.location}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold">Sport:</span>{" "}
                  {booking.ground?.sportType}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span> {booking.date}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold">Slot:</span> {booking.slot}
                </p>

                <p className="text-gray-800 font-semibold mt-2">
                  Status: {booking.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;