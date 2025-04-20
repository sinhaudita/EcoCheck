// server/routes/forms.js
const express = require("express");
const router = express.Router();
const DailyForm = require("../models/DailyForm");
const MonthlyForm = require("../models/MonthlyForm");

router.get("/get_form_data/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const daily = await DailyForm.findOne({ userId }).sort({ date: -1 });
        const monthly = await MonthlyForm.findOne({ userId });

        if (!daily || !monthly) {
            return res.status(404).json({ error: "Form data not found." });
        }

        return res.json({ daily, monthly });
    } catch (error) {
        console.error("Error fetching form data:", error);
        return res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
