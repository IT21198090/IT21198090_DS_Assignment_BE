const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const enrollmentRoutes = require("./routes/enrollment.routes");
const app = express();

// Use CORS and BodyParser middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI =
  "mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/sachinthads";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/api", enrollmentRoutes);

// Start the server
const PORT = 8008;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
