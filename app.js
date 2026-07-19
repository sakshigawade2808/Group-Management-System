// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("connect-flash");

// Database
require("./models/db");

// Routes
const groupRoutes = require("./routes/groupRoutes");

// Controllers
const groupController = require("./controllers/groupController");

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// -------------------- Middleware --------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session
app.use(session({
    secret: "groupmanagementsecret",
    resave: false,
    saveUninitialized: true
}));

// Flash Messages
app.use(flash());

// Make flash messages available in all EJS pages
app.use((req, res, next) => {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();

});

// -------------------- View Engine --------------------

app.set("view engine", "ejs");

// -------------------- Routes --------------------

// Dashboard
app.get("/", groupController.dashboard);

// Group Routes
app.use("/groups", groupRoutes);

// Logout
app.get("/logout", (req, res) => {
    res.render("login");
});

// Test Route
app.get("/test", (req, res) => {
    res.send("Test Route Working");
});

// -------------------- Server --------------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});