const express = require("express");
const apiRouter = express.Router();
const apiControllers = require("../../controllers/apiControllers/apiControllers");

// Set up Router
apiRouter.use(express.json());

// Set up routes
apiRouter.get("/", apiControllers.showAPIDocsPage);
apiRouter.get("/projects", apiControllers.getAllProjects);
apiRouter.post("/submit-project", apiControllers.submitProject);

// Export Router
module.exports = apiRouter;