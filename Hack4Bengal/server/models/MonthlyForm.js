const mongoose = require("mongoose");

const monthlyFormSchema = new mongoose.Schema({
    userId: {
        type: String, required: true,
        ref: "User",
        required: true,
    },

    gender: String,
    bodyType: String,
    socialFrequency: String,
    airTravel: String,
    groceryBill: Number,
    vehicleDistance: Number,
    clothingItems: Number,
    recycled: {
        glass: Boolean,
        metal: Boolean,
        paper: Boolean,
        plastic: Boolean,
    },
});

module.exports = mongoose.model("MonthlyForm", monthlyFormSchema);