import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyGrounds() {
  const [grounds, setGrounds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyGrounds();
  }, []);

  const fetchMyGrounds = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await API.get("/api/grounds/mygrounds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGrounds(res.data);
    } catch (error) {
      console.log("My grounds error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-8">My Grounds</h2>

        {grounds.length === 0 ? (
          <p className="text-gray-600">You have not added any grounds yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grounds.map((ground) => (
              <div
                key={ground._id}
                className="bg-white rounded-xl shadow-md p-5 border"
              >
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {ground.groundName}
                </h3>

                <p className="text-gray-600">
                  <span className="font-semibold">Sport:</span> {ground.sportType}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span> {ground.location}
                </p>

                <p className="text-gray-800 font-semibold mt-2">
                  ₹{ground.pricePerHour} / hour
                </p>

                <p className="text-gray-600 mt-2 text-sm">
                  <span className="font-semibold">Slots:</span>{" "}
                  {ground.availableSlots?.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyGrounds;