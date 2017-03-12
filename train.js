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

database.ref().on("child_added", function(snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().destination);
        console.log(snapshot.val().frequency);
        //console.log(snapshot.val().age);
        //console.log(snapshot.val().comment);
      // Change the HTML to reflect
      
      

    // Create Error Handling
    }, function(errorObject) {
  console.log("The read failed: " + errorObject.code);

});


function pushIntoFirebase(newName, dest, freq, min, nextArr, trainNm) {
    database.ref("Schedule").child(newName).update({
         destination: dest,
         frequency: freq,
          minutesAway: min,
          nextArrival: nextArr,
          trainName: trainNm
    });
}
//console.log(moment("14:00"));
//var now = moment().diff(moment("14:00"));//.format("HH:mm");
//console.log(now);
pushIntoFirebase("Train1", "Atlanta", 1440, 537, "00:00", "Midnight Train to Georgia");