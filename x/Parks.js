const { Schema, model, models } = require("mongoose");

const ParkSchema = new Schema({
  id: String,
  url: String,
  fullName: String,
  parkCode: String,
  description: String,
  states: String,
  images: [
    {
      credit: String,
      title: String,
      altText: String,
      caption: String,
      url: String,
    },
  ],
  weatherInfo: String,
  name: String,
  designation: String,
  relevanceScore: Number,
  activities: [
    {
      id: String,
      name: String,
    },
  ],
});

module.exports = models.Park || model("Park", ParkSchema);
