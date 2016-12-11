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

	// moment JS implementation for next arrival and minutes away
	var tFrequency = trnFrequency;
	var firstTime = trnFirst;

	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	var tRemainder = diffTime % tFrequency;
	console.log(tRemainder);

	var tMinutesTillTrain = tFrequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	moment().diff(moment.unix(tFirstTrain), "minutes");
	// end moment JS implementation for next arrival and minutes away

	// creates local "temporary" object for holding train data
	var newTrain = {
		name: trnName,
		destination: trnDestination,
		first: trnFirst,
		frequency: trnFrequency,
		arrival: tMinutesTillTrain,
		away: nextTrain
	};

	// uploads employee data to the database
	database.ref().push(newTrain);

	//logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.first);
	console.log(newTrain.frequency);
	console.log(newTrain.arrival);
	console.log(newTrain.away);

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
	var trnFrequency = childSnapshot.val().frequency;
	var nextTrain = childSnapshot.val().arrival;
	var tMinutesTillTrain = childSnapshop.val().away;

	// train info
	console.log(trnName);	
	console.log(trnDestination);
	console.log(trnFrequency);
	console.log(nextTrain);
	console.log(tMinutesTillTrain);

	// add each train's data into the table
	$("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
// end firebase event for adding trains from user input to table

});

