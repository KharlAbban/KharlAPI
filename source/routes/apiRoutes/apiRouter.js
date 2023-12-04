const express = require("express");
const apiRouter = express.Router();
const apiControllers = require("../../controllers/apiControllers/apiControllers");
const multer = require("multer");
const upload = require("../../middlewares/uploadConfig");

// Set up Router
apiRouter.use(express.json());
apiRouter.use("/projects", express.static("public/uploads"));

// Set up routes
apiRouter.get("/", apiControllers.showAPIDocsPage);

apiRouter.get("/projects", apiControllers.getAllProjects);
apiRouter.post(
	"/submit-project",
	upload.single("projectImage"),
	apiControllers.submitProject
);

apiRouter.get("/category", apiControllers.getCategory);
apiRouter.post("/add-category", apiControllers.submitCategory);

// Export Router
module.exports = apiRouter;
