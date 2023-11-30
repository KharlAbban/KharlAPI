const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

// Create Schema for Users
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        // unique: true,
        required: [true, "You need a username to create an account!"]
    },
    password: {
        type: String,
        required: [true, "No password created"],
        minLength: [5, "Password should be at least 5 characters"],
    },
    age: {
        type: Number,
        min: [16, "Must be at least 16 years old!"]
    },
    email: {
        type: String,
        unique: true,
        validate: [isEmail, "Enter a valid email address"],
        minLength: [7, "Email is not valid"],
        required: [true, "You need to provide an email address"],
        lowercase: true
    },
    DOB: {
        type: Date
    },
    phoneNumber: {
        type: Number
    },
    country: {
        type: String
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    lastUpdatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

// Validation Checks before user creation
// Hash password before save
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// Static Methods on User Schema
// Static Method to Log in user
userSchema.statics.loginUser = async function (email, password) {
    // Check if user with this email exists
    const user = await this.findOne({email});
    if (!user) throw Error("No user found with this email address!");

    // Else, check if password matches
    const hasCorrectPwd = await bcrypt.compare(password, user.password);
    if (!hasCorrectPwd) throw Error("Incorrect Password!");

    return user;
}

// Create and eport models
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;