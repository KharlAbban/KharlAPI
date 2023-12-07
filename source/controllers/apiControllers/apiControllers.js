// Import Project Model
const Project = require("../../models/projectModel");
const Category = require("../../models/categoryModel");
const {putObjectInsideBucket, getObjectInsideBucket} = require("../../middlewares/s3actions");

const {GetObjectCommand} = require("@aws-sdk/client-s3")

function showAPIDocsPage(req, res) {
	res.render("apiDocs");
}

async function getAllProjects(req, res) {
	// res.render("projectPage");
	try {
		const projects = await Project.find({}, { _id: 0, createdAt: 0, lastUpdatedAt: 0 });

		for (const project of projects) {
			const imageUrl = await getObjectInsideBucket(project.imageName);
			project._doc.imageurl = await getObjectInsideBucket(project.imageName);
			// console.log(project);
		}

		res.status(200).json({ projectList: projects, total: projects.length });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ message: "Error on server. Please refresh!" });
	}
}

async function submitProject(req, res) {
	const {
		name,
		projectID,
		category,
		summary,
		status,
		author,
		description,
		codeHub,
		liveSite,
		author_email,
		client
	} = req.body;

	let imageName = "defaultWebsiteImage.jpg";
	let imageBuffer;
	
	try {
		if (req.file) {
			const fileNameGenerator = () => req.file.fieldname + "-" + Date.now();
			const fileName = fileNameGenerator();
			imageName = fileName;
			imageBuffer = req.file.buffer;

			await putObjectInsideBucket(imageName, imageBuffer, req.file.mimetype);
		}

		const newProject = await Project.create({
			name,
			projectID,
			category,
			status,
			summary,
			description,
			codeHub,
			liveSite,
			author,
			author_email,
			client,
			imageName,
		});
		
		// console.log(req.file);
		res.status(201).json({ message: "Done" });
	} catch (err) {
		console.log(req.body);
		console.log(err.message);
	}
}

async function getCategory(req, res) {
	try {
		const categories = await Category.find({}, { name: 1, _id: 0 });
		res.json({ cats: categories });
	} catch (err) {
		console.log(err.message);
	}
}

async function submitCategory(req, res) {
	const { categoryName } = req.body;
	try {
		const newCategory = await Category.create({ name: categoryName });
		res.json({ id: newCategory._id });
	} catch (err) {
		console.log(err.message);
	}
}

module.exports = {
	showAPIDocsPage,
	getAllProjects,
	submitProject,
	getCategory,
	submitCategory,
};
