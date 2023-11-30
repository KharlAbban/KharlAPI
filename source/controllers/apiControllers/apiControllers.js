// Import Project Model
const Project = require("../../models/projectModel");

function showAPIDocsPage (req, res) {
    res.render("apiDocs");
}

async function getAllProjects (req, res) {
    try {
        const projects = await Project.find({});
        res.status(200).json({projectList: projects, total: projects.length});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: "Error on server. Please refresh!"});
    }
}

async function submitProject (req, res) {}

module.exports = {
    showAPIDocsPage,
    getAllProjects,
    submitProject
}