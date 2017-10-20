/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD7nxpgfrGCfUGT5loYJxdU3dn0SKLqOno",
    authDomain: "train-scheduler-5cab8.firebaseapp.com",
    databaseURL: "https://train-scheduler-5cab8.firebaseio.com",
    projectId: "train-scheduler-5cab8",
    storageBucket: "",
    messagingSenderId: "575319434106"
  };

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var trainDestination = $("#role-input").val().trim();
  var firstTrainTime = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: trainName,
    destination: trainDestination,
    time: firstTrainTime,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.destination);
  console.log(newEmp.time);
  console.log(newEmp.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrainTime);
  console.log(trainFrequency);

  // Prettify the Train time
  var firstTrainTimePretty = moment.unix(firstTrainTime).format("HH:mm");
  console.log(firstTrainTimePretty);

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(firstTrainTime, "X"), "hours");
  // console.log(empMonths);

  // Calculate the total billed frequency
  var empBilled = empMonths * trainFrequency;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + empMonths + "</td><td>" + trainFrequency);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee time date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js t