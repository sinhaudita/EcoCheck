import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layouts/Navbar";

const MonthlyDetails = () => {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found.");
        return;
      }

      console.log("Sending request with token:", token);

      const res = await axios.get("http://localhost:5000/api/monthly", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", res.data);
      setDetails(res.data);
    } catch (err) {
      console.error("Failed to fetch details:", err.response?.data || err.message);
    }
  };


    fetchDetails();
  }, []);

  if (!details) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading details...
      </p>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      {/* Top Wave */}
      <div style={{ position: "absolute", top: 0, width: "100%", zIndex: -1 }}>
        <svg viewBox="0 0 1440 320">
          <path
            fill="#d0f4de"
            fillOpacity="1"
            d="M0,64L60,96C120,128,240,192,360,186.7C480,181,600,107,720,96C840,85,960,139,1080,144C1200,149,1320,107,1380,85.3L1440,64L1440,0L0,0Z"
          />
        </svg>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "5rem", color: "#2d6a4f" }}>
        🌿 Monthly Sustainability Details
      </h2>

      <div
        style={{
          background: "#ffffff",
          maxWidth: "700px",
          margin: "2rem auto",
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Normal Fields */}
        {[
          { label: "Gender", value: details.gender },
          { label: "Body Type", value: details.bodyType },
          { label: "Social Frequency", value: details.socialFrequency },
          { label: "Air Travel", value: details.airTravel },
          { label: "Grocery Bill", value: `₹ ${details.groceryBill}` },
          { label: "Vehicle Distance", value: `${details.vehicleDistance} km` },
          { label: "Clothing Items", value: details.clothingItems },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: "1rem",
              padding: "0.8rem 1rem",
              background: "#e9f5ec",
              borderRadius: "12px",
              color: "#1b4332",
              fontWeight: "500",
            }}
          >
            <strong>{item.label}:</strong> {item.value}
          </div>
        ))}

        {/* Recycled Fields */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#d8f3dc",
            borderRadius: "15px",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h4 style={{ marginBottom: "0.5rem", color: "#2d6a4f" }}>
            Recycling Habits:
          </h4>
          {details.recycled &&
            Object.entries(details.recycled).map(([key, value]) => (
              <p
                key={key}
                style={{
                  margin: "4px 0",
                  color: value ? "#1b4332" : "#6c757d",
                }}
              >
                ♻ {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                <strong>{value ? "Yes" : "No"}</strong>
              </p>
            ))}
        </div>

        <button
          onClick={() => navigate("/monthly")}
          style={{
            marginTop: "2rem",
            padding: "0.8rem 1.5rem",
            backgroundColor: "#40916c",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2d6a4f")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#40916c")}
        >
          ✏ Edit Details
        </button>
      </div>

      {/* Bottom Wave */}
      <div
        style={{ position: "absolute", bottom: 0, width: "100%", zIndex: -1 }}
      >
        <svg viewBox="0 0 1440 320">
          <path
            fill="#d0f4de"
            fillOpacity="1"
            d="M0,160L60,149.3C120,139,240,117,360,96C480,75,600,53,720,74.7C840,96,960,160,1080,154.7C1200,149,1320,75,1380,37.3L1440,0L1440,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default MonthlyDetails;