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

// global variables
var trnName;
var trnDestination;
var trnFirst;
var trnFrequency;
var trnNext;
var trnMinAway;

// button for adding trains
$("#add-train-btn").on("click", function() {

	// prevents page refresh from happening on the submit event
	event.preventDefault();

	// grabs user input
	trnName = $("#train-name-input").val().trim();
		if (trnName === "") {
			alert("train name is missing");
			// $('#alertModal').modal();
			return false;
		}
	trnDestination = $("#destination-input").val().trim();
		if (trnDestination === "") {
			alert("train desintation is missing");
			// $('#alertModal').modal();
			return false;
		}
	trnFirst = $("#first-input").val().trim();
		if (trnFirst === "") {
			alert("first train time missing");
			// $('#alertModal').modal();
			return false;
		}
	trnFrequency = $("#frequency-input").val().trim();
		if (trnFrequency === "") {
			alert("train frequency missing");
			// $('#alertModal').modal();
			return false;
		}

	// creates local "temporary" object for holding train data
	var newTrain = {
		name: trnName,
		destination: trnDestination,
		first: trnFirst,
		frequency: trnFrequency,
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

// creates a firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	// store everything into a variable
	var trnName = childSnapshot.val().name;
	var trnDestination = childSnapshot.val().destination;
	var trnFirst = childSnapshot.val().first;
	var trnFrequency = childSnapshot.val().frequency;

	// train info
	console.log(trnName);	
	console.log(trnDestination);
	console.log(trnFirst);
	console.log(trnFrequency);

	// moment JS implementation

	// converts time to readable format
	var firstTimeConverted = moment(trnFirst, "HH:mm MM DD YYYY").subtract(1, "years");
	console.log("first time converted: " + firstTimeConverted);

	// converts the time into minutes
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("difference in time: " + diffTime);

	// finds the remainder of the the time converted into minutes
	var tRemainder = diffTime % trnFrequency;
	console.log(tRemainder);

	// finds the minutes away until the next train
	var minAway = trnFrequency - tRemainder;
	console.log(minAway);

	// displays the minutes away until the next train
	trnMinAway = moment().add(minAway, "minutes");
	console.log("minutes away: " + minAway);

	// // displays the time of the next train
	trnNext = moment(trnMinAway).format("hh:mm A");
	console.log("next train: " + trnNext);
	// end moment JS implementation

	// add each train's data into the table
	$("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + trnNext + "</td><td>" + trnMinAway + "</td></tr>");
});
// end firebase event for adding trains from user input to table

});

