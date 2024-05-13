const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const paymentRoutes = require("./routes/payment.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", paymentRoutes);
mongoose
  .connect("mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/sachinthads")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
const PORT = 8009;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
