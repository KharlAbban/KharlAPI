// Import Project Model
const Project = require("../../models/projectModel");
const Category = require("../../models/categoryModel");

function showAPIDocsPage (req, res) {
    res.render("apiDocs");
}

// async function getAllProjects (req, res) {
//     try {
//         const projects = await Project.find({});
//         res.status(200).json({projectList: projects, total: projects.length});
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json({message: "Error on server. Please refresh!"});
//     }
// }
async function getAllProjects (req, res) {
    res.render("projectPage");
}

async function submitProject (req, res) {
    console.log(req.body);
    console.log(req.file);
    res.json({message: "Done"});
}

module.exports = {
    showAPIDocsPage,
    getAllProjects,
    submitProject
}