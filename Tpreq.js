var amtV;
var regno = sessionStorage.getItem('regno');
function readFom() {
  amtV = document.getElementById("amt").value;
  console.log(regno, amtV);
}


document.getElementById("req").onclick = function () {
  readFom();
  if(amtV=="")
  {
    alert("All Data must be filled");
    document.getElementById("amt").value ="";
  }
  else{
    

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const currentDateTime = new Date().toLocaleString('en-US', options);
    console.log(currentDateTime);
    firebase.database().ref("Tenant/" + regno).once("value").then(function(snapshot) {
      var name = snapshot.child("name").val();
      var wallet=snapshot.child("Wallet_addr").val();
      firebase.database().ref("TopUpReq/"+currentDateTime).set({ Tenant_ID : regno,name: name,Wallet_Id: wallet, amount: amtV, Date:  currentDateTime, Status: "Pending",T_Date: "No trasnsaction has made"});
      alert("Request Send");
      document.getElementById("amt").value = "";
    });
    
  }
};



/*
window.onload = function() {
firebase.database().ref("Landlord").orderByKey().limitToLast(1).on("value", function(snapshot) {
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