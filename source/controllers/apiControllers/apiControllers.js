// Import Project Model
const Project = require("../../models/projectModel");
const Category = require("../../models/categoryModel");

function showAPIDocsPage(req, res) {
	res.render("apiDocs");
}

async function getAllProjects(req, res) {
	try {
		const projects = await Project.find({}, { _id: 0 });
		res.status(200).json({ projectList: projects, total: projects.length });
		// res.render("projectPage");
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
		client,
		// imageName,
	} = req.body;
	let imageName = "defaultWebsiteImage.jpg";
	if (req.file) imageName = req.file.filename;
	try {
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
		console.log(req.file);
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
