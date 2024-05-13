const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      console.log(token);
      const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
      const user = await User.findById(decoded._id);

      if (!user) {
        throw new Error("User not found.");
      }

      // Check if the user's role allows access
      if (roles.length && !roles.includes(user.role)) {
        return res
          .status(403)
          .send({ error: "Access denied. Insufficient permissions." });
      }

      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: "Please authenticate.", message: error });
    }
  };
};

module.exports = auth;
