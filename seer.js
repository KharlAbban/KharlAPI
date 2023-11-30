//Check environment and configure variables
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// Set up server
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const morgan = require("morgan");
const APIDB = require("./source/db_connections/kharlapi_db");
const registerRoute = require("./source/routes/registerRoute");
const loginRoute = require("./source/routes/loginRoute");
const apiRoute = require("./source/routes/apiRoutes/apiRouter");
const homeRoute = require("./source/routes/homeRoutes/homeRouter");

// Server config
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("combined"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/source/views");

// Set up routes
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/api", apiRoute);
app.use("/home", homeRoute);

// Start server
app.listen(process.env.PORT_NO, async (req, res) => {
    try {
        await APIDB();
        console.log(`Server started on port ${process.env.PORT_NO}`);
    } catch (err) {
        console.log(err.message);
    }
});

// Landing Page
app.get("/", (req, res) => {
    res.render("landing");
});

// Set up 404
app.get("*", (req, res) => {
    res.render("404");
});