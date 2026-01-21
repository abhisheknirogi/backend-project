const verifyToken = require("./verifyToken");

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Admin only" });
    }
  });
};

module.exports = verifyAdmin;
