// Basic dependencies
const express = require("express");
const path = require("path");

// Set app = express
var app = express();

// Set the PORT
var PORT = process.env.PORT || 8080;

// Express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Absolute paths for css and images folders.
const publicPath = express.static(path.join(__dirname, './app/public/css'));
const publicImages = express.static(path.join(__dirname, './app/public/images'));

 //Jenina, this is a vitual path after the root level that
 //it is defined.
   app.use('/css', publicPath);
    app.use('/images', publicImages);

// ================================================================================

// Routers that point the server to the proper .js files
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});