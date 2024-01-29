const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}



inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

const firebaseConfig = {
	apiKey: "AIzaSyCWlUuCtJMfN-6zc5BhAwpLa1OpPIQqsqk",
	authDomain: "propert-rental-5669d.firebaseapp.com",
	databaseURL: "https://propert-rental-5669d-default-rtdb.firebaseio.com",
	projectId: "propert-rental-5669d",
	storageBucket: "propert-rental-5669d.appspot.com",
	messagingSenderId: "680379316651",
	appId: "1:680379316651:web:c3338e8b66b7b585aebaee"
  };

  firebase.initializeApp(firebaseConfig);

  // Get the form element
var form = document.querySelector('form');

// Add an event listener to the form submit button
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the email and password input fields
  var email=form.email.value;
  var password = form.password.value;



  // Sign in the user with Firebase authentication
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // User signed in successfully
      var user = userCredential.user;
      // Retrieve user data from the Realtime Database
      firebase.database().ref("Admin/").once('value')
        .then(function(snapshot) {
			var userData = snapshot.val();
			
          console.log(userData);
		  window.location.href = "file:///C:/Users/abhij/Desktop/webpage/AdminDash.html";
        })
        .catch(function(error) {
          console.log(error.message);
		  window.alert(error.message);

        });
    })
    .catch(function(error) {
      // Handle errors here
	  window.alert(error.message);
      console.log(error.message);
    });


});
