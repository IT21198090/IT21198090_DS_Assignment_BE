const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 8000;

app.use(cors()); // Middleware to enable CORS
app.use(express.json()); // Middleware to parse JSON
app.use(morgan("dev"));
// MongoDB connection
mongoose
  .connect("mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/sachinthads")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);

function logRequestsAndResponses(req, res, next) {
  const start = process.hrtime();

  // Log incoming request details
  console.log(`${req.method} ${req.originalUrl} - Request incoming`);

  // Hook into the send method of the response
  const originalSend = res.send;
  res.send = function (body) {
    // Log outgoing response details
    const elapsed = process.hrtime(start);
    const elapsedMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
    console.log(
      `${res.statusCode} ${req.method} ${
        req.originalUrl
      } - Response sent in ${elapsedMs.toFixed(3)}ms`
    );

    // Continue with the original send method
    originalSend.apply(this, arguments);
  };

  next();
}

// Use the middleware in your application
app.use(logRequestsAndResponses);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
