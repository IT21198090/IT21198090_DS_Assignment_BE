require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const courseRoutes = require("./controllers/course.controller");
const cors = require("cors");
const app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(cors());
// MongoDB Connection
const mongoURI =
  "mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/sachinthads";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Courses Routes
app.use("/api/courses", courseRoutes);

// Basic route for testing the server is up
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

const PORT = process.env.PORT || 8006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
