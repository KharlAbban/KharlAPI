if (process.env.NODE_ENV !== "production") require("dotenv").config();
const jwt = require("jsonwebtoken");
const maxAgeForExpiry = 24*60*60;

// JWT Functions
async function createJWTToken (userId) {
    return jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAgeForExpiry
    });
}

// Authenticate JWT on user requests
async function needsAuth(req, res, next) {
    // Grab token from cookie
    const token = req.cookies.jwt;

    // Check if token exists and validate
    if (token) {
        await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                res.redirect("/login");
            } else {
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
}

// Prevent Logged in user from accessing login or register
async function needsNoAuth (req, res, next) {
    // Grab JWT
    const token = req.cookies.jwt;

    if (token) {
        await jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedToken) => {
            if (error) {
                next(err);
            } else {
                res.redirect("/home");
            }
        });
    } else {
        next();
    }
}


module.exports = {
    createJWTToken,
    maxAgeForExpiry,
    needsAuth,
    needsNoAuth
}