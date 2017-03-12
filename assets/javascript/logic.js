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