var regnum, typeV, locV, rentV, depoV;

function readFom() {
  regnum = document.getElementById("regno").value;
  typeV = document.getElementById("type").value;
  locV = document.getElementById("loc").value;
  rentV = document.getElementById("rent").value;
  depoV = document.getElementById("depo").value;
}
var Sregno = sessionStorage.getItem('regno');

var database = firebase.database();
var landlordRef = database.ref("Landlord/"+Sregno);
var statusRef = landlordRef.child('Status');

statusRef.once('value').then(function(snapshot) {
  var statusData = snapshot.val();
  console.log(statusData);
  globalStatusData = statusData;
});

window.onload = function() {
  firebase.database().ref("Property/").orderByKey().limitToLast(1).on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          var num= childSnapshot.key;
        document.getElementById("regno").value = ++num;
        // Do something with the last registration number
      });
    });
  }; 

document.getElementById("insert").onclick = function () {
  readFom();
  if(regnum=="" || typeV=="" || locV=="" || rentV=="" || depoV=="")
  {
    alert("All Data must be filled");
    document.getElementById("regno").value = "";
    document.getElementById("type").value = "";
    document.getElementById("loc").value = "";
    document.getElementById("rent").value = "";
    document.getElementById("depo").value = "";
  }
  else if(globalStatusData=="Approved"){
  firebase.database().ref("Owns/" + Sregno).update({[regnum]: true});
  firebase.database().ref("Property/" + regnum).set({Landlord: Sregno, Reg_No: regnum, type: typeV, location: locV, rent: rentV, deposit: depoV, interest: "", Tenant: "",contract_Status: "Not started", contract_addr: "", TDate:"",contract_No:"",S_date:"",L_date:""});
  

  alert("Data Inserted");
    document.getElementById("regno").value = "";
    document.getElementById("type").value = "";
    document.getElementById("loc").value = "";
    document.getElementById("rent").value = "";
    document.getElementById("depo").value = "";
  }
  else{
    alert("Landlord "+Sregno+" is not Approved by Admin");
    document.getElementById("regno").value = "";
    document.getElementById("type").value = "";
    document.getElementById("loc").value = "";
    document.getElementById("rent").value = "";
    document.getElementById("depo").value = "";
  }
};



/*
window.onload = function() {
firebase.database().ref("Tenant").orderByKey().limitToLast(1).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var num= childSnapshot.key;
      document.getElementById("regno").value = ++num;
      // Do something with the last registration number
    });
  });
}; 
/*
document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + regnum)
    .update({
      //   rollNo: regnum,
      name: nameV,
      gender: genderV,
      address: addressV,
    });
  alert("Data Update");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};

document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + regnum)
    .remove();
  alert("Data Deleted");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};
*/