import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Navbar from "@/components/layouts/Navbar";

// Function to decode the JWT and get the user ID
const getUserIdFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch {
    return null;
  }
};

// Function to format the date to dd-mm-yyyy
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const ShowDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = getUserIdFromToken();
  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const res = await axios.get("http://localhost:5000/api/daily-form", {
          params: { userId, date: today.toLocaleDateString("en-CA") },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, today]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>
    );

  if (!data)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        No data found for today.
      </p>
    );

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
        📋 Your Details for {formatDate(today)}
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
        <div
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "#40916c",
            borderBottom: "2px solid #95d5b2",
            paddingBottom: "0.5rem",
          }}
        >
          🌱 Daily Activity Summary
        </div>

        {Object.entries(data).map(([key, value]) =>
          key !== "_id" && key !== "__v" && key !== "userId" && key !== "date" ? (
            <div
              key={key}
              style={{
                marginBottom: "1rem",
                padding: "0.8rem 1rem",
                background: "#e9f5ec",
                borderRadius: "12px",
                color: "#1b4332",
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
              </span>
              <span>{String(value).toUpperCase()}</span>
            </div>
          ) : null
        )}

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => window.history.back()}
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
            Go Back
          </button>
        </div>
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

export default ShowDetails;
