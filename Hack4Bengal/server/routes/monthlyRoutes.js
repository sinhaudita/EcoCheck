const express = require("express");
const router = express.Router();
const MonthlyForm = require("../models/MonthlyForm");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, async(req, res) => {
    try {
        const { userId, ...formFields } = req.body;

        // Confirm the userId from token matches the one sent
        if (req.user.id !== userId) {
            return res.status(401).json({ message: "Unauthorized userId" });
        }

        // Find the existing form for the user (no month/year filtering)
        const existingForm = await MonthlyForm.findOne({ userId });

        if (existingForm) {
            await MonthlyForm.updateOne({ _id: existingForm._id }, {...formFields });
            return res.status(200).json({ message: "Form updated successfully" });
        } else {
            const newForm = new MonthlyForm({ userId, ...formFields });
            await newForm.save();
            return res.status(201).json({ message: "Form submitted successfully" });
        }
    } catch (err) {
        console.error("Error saving form:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
// routes/monthly.js
router.get("/", protect, async(req, res) => {
    try {
        const form = await MonthlyForm.findOne({ userId: req.user.id });

        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error("Error fetching form:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;