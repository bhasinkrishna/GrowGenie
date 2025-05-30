const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plantType: String,
  spaceLocation: String,
  sunlight: String,
  wateringFrequency: String,
  climateCondition: String,
  spaceSize: String,
  gardeningExperience: String,
  gardeningMethod: String,
  additionalInfo: String,

  
  location: String,
  soilType: String,
  contactNumber: String,
  preferredTime: String,
  goals: String
});

module.exports = mongoose.model("Form", formSchema);
