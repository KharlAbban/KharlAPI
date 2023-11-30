const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

// Create Schema for Users
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "No project name!"]
    },
    projectID: {
        type: Number,
        trim: true,
        unique: [true, "This project ID already exists"],
        default: Math.floor(Math.random() *10000)
    },
    category: {
        type: String,
        required: [true, "Select a category"],
        trim: true
    },
    status: {
        type: String,
        required: [true, "You must provide a project status!"]
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "Give a brief summary"]
    },
    description: {
        type: String,
        trim: true,
    },
    codeHub: {
        type: String,
        trim: true,
        required: [true, "Please provide a code base for your project"]
    },
    liveSite: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        required: [true, "Provide an author name"],
        trim: true
    },
    author_email: {
        type: String,
        required: [true, "Enter an email address!"],
        minLength: 7,
        lowercase: true,
        validate: [isEmail, "Email is not valid"]
    },
    client: {
        type: String,
        trim: true,
        default: "Personal"
    },
    imageName: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    lastUpdatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

// Validation Checks before user creation
// Hash password before save
// userSchema.pre("save", async function (next) {});


// Static Methods on Project Schema


// Create and eport models
const projectModel = mongoose.model("Project", projectSchema);
module.exports = projectModel;