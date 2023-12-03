const express = require("express");
const apiRouter = express.Router();
const apiControllers = require("../../controllers/apiControllers/apiControllers");
const multer = require("multer");
const upload = require("../../middlewares/uploadConfig");
// const upload = multer({dest: "./public/uploads/"});

// Set up Router
apiRouter.use(express.json());

// Set up routes
apiRouter.get("/", apiControllers.showAPIDocsPage);
apiRouter.get("/projects", apiControllers.getAllProjects);
apiRouter.post("/submit-project", upload.single("projectImage"), apiControllers.submitProject);

// Export Router
module.exports = apiRouter;