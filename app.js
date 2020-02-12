console.log("javascript loaded")
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB9z2wnvh385AjspUf38TRxCX_qJB4nz9E",
    authDomain: "train-schedule-40d94.firebaseapp.com",
    databaseURL: "https://train-schedule-40d94.firebaseio.com",
    projectId: "train-schedule-40d94",
    storageBucket: "train-schedule-40d94.appspot.com",
    messagingSenderId: "598298892240",
    appId: "1:598298892240:web:9b302d7e7f14bf8b080bd5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database()


$("#addtrain").on("click", function () {
    event.preventDefault()

    //Stored and retrieved new train data information
    var trainName = $("#trainname").val()
    var destination = $("#Destination").val()
    var firsttraintime = $("#First-Train-Time").val()
    var frequency = $("#Frequency").val()

    //Employee Information
    console.log(trainName, destination, firsttraintime, frequency)

    // push the train to the database
    db.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firsttraintime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    $("form")[0].reset();
})

// show the info after calculate next train and minutes away
//Creating a firebase event for adding the data from the new trains and then putting them in the DOM
db.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val().trainName)

// calculate next train and minutes away 
var nextArrival;
var minsAway;

//Change year so that the first train comes before the current time
var firsttrainNew = moment(childsnapshot.val().firstTrain,"hh:mm").subtract(1,"years");

//Stating the difference between the firstTrain and the current train
var diffTime = moment().diff(moment(firstTrainNew),"minutes");
var remainder = diffTime % childsnapshot.val().frequency;

//Minutes away from the next train
var minsAway = childsnapshot.val().frequency - remainder;

//Next train time
var nextTrain = moment(nextTrain).format("hh:mm");

// you know the firsttrain, frequency  // current time

$("#trains").append(trow)

var trow= `<tr>

<td>${data.val().trainName}</td>
<td>${data.val().destination}</td>
<td>${data.val().firsttraintime}</td>
<td>${data.val().frequency}</td>
</tr>`

//Appending the added row to the table provided

//add the data into the DOM/ HTML
$("#add-row").append("<tr><td>" + childsnapshot.val().name +
    "</td><td>" + childSnapshot.val().destination +
    "</td><td>" + childSnapshot.val().frequency +
    "</td><td>" + nextTrain + 
    "</td><td>" + minsAway + "</td></tr>");

//Deal with the errors
}, function(errorObject) {
    console.log("Errors Handled: " + errorObject.code);

});

