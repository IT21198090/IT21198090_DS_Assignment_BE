const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/student.routes");
const cors = require("cors");

const app = express();
const port = 8003;

app.use(cors()); // Middleware to enable CORS
app.use(express.json()); // Middleware to parse JSON

// MongoDB connection
mongoose
  .connect("mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/sachinthads")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
