
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

// Button for adding trains
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var trainDestination = $("#role-input").val().trim();
  var firstTrainTime = $("#start-input").val().trim();
  var trainFrequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newEmp = {
    name: trainName,
    destination: trainDestination,
    time: firstTrainTime,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  // console.log(newEmp.name);
  // console.log(newEmp.destination);
  // console.log(newEmp.time);
  // console.log(newEmp.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");

  return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  // console.log(trainName);
  // console.log(trainDestination);
  // console.log(firstTrainTime);
  // console.log(trainFrequency);


  //First time
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    
    // Current time
    var currentTime = moment();
    // console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));
    
    // Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    // console.log(tRemainder);
    
    // Mins until train
    var minTillNextTrain = trainFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + minTillNextTrain);
    
    // Next train
    var nextTrain = moment().add(minTillNextTrain, "minutes").format("hh:mm");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minTillNextTrain);
});
