const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  hobbies: [String],
});

module.exports = mongoose.model("Student", studentSchema);
