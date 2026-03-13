import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Grounds() {
  const [grounds, setGrounds] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrounds();
  }, []);

  const fetchGrounds = async () => {
    try {
      const res = await API.get("/api/grounds");
      setGrounds(res.data);
    } catch (error) {
      console.log("Fetch grounds error:", error.response?.data || error.message);
    }
  };

  const handleBookNow = (groundId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    navigate(`/book-ground/${groundId}`);
  };

  const filteredGrounds = grounds.filter((ground) =>
    ground.groundName.toLowerCase().includes(search.toLowerCase()) ||
    ground.location.toLowerCase().includes(search.toLowerCase()) ||
    ground.sportType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-12 shadow-md">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Find Your Perfect Sports Ground
          </h1>

          <p className="text-green-100 mb-6 text-lg">
            Search by ground name, location, or sport
          </p>

          <input
            type="text"
            placeholder="Search grounds, city, sport..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl px-5 py-3 rounded-xl shadow-lg border-none focus:outline-none focus:ring-4 focus:ring-green-200 text-gray-700"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Available Grounds
        </h2>

        {filteredGrounds.length === 0 ? (
          <p className="text-gray-500 text-lg">No grounds found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGrounds.map((ground) => (
              <div
                key={ground._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={
                      ground.image && ground.image.trim() !== ""
                        ? `http://localhost:5000${ground.image}`
                        : "https://via.placeholder.com/600x300?text=Sports+Ground"
                    }
                    alt={ground.groundName}
                    className="w-full h-52 object-cover"
                  />

                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ₹{ground.pricePerHour}/hr
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    {ground.groundName}
                  </h3>

                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">📍 Location:</span>{" "}
                    {ground.location}
                  </p>

                  <div className="mb-3">
                    <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                      {ground.sportType}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-semibold">Slots:</span>{" "}
                    {ground.availableSlots?.length > 0
                      ? ground.availableSlots.join(", ")
                      : "No slots available"}
                  </p>

                  <button
                    onClick={() => handleBookNow(ground._id)}
                    className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Grounds;