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

	// alert
	alert("Employee successfully added");

	// clears all of the text-boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-input").val("");
	$("#frequency-input").val("");

	//prevents moving to new page
	return false;
});
// end button for adding trains

});

