/* global moment firebase */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAPmDk5teM0E2xb44H2CRHAD-m03e1gKww",
    authDomain: "train-time-325bb.firebaseapp.com",
    databaseURL: "https://train-time-325bb.firebaseio.com",
    storageBucket: "train-time-325bb.appspot.com",
    messagingSenderId: "859777916236"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();
// Initial Values
var destination = "";
var frequency = 0; //mins
var nextArrival = ""; //military time
var minsAway = 0;
var firstTrain = "";
var trainName = "";
// Capture Button Click
$("#add-user").on("click", function() {
 // Don't refresh the page!
  event.preventDefault();

  // Code in the logic for storing and retrieving the most recent train.
  destination = $("#dest-input").val().trim();
  frequency = $("#freq-input").val().trim();
  nextArrival = $("#nextArr-input").val().trim();
  minsAway = $("#minsAway-input").val().trim();
  trainName = $("#trainName-input").val().trim();
  //call getTime function in order to get minutesAway and Next arrival
  getTimes(frequency,)
  //database.ref().set({
  //add train to firebase
  database.ref("Schedule").child("Train5").update({
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minsAway,
    trainName: trainName 
  //add train to schedule on screen

  });
});

//Handle the initial load or data alread in your firebase database
database.ref("Schedule").on("child_added", function(snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().destination);
        console.log(snapshot.val().frequency);
        //console.log(snapshot.val().age);
        //console.log(snapshot.val().comment);
      
// Change the HTML to reflect
      var newDiv = $("<div>");
      $("#destination").append(newDiv.html(snapshot.val().destination));
      $("#frequency").append(newDiv.html(snapshot.val().frequency));
      $("#next-arrival").append(newDiv.html(snapshot.val().nextArrival));
      $("#minutes-away").append(newDiv.html(snapshot.val().minutesAway));  
      //$("#train-name").append(snapshot.val().trainName); 
      $("#train-name").append(newDiv.html(snapshot.val().trainName));    
      

    // Create Error Handling
    }, function(errorObject) {
  console.log("The read failed: " + errorObject.code);

});

function getTimes(freq, first_time) {
      // Assumptions
    //var tFrequency = 1440; // frequency
    var tFrequency = freq;
    // Time is 3:30 AM
    //var firstTime = "00:00"; //train starts
    var firstTime = first_time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    return nextTrain, tMinutesTillTrain;
  }
/*function pushIntoFirebase(newName, dest, freq, min, nextArr, trainNm) {
    database.ref("Schedule").child(newName).update({
         destination: dest,
         frequency: freq,
          minutesAway: min,
          nextArrival: nextArr,
          trainName: trainNm
    });
    */
//}
//console.log(moment("14:00"));
//var now = moment().diff(moment("14:00"));//.format("HH:mm");
//console.log(now);
//pushIntoFirebase("Train4", "New Providence", 10, 8, "16:20", "Watchung Reservation");