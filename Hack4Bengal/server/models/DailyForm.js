const mongoose = require("mongoose");

const dailyFormSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true }, // e.g., "2025-04-14"
  diet: String,
  showerFrequency: String,
  heatingSource: String,
  transport: String,
  vehicleType: String,
  wasteBagSize: String,
  wasteBagCount: Number,
  screenTime: Number,
  internetTime: Number,
  energyEfficiency: String,
  cookingWith: String,
});

module.exports = mongoose.model("DailyForm", dailyFormSchema);
