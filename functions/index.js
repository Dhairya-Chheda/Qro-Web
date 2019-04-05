const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require('express');
var app = express();
var bodyParser = require('body-parser');
const admin = require('firebase-admin');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//Initialize Firbase for node js
var serviceAccount = require('./qro-test-firebase-adminsdk-u1m90-9143208352.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();


//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCk6_ycftm3w-fNfcpVQMRc-A4Vf9yai_Y",
//     authDomain: "qro-master1.firebaseapp.com",
//     databaseURL: "https://qro-master1.firebaseio.com",
//     projectId: "qro-master1",
//     storageBucket: "qro-master1.appspot.com",
//     messagingSenderId: "159690225713"
//   };
//   firebase.initializeApp(config)

//   var db = firebase.firestore();

// app.get("/home", function(req,res){
// 	res.render("home");
// });



// app.get("/register", function(req,res){
// 	res.render("register");
// });

// app.get("/contact", function(req,res){
// 	res.render("contact");
// });

 app.get("/thankyou", function(req,res){
 	res.render("thankyou");
 });

console.log('Hey its me');

app.post('/register', function(req, res){
    console.log('Hello World');
    // document.getElementById('user_form').addEventListener('submit', submitForm);
    
    // function submitForm(e){
    //     e.preventDefault();
    
    // Function to get form values
    // function getInputVal(id){
    //     return document.getElementById(id).value;
    // }
    //Get Values
	var name = req.body.name;
	var email = req.body.email;
	var phonenumber = req.body.phonenumber;
	var address = req.body.address;
	var zip = req.body.zip;
	var dob = req.body.dob;
	//add here the code to add files to database
	var category = req.body.category;
	var gender = req.body.gender;
    
    console.log(name);
    
    const docReff = db.collection("users");
    
    docReff.add({
        Full_name: name,
        email_id: email,
        Phone_Numner: phonenumber,
        Address: address,
        Zip_code: zip,
        Date_of_Birth: dob,
        Category: category,
        Gender: gender
    })
    .then(function() {
        console.log("Document successfully written!");
        res.redirect("thankyou");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });



});

exports.app = functions.https.onRequest(app);

// app.listen(7000, function(){
// 	console.log('Qro is listening to port 7000!')
// });

