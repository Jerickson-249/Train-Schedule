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
    var trainName = $("#trainname").val()
    var destination = $("#Destination").val()
    var firsttraintime = $("#First-Train-Time").val()
    var frequency = $("#Frequency").val()
    console.log(trainName, destination, firsttraintime, frequency)
    // push the train to the database
    db.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firsttraintime,
        frequency: frequency

    })

})


// show the info after calculate next train and minutes away

db.ref().on("child_added", function(data){
    console.log(data.val().trainName)

var trow= `<tr>

<td>${data.val().trainName}</td>
<td>${data.val().destination}</td>
<td>${data.val().firsttraintime}</td>
<td>${data.val().frequency}</td>
</tr>`

$("#trains").append(trow)


})
