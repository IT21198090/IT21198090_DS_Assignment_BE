const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const instructorSchema = new mongoose.Schema({
  uniqueCode: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  profileImage: { type: String, required: true },
});

// Hash password before saving
instructorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to check the entered password against the hashed one
instructorSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Instructor", instructorSchema);
