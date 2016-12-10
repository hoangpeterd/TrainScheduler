$(document).ready(function() {

// initializing firebase
var config = {
	apiKey: "AIzaSyCi2duyEoZsEZ2bYLjB2pop7yqbukV-tFE",
    authDomain: "trainscheduler-c7e6d.firebaseapp.com",
    databaseURL: "https://trainscheduler-c7e6d.firebaseio.com",
    storageBucket: "trainscheduler-c7e6d.appspot.com",
    messagingSenderId: "689950630388"
};
firebase.initializeApp(config);

var database = firebase.database();
// end initializing firebase

// button for adding trains
$("#add-train-btn").on("click", function() {

	// grabs user input
	var trnName = $("#train-name-input").val().trim();
	var trnDestination = $("#destination-input").val().trim();
	var trnFirst = $("#first-input").val().trim();
	var trnFrequency = $("#frequency-input").val().trim();

	// creates local "temporary" object for holding train data
	var newTrain = {
		name: trnName,
		destination: trnDestination,
		first: trnFirst,
		frequency: trnFrequency
	};

	// uploads employee data to the database
	database.ref().push(newTrain);

	//logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.first);
	console.log(newTrain.frequency);

	// alert modal
	$('#alertModal').modal();

	// clears all of the text-boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-input").val("");
	$("#frequency-input").val("");

	//prevents moving to new page
	return false;
});
// end button for adding trains

// moment JS implementation for next arrival and minutes away

// end moment JS implementation for next arrival and minutes away

// creates a firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	// store everything into a variable
	var trnName = childSnapshot.val().name;
	var trnDestination = childSnapshot.val().destination;
	var trnFrequency = childSnapshot.val().frequency;

	// train info
	console.log(trnName);	
	console.log(trnDestination);
	console.log(trnFrequency);

	// add each train's data into the table
	$("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + "Next Arrival" + "</td><td>" + "Minutes Away" + "</td></tr>");
});
// end firebase event for adding trains from user input to table

});

