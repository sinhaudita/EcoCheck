const express = require("express");
const router = express.Router();
const DailyForm = require("../models/DailyForm");

// Fetch daily form by userId and date
router.get("/", async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({ error: "userId and date are required" });
    }

    const form = await DailyForm.findOne({ userId, date });

    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ message: "No data found for this user on this date" });
    }
  } catch (error) {
    console.error("Error fetching daily form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Save or update daily form
router.post("/", async (req, res) => {
  try {
    const { userId, date, ...formFields } = req.body;

    const existingForm = await DailyForm.findOne({ userId, date });

    if (existingForm) {
      // Update existing entry
      await DailyForm.updateOne({ _id: existingForm._id }, { ...formFields });
      res.status(200).json({ message: "Form updated successfully" });
    } else {
      // Create new entry
      const newForm = new DailyForm({ userId, date, ...formFields });
      await newForm.save();
      res.status(201).json({ message: "Form submitted successfully" });
    }
  } catch (err) {
    console.error("Error saving form:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
