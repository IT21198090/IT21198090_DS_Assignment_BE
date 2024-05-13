const authorize = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res
        .status(403)
        .send(
          "Access Denied: You don’t have the right permission to perform this action."
        );
    }
  };
};

module.exports = authorize;
