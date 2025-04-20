import React, { useState } from "react";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


const getUserIdFromToken = () => {
  const token = localStorage.getItem('authToken');
  console.log(token)
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id; // 'id' because you stored { id } in token
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};



const DailyForm = () => {
  const [formData, setFormData] = useState({
    diet: "",
    showerFrequency: "",
    heatingSource: "",
    transport: "",
    vehicleType: "",
    wasteBagSize: "",
    wasteBagCount: "",
    screenTime: "",
    internetTime: "",
    energyEfficiency: "",
    cookingWith: "",
  });



  
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

const userId = getUserIdFromToken();
console.log(userId)


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userId) {
    alert("User not logged in.");
    return;
  }

  const dataToSend = {
    ...formData,
    userId, // send user ID with the form
    date: new Date().toLocaleDateString("en-CA"), // gives YYYY-MM-DD in your local timezone
};

  try {
    await axios.post("http://localhost:5000/api/daily-form", dataToSend, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });

    alert("Data submitted!");
    setFormData({
        diet: "",
        showerFrequency: "",
        heatingSource: "",
        transport: "",
        vehicleType: "",
        wasteBagSize: "",
        wasteBagCount: "",
        screenTime: "",
        internetTime: "",
        energyEfficiency: "",
        cookingWith: "",
      });
      
    navigate("/dashboard");

  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error submitting form");
  }
};


  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar style={{ position: "relative", zIndex: 10 }} />

      <svg
        style={{ position: "absolute", top: 90, left: 0, width: "100%", zIndex: 0 }}
        viewBox="0 0 1440 320"
      >
        <path
          fill="#bbf7d0"
          d="M0,160L40,165.3C80,171,160,181,240,181.3C320,181,400,171,480,144C560,117,640,75,720,64C800,53,880,75,960,90.7C1040,107,1120,117,1200,128C1280,139,1360,149,1400,154.7L1440,160V0H0Z"
        ></path>
      </svg>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "800px",
          margin: "100px auto",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "600", color: "#16a34a" }}>
          Daily Sustainability Form
        </h2>

        {[
          { label: "Diet", name: "diet", options: ["pescatarian", "vegan", "vegetarian", "omnivore"] },
          { label: "Shower Frequency", name: "showerFrequency", options: ["daily", "less frequently"] },
          { label: "Heating Source", name: "heatingSource", options: ["coal", "electricity", "natural gas", "wood"] },
          { label: "Transport", name: "transport", options: ["private", "public", "walk/bicycle"] },
          { label: "Vehicle Type", name: "vehicleType", options: ["diesel", "electric", "hybrid", "lpg", "petrol"] },
          { label: "Waste Bag Size", name: "wasteBagSize", options: ["extra large", "large", "medium", "small"] },
          { label: "Energy Efficiency", name: "energyEfficiency", options: ["No", "Sometimes", "Yes"] },
          { label: "Cooking With", name: "cookingWith", options: ["coal", "electricity", "natural gas", "wood"] },
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: "16px" }}>
            <label className="block font-medium text-gray-700 mb-1">{field.label}</label>
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="">Select</option>
              {field.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}

        <div style={{ marginBottom: "16px" }}>
          <label className="block font-medium text-gray-700 mb-1">Waste Bag Weekly Count</label>
          <input
            type="number"
            name="wasteBagCount"
            value={formData.wasteBagCount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            min="0"
            required
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="block font-medium text-gray-700 mb-1">TV/PC Hours Per Day</label>
          <input
            type="number"
            name="screenTime"
            value={formData.screenTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            min="0"
            required
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label className="block font-medium text-gray-700 mb-1">Internet Hours Per Day</label>
          <input
            type="number"
            name="internetTime"
            value={formData.internetTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            min="0"
            required
          />
        </div>

        <Button
          type="submit"
          className="bg-earthwise-green hover:bg-earthwise-green-dark text-white w-full py-2"
        >
          Submit Details
        </Button>
      </form>
    </div>
  );
};

export default DailyForm;
