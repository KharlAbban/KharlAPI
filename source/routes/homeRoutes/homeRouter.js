const express = require("express");
const homeRouter = express.Router();
const homeControllers = require("../../controllers/homeControllers/homeControllers");
const {needsAuth} = require("../../middlewares/jwtMethods");

// Set up Router
homeRouter.use(express.json());
homeRouter.use(needsAuth);

// Set up routes
homeRouter.get("/", homeControllers.showHomePage);

// Export Router
module.exports = homeRouter;