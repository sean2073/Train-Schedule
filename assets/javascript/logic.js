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
var trainName = "";
var firsttrain = "";
var i =27;
// Capture Button Click
$("#reset-form").on("click", function() {
    //$("#trainName-input").reset();
    document.getElementById("#trainForm").reset();
  });
$("#add-user").on("click", function() {
 // Don't refresh the page!
  event.preventDefault();
  i++;
  console.log("i = " +i);
  // Code in the logic for storing and retrieving the most recent train.

  //changed this to use the proper form values
  destination = $("#dest-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  firsttrain = $("#first-train-input").val().trim();
  trainName = $("#trainName-input").val().trim();
  console.log("first train retrieved " + firsttrain);
  //convert time to a time that simply a unix number in seconds
  //firsttrain = moment(firsttrain, "HH:mm").format("X");
  console.log("first train before passed " + firsttrain);
//add the logic to calculate the nextArrival & minutesAway
getTimes(frequency, firsttrain);
//nextArrival = nextTrain;
console.log(nextArrival);
  //database.ref().set({
  //database.ref("Schedule").push({
  database.ref("Schedule").child("Train" + i).update({
    destination: destination,
    frequency: frequency,
    //firsttrain: firsttrain,
    minutesAway: minsAway,
    nextArrival: nextArrival, 
    trainName: trainName
  });
});

//Handle the initial load or data alread in your firebase database
database.ref("Schedule").on("child_added", function(snapshot) {
        console.log(snapshot.val());
        //console.log(snapshot.val().destination);
        //console.log(snapshot.val().frequency);
        //console.log(snapshot.val().age);
        //console.log(snapshot.val().comment);
        var testMoment = moment(snapshot.val().firsttrain, "X").format("HH:mm");
        //making sure moment is getting the time correct
        console.log(testMoment);
      //************calculating the train next arrival******************

//nextArrival = "fakevalue";
//minsAway = "0 (not yet calculated)";
      //***********end calculation ***********
// Change the HTML to reflect
      //creating the rows
      //$("#destination").append(snapshot.val().destination);
      //$("#frequency").append(snapshot.val().frequency);
      //$("#next-arrival").append(snapshot.val().nextArrival);
      //$("#minutes-away").append(snapshot.val().minutesAway);  
      //$("#train-name").append(snapshot.val().trainName);     
      var rowHtml = $("<div>");
      rowHtml.addClass("row");
      rowHtml.append($("<div>").addClass("col-xs-2").html(snapshot.val().trainName));
      rowHtml.append($("<div>").addClass("col-xs-2").html(snapshot.val().destination));
      rowHtml.append($("<div>").addClass("col-xs-2").html(snapshot.val().frequency));
      rowHtml.append($("<div>").addClass("col-xs-2").html(snapshot.val().nextArrival));
      rowHtml.append($("<div>").addClass("col-xs-2").html(snapshot.val().minutesAway));

      $("#all-trains").append(rowHtml);
      console.log($("#all-trains").html());
    // Create Error Handling
    }, function(errorObject) {
  console.log("The read failed: " + errorObject.code);

});

function getTimes(freq, first_time) {
      console.log("I'm in the getTimes function");

      // Assumptions
    //var tFrequency = 1440; // frequency
    var tFrequency = freq;
    console.log("frequency is " + tFrequency);
    console.log("I was passed " + freq);
    // Time is 3:30 AM
    //var firstTime = "00:00"; //train starts
    var firstTime = first_time;
    console.log("first train is " + firstTime);
    console.log("I was passed " + first_time);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("first time converted is "  + firstTimeConverted);

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
    console.log(nextTrain);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    //setting these global variable bc return isn't working liked I hoped
    nextArrival = moment(nextTrain).format("hh:mm A");
    
    minsAway = tMinutesTillTrain;
    console.log(minsAway);
    return nextTrain, tMinutesTillTrain;
  }
