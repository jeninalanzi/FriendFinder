// htmlRoute.js
// This file handles all the HTML get requests.


// =========================================================
// DEPENDENCIES - PATH package is required to get correct
// file path for our HTML
const path = require("path");


// =========================================================
// All ROUTING is handled below:
// =========================================================

// This is what will be exported & displayed to the user.
module.exports = function (app) {

    // GET request for "/"
    // Joins absolute-path URL plus where the HOME file belongs
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // GET request for "/survey"
    // Joins absolute-path URL plus where the SURVEY file belongs
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // Default to HOME file if no match is found
    // (Referenced from Activity 14 - Hot Restaurant)
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    })

};