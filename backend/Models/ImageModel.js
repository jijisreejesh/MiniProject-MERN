const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
  templateId: { type: String, requires: true },
  userId: { type: String, requires: true },

  image: { type: String},
  aboutImage: { type: String},

  work1: { type: String },
  work2: { type: String },
  work3: { type: String},

  serviceIcon1: { type: String },
  serviceIcon2: { type: String },
  serviceIcon3: { type: String },

});
const imageModel = mongoose.model("imageDetails", imageSchema);
module.exports = imageModel;
