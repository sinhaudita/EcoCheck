import React, { useState, useEffect } from "react";
import Navbar from "@/components/layouts/Navbar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

const Monthly = () => {
  const [formData, setFormData] = useState({
    userId: "",
    gender: "",
    bodyType: "",
    socialFrequency: "",
    airTravel: "",
    groceryBill: "",
    vehicleDistance: "",
    clothingItems: "",
    recycled: {
      glass: false,
      metal: false,
      paper: false,
      plastic: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userId = getUserIdFromToken();

    if (authToken && userId) {
      setFormData((prev) => ({
        ...prev,
        userId,
      }));
    } else {
      setError("Authentication error: Please log in again.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (["glass", "metal", "paper", "plastic"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        recycled: {
          ...prev.recycled,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Submitting form data:", formData);

      const res = await fetch("http://localhost:5000/api/monthly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
      }

      if (!res.ok) {
        throw new Error(
          data?.message || `Error (${res.status}): Unable to submit form`
        );
      }

      localStorage.setItem(`monthlyFormSubmitted_${formData.userId}`, "true");
      setFormSubmitted(true);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (formSubmitted) {
    return (
      <div style={containerStyle}>
        <Navbar />
        <div style={thankYouBoxStyle}>
          <h2 style={headerStyle}>Thank You!</h2>
          <p style={{ marginBottom: "20px" }}>
            You have already submitted the monthly sustainability form.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              ...buttonStyle,
              background: "#16a34a",
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Navbar />
      <svg style={svgStyle} viewBox="0 0 1440 320">
        <path
          fill="#bbf7d0"
          fillOpacity="1"
          d="M0,160L40,165.3C80,171,160,181,240,181.3C320,181,400,171,480,144C560,117,640,75,720,64C800,53,880,75,960,90.7C1040,107,1120,117,1200,128C1280,139,1360,149,1400,154.7L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headerStyle}>Monthly Sustainability Form</h2>

        {error && <div style={errorBoxStyle}>{error}</div>}

        <input
          type="hidden"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />

        {[
          { label: "Gender", name: "gender", options: ["male", "female"] },
          {
            label: "Body Type",
            name: "bodyType",
            options: ["normal", "underweight", "overweight"],
          },
          {
            label: "Social Frequency",
            name: "socialFrequency",
            options: ["often", "sometimes", "never"],
          },
          {
            label: "Air Travel",
            name: "airTravel",
            options: ["never", "rarely", "frequently", "very frequently"],
          },
        ].map((field) => (
          <div key={field.name}>
            <label style={labelStyle}>{field.label}:</label>
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select</option>
              {field.options.map((opt) => (
                <option value={opt} key={opt}>
                  {opt[0].toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}

        <label style={labelStyle}>Monthly Grocery Bill (₹):</label>
        <input
          type="number"
          name="groceryBill"
          value={formData.groceryBill}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Monthly Vehicle Distance (km):</label>
        <input
          type="number"
          name="vehicleDistance"
          value={formData.vehicleDistance}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>New Clothing Items/Month:</label>
        <input
          type="number"
          name="clothingItems"
          value={formData.clothingItems}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <fieldset style={{ border: "none", padding: 0, marginTop: "20px" }}>
          <legend style={{ ...labelStyle, marginTop: "0" }}>
            Recycled Items:
          </legend>
          <div style={checkboxContainer}>
            {["glass", "metal", "paper", "plastic"].map((item) => (
              <label key={item} style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name={item}
                  checked={formData.recycled[item]}
                  onChange={handleChange}
                  style={{ marginRight: "6px" }}
                />
                {item[0].toUpperCase() + item.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          style={{
            ...buttonStyle,
            background: isLoading ? "#6e7f56" : "#16a34a",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  background: "#f9fafb",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', sans-serif",
};

const svgStyle = {
  position: "absolute",
  top: 90,
  left: 0,
  width: "100%",
  zIndex: 0,
};

const formStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  maxWidth: "800px",
  margin: "100px auto",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  position: "relative",
  zIndex: 1,
};

const thankYouBoxStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  maxWidth: "800px",
  margin: "100px auto",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const headerStyle = {
  fontSize: "24px",
  marginBottom: "20px",
  fontWeight: "600",
  color: "#16a34a",
};

const errorBoxStyle = {
  padding: "10px",
  backgroundColor: "#fee2e2",
  color: "#b91c1c",
  borderRadius: "8px",
  marginBottom: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
  color: "#333",
  marginTop: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

const buttonStyle = {
  marginTop: "24px",
  color: "#fff",
  padding: "14px 24px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  width: "100%",
};

const checkboxContainer = {
  display: "flex",
  gap: "12px",
  marginTop: "10px",
  flexWrap: "wrap",
};

const checkboxLabelStyle = {
  display: "flex",
  alignItems: "center",
  marginRight: "12px",
};

export default Monthly;