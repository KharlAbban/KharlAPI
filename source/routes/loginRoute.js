const express = require("express");
const loginRouter = express.Router();
const loginControllers = require("../controllers/loginControllers");
const {needsNoAuth} = require("../middlewares/jwtMethods");

// Set up Router
loginRouter.use(express.json());
loginRouter.use(needsNoAuth);

// Set up routes
loginRouter.get("/", loginControllers.showLoginPage);
loginRouter.post("/", loginControllers.loginUser);

// Export Router
module.exports = loginRouter;