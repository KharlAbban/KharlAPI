const User = require("../models/UserModel");
const { handleRegisterErrors } = require("../middlewares/registerErrorHandler");

function showRegisterPage(req, res) {
	res.render("register");
}

async function registerNewUser(req, res) {
	const { username, email, password } = req.body;
	try {
		// Find if unique details used
		const existingUser = await User.findOne({ email });
		if (existingUser)
			res.status(400).json({ message: "Email already registered!" });

		// Create New User
		const newUser = await User.create({ username, password, email });
		console.log("New user was created!");
		res.status(201).redirect("login");
	} catch (err) {
		console.log(err);
		const errors = handleRegisterErrors(err);
		res.status(500).json({ errorsFound: errors });
	}
}

module.exports = {
	showRegisterPage,
	registerNewUser,
};
