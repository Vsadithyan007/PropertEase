var regnum, nameV, genderV, addressV, mailV, mobV, pswd1V, pswd2V, dobV, stateV, cityV, dobV;

function readFom() {
  regnum = document.getElementById("regno").value;
  nameV = document.getElementById("name").value;
  var maleRadioButton = document.getElementById("male");
  var femaleRadioButton = document.getElementById("female");
  if (maleRadioButton.checked) {
    genderV = document.getElementById("male").value;
  } else if (femaleRadioButton.checked) {
    genderV = document.getElementById("female").value;
  } else {
    genderV = document.getElementById("other").value;
  } 
  addressV = document.getElementById("addr").value;
  mailV = document.getElementById("mail").value;
  mobV = document.getElementById("mob").value;
  pswd1V = document.getElementById("pswd1").value;
  pswd2V = document.getElementById("pswd2").value;
  stateV = document.getElementById("state").value;
  cityV = document.getElementById("city").value;
  dobV = document.getElementById("dob").value;
  console.log(regnum, nameV, genderV, mailV, pswd1V, pswd2V);
}


document.getElementById("insert").onclick = function () {
  readFom();
  if(regnum=="" || nameV=="" || addressV=="" || mailV=="" || mobV=="" || pswd1V=="" || pswd2V=="")
  {
    alert("All Data must be filled");
    document.getElementById("regno").value = "";
    document.getElementById("name").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("address").value = "";
    document.getElementById("mailid").value = "";
    document.getElementById("mob").value = "";
    document.getElementById("pswd1").value = "";
    document.getElementById("pswd2").value = "";

  }
  else{
    if(pswd1V !== pswd2V){
      alert("password must be same");
      document.getElementById("pswd1").value = "";
      document.getElementById("pswd2").value = "";
    }
    else{
      firebase.auth().createUserWithEmailAndPassword(mailV, pswd1V)
      .then(function(userCredential) {
        var user = userCredential.user;
        user.sendEmailVerification().then(function() {
        }).catch(function(error) {
          console.log(error.message);
          alert(error.message);
        });
        firebase.database().ref("Landlord/" + regnum).set({ Reg_No: regnum, name: nameV, gender: genderV, address: addressV, mail: mailV, mob: mobV, password: pswd1V,State: stateV,City: cityV, DOB: dobV, Status: "not approved", Wallet_addr: ""});
      alert("Data Inserted");
      window.location.href = 'Landlordlogin.html';
      })
      .catch(function(error) {
        console.log(error.message);
        alert(error.message);
      });
      
      document.getElementById("regno").value = "";
      document.getElementById("name").value = "";
      document.getElementById("address").value = "";
      document.getElementById("mailid").value = "";
      document.getElementById("mob").value = "";
      document.getElementById("pswd1").value = "";
      document.getElementById("pswd2").value = "";
      document.getElementById("dob").value = "";
      document.getElementById("state").value = "";
      document.getElementById("city").value = "";
      }
}
};





window.onload = function() {
firebase.database().ref("Landlord").orderByKey().limitToLast(1).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var num= childSnapshot.key;
      document.getElementById("regno").value = ++num;
      // Do something with the last registration number
    });
  });
}; 
