const User = require("../models/UserModel");
const {handleLoginErrors} = require("../middlewares/loginErrorHandler");
const {createJWTToken, maxAgeForExpiry} = require("../middlewares/jwtMethods");

function showLoginPage (req, res) {
    res.render("login");
}

// Use statics function on User model to auth user for login
async function loginUser (req, res) {
    const {email, password} = req.body;
    try {
        // Auth user here
        const user = await User.loginUser(email, password);
        // Create token and attach to cookie
        const token = await createJWTToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAgeForExpiry*1000}).redirect("/home");
    } catch (err) {
        // Handle login errors here
        console.log(err.message);
        const errors = handleLoginErrors(err);
        res.status(400).json({errorsFound: errors});
    }
}

module.exports = {
    showLoginPage,
    loginUser
}