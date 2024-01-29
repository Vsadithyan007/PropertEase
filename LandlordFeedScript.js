var tidV, feedV;
var regno = sessionStorage.getItem('regno');
function readFom() {
  tidV = document.getElementById("tid").value;
  feedV = document.getElementById("feedback").value;
  console.log(tid,regno, feedV);
}


document.getElementById("insert").onclick = function () {
  readFom();
  if(tidV=="" || feedV=="")
  {
    alert("All Data must be filled");
    document.getElementById("tid").value = "";
    document.getElementById("feedback").value = "";
  }
  else{
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const currentDateTime = new Date().toLocaleString('en-US', options);
  console.log(currentDateTime);
  firebase.database().ref("LandlordFeedback/" + currentDateTime).set({ Tenant: tidV, Landlord: regno, feedback: feedV});
  alert("Feedback Recorded");
  document.getElementById("tid").value = "";
  document.getElementById("feedback").value = "";
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