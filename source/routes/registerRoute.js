const express = require("express");
const registerRouter = express.Router();
const registerControllers = require("../controllers/registerControllers");
const {needsNoAuth} = require("../middlewares/jwtMethods");

// Set up Router
registerRouter.use(express.json());
registerRouter.use(needsNoAuth);

// Set up routes
registerRouter.get("/", registerControllers.showRegisterPage);
registerRouter.post("/", registerControllers.registerNewUser);

// Export Router
module.exports = registerRouter;