const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook");

module.exports = function(passport){

// Definte authentication middleware to pass to all API routes
router.use(isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.json({data: "not logged in"}); 
});

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

return router;
}
