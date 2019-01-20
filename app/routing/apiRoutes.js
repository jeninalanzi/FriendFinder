// apiRoutes.js
// This file handles all the "data" routes.

// =========================================================
// DEPENDENCIES - Needed to import everything stored
// for Friends in "data" directory
// and arraySort for sorting an array of objects (see post request)
const friendsData = require("../data/friends.js");
const arraySort = require("array-sort");

// =========================================================
// All ROUTING is handled below:
// =========================================================

module.exports = function(app) {

   // Tested - this works
   // GET Request for API of all friends
   app.get("/api/friends", function(req, res) {
       res.json(friendsData);
   });

   // __??
   // POST Request here
   app.post("/api/friends", function(req, res) {

       // Test the survey's functionality to see how the data is "spit out"
       console.log(req.body);

       // PARSE the user's data & answers into a storage variable
       var currentUserData = req.body;

       // NEW, EMPTY & SEPARATE array to store the total difference of every person being compared to:
       var totalDifferenceArray = [];
       var results = 0;

       // Nested for-loop which will loop through each friend stored in the array FIRST...
       for (var b = 0; b < friendsData.length; b++) {


           results=0;
           // ... then the loop which will go through each friend's individual score
           // and compare it to the current user's individual scores. (Then stored as "results")
           for (var i = 0; i < friendsData[b].scores.length; i++) {
               results += Math.abs(parseInt(currentUserData.scores[i]) - parseInt(friendsData[b].scores[i]));
           }


           // Once differences are calculated (by subtraction), it will take all the "difference" scores and put them into "results"
           // The total difference scores will be stored in a separate array of objects called totalDifferenceArray.
           totalDifferenceArray.push({
               name: friendsData[b].name,
               image: friendsData[b].image,
               totalDifference:  results 
                   // This will remove negative integers from results and assign value of "results" into the totalDifference property.
           });

       }

       // NEXT is for arraySort to sort all the differences in ascending order (least to most).
       // This is by using the array as the first argument, and the property in the second argument.
       arraySort(totalDifferenceArray, "totalDifference");

       // THEN the current user's data is pushed to the existing friendsData.
       friendsData.push(currentUserData);

       // Server-side testing to the console to ensure desired output.
      // console.log("All the possible matches: " + totalDifferenceArray[0]);
       console.log("Your best match is: " + totalDifferenceArray[0].name);
       console.log("Their photo is here: " + totalDifferenceArray[0].image);

       // FINALLY return to the user the FIRST value that appears once the scores are sorted.
       // The user with the least difference from the user appears in the top index, and is the "match".
       return res.json(totalDifferenceArray[0]);



   });
};