//Author: Mohd Rokon
//Date: 5/27/2020
//Version 1.0

var firebaseConfig = {
    apiKey: "AIzaSyCgp4_479DsYLynZSNVhE1VUErSskUjakg",
  authDomain: "webportfoliocontact-61ac6.firebaseapp.com",
  projectId: "webportfoliocontact-61ac6",
  storageBucket: "webportfoliocontact-61ac6.appspot.com",
  messagingSenderId: "431074090578",
  appId: "1:431074090578:web:e9d10e8ce14d1b4ddf898b",
  measurementId: "G-4E1ESBT84S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//get DOM elements
const submitButton = document.querySelector('#submit');
let firstName = document.querySelector('#fName');
let lastName = document.querySelector('#lName');
let email = document.querySelector('#emailAdd');
let subject = document.querySelector('#subject');
let message = document.querySelector('#message');

const db = firestore.collection("messageDB");
document.getElementById('submitButton').addEventListener('click', function(){
  document.getElementById('submitButton').addEventListener('click', $('h3').remove());
  let firstNameInput = firstName.value;
  let lastNameInput = lastName.value;
  let emailInput = email.value;
  let subjectInput = subject.value;
  let meassageInput = message.value;
  let time = getTimeStamp(); //fix this code

  firestore.collection('messageDB').get().then((snapshot) => {
    var check = false;
    snapshot.docs.forEach(doc => {
      console.log(doc.data().firstName);
      if(firstNameInput == "" || lastNameInput == "" || emailInput == "" || subjectInput == "" || meassageInput == ""){
        nullFound();
        check = true;
      }
    });
    if(check == false){
       messageSent();
      db.doc().set({
        fName: firstNameInput,
        lName: lastNameInput,
        email: emailInput,
        subject: subjectInput,
        message: meassageInput,
        time: time //fix this code
      })
      .then(function(){
        console.log("Data Saved");
      })
      .catch(function(error){
        console.log(error);
      });
    }
  });
});

function getTimeStamp() {
  const now = new Date();
  const timestamp = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  return timestamp;
}


function nullFound(){
  let h3 = document.createElement('h3');
  let nullMessage = document.createTextNode("Please fill all the inputs.");
  h3.appendChild(nullMessage);
  resultArea.appendChild(h3);
}

function messageSent(){
  let h3 = document.createElement('h3');
  let successMessage = document.createTextNode("Thanks for leaving a message!");
  h3.appendChild(successMessage);
  resultArea.appendChild(h3);
}

