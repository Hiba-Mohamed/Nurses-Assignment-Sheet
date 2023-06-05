// 1- create html elemet mapipulation for dynamic patient input fields
// 2- with each add button click : 
//              CREATE ARRAYS:
//                   a- creating an array of ward patients
//              VALIDATION:
//                   a- validate the last entry the user inputs against the ward patient array to ensure deuplication prevention.
//                   b- prevent the user from being able to enter anymore data until conflict is resolved
//                   c- create alerts to guide the user into how to resolve the conflict
//              STORAGE:
//                   a- storing the array in local storage
//              RENDERING:

// update nurse data : 
//                   one function that does:
//                     a- repopulate from LS using index
//                     b- delete the list with the specific index from local storage
//                     c- allow the user to update the object
//                  another function that:
//                     d- validate the new nurse info
//                     e- if valid, push the new object to the same index that was deleted
//                     f- store in LS
//                  third function for rendering
//                     g- render the nurse card
//                     h- clear the html form



// update patient data : a- repopulate from LS using index
//                       b- delete the nursePatientObject with the specific index from local storage
//                       c- allow the user to update the object
//                       d- validate the new nursepatientObject info
//                       e- if valid, push the new object to the same index that was deleted
//                       f- store in LS
//                       g- render the patient information
//                       h- clear the html form

const loginBtn = document.getElementById("login-button");
loginBtn.onclick = (e) => {
  e.preventDefault();
  // catch the value which is type use login page
  const emailAddress = document.getElementById("email-login").value;
  const passWord = document.getElementById("pass-login").value;

  // getting the value in localstorage which stores user in registration form
  const emailstored = localStorage.getItem("Email");
  const passstored = localStorage.getItem("Password");

  if (emailAddress == "" || passWord == "") {
    swal("All fields must be filled", " ", "error");
  }
  else {
    if (emailAddress == emailstored && passWord == passstored) {
      swal("Login successful", "", "success");
    }
    else {
      swal("Please check if the Email address and password are correct", "", "error");
    }
  }
}

// creating an account

const create_direct = document.getElementById("create-direct");

create_direct.onclick = (e) => {
  const login_page = document.getElementById("log-in");
  const create_page = document.getElementById("create-account");
  login_page.style.display = 'none';
  create_page.style.display = 'block';
}

const submit_button = document.getElementById("create-btn");
submit_button.addEventListener('click', function (e) {
  e.preventDefault();
  // all input data receive these variables
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const cpass = document.getElementById("cpass").value;

  // storing this data in web browser store
  localStorage.setItem('FirstName', fname);
  localStorage.setItem('LastName', lname);
  localStorage.setItem('Email', email);
  localStorage.setItem('Password', pass);
  localStorage.setItem('Cpassword', cpass);

  // setting conditions
  if (fname == "" || lname == "" || email == "" || pass == "" || cpass == "") {
    swal("All input fields must be filled", "", "error");
  }
  else {
    if (pass !== cpass) {
      swal("The passwords you entered are not matching", "", "error");
    }
    else {
      swal("Registration successful!", "You created a new account!", "success");
    }
  }
});


// directing to login page from creating an account page

const login_direct = document.getElementById("login-direct");
login_direct.onclick = () => {
  const login_page = document.getElementById("log-in");
  const create_page = document.getElementById("create-account");
  login_page.style.display = 'block';
  create_page.style.display = 'none';
}

// editing page

// current date function

// view page

function displayFullDate() {
  const calendar_text = document.getElementById("current-date");
  let now = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let fullDate = now.toLocaleDateString('en-US', options);
  calendar_text.innerHTML = fullDate;
}
displayFullDate();

// choosing a shift type
let dayShiftButton = document.getElementById('dayShiftButton');
let nightShiftButton = document.getElementById('nightShiftButton');
let shiftHeading = document.querySelector('.shift-title');

function dayShift() {
  dayShiftButton.addEventListener('click',  function(e)
  {
    e.preventDefault();
    dayShiftButton.style.display = 'none';
    nightShiftButton.style.display = 'none';
    shiftHeading.innerHTML = "Day Shift"
  } )
}

function nightShift() {
  nightShiftButton.addEventListener('click',  function(e)
  {
    e.preventDefault();
    dayShiftButton.style.display = 'none';
    nightShiftButton.style.display = 'none';
    shiftHeading.innerHTML = "Night Shift"
  } )
}


// Clark's code for Patient's array

// Custom JavaScript event to handle updates to the patient list
const update_patient_list = new CustomEvent('update_patient_list');

window.addEventListener('DOMContentLoaded', () => {
  // Dispatch the custom event to initially update the patient list
  document.dispatchEvent(update_patient_list);
});

// Listen for the custom event to log updates
document.addEventListener('update_patient_list', function() {
  // Retrieve the patient data from local storage
  const wardPatientsArray = JSON.parse(localStorage.getItem('wardPatients')) || [];
  let patientCount = wardPatientsArray.length;

  console.log(`There are ${patientCount} patients`, wardPatientsArray);
});

const addPatientBtn = document.getElementById('add-patient-btn');
const finalizePatientListBtn = document.getElementById('finalize-patient-btn');
addPatientBtn.addEventListener('click', function handleAddPatientBtn(event)
{
  event.preventDefault();
  dynamicPatientFields();
} );

function handleFinalizePatientBtn(event)
{
  event.preventDefault();
  addPatientBtn.style.display = "none";
  finalizePatientListBtn.style.display = "none";
  createWardPatientsArray();
}

// a function to handle the html modification for dynamic patient input fields
function dynamicPatientFields() {
  const allPatientsDiv = document.getElementById("all-patients")
  const current_patients = JSON.parse(localStorage.getItem('wardPatients')) || [];
  const patientCount = current_patients.length ?? 0;

  // Handle the required HTML Modifications
  let patientDiv = document.createElement('div');
  patientDiv.classList.add('psingle-input');

  let roomInput = document.createElement('input');
  roomInput.type = 'text';
  roomInput.id = 'room' + (patientCount + 1);
  roomInput.placeholder = 'Room';

  let patientInput = document.createElement('input');
  patientInput.type = 'text';
  patientInput.id = 'patient' + (patientCount + 1);
  patientInput.placeholder = 'Patient';

  patientDiv.appendChild(roomInput);
  patientDiv.appendChild(patientInput);

  // Append the newly created 'psingle-input' div to the 'all-patients' div
  allPatientsDiv.appendChild(patientDiv);
}


// creating a ward patient array from the user input fields
function createWardPatientsArray() {
  let inputDivs = document.getElementsByClassName('psingle-input');

  // Retrieve the existing patients from local storage
  let wardPatientsArray = JSON.parse(localStorage.getItem('wardPatients')) || [];
  let nursePatientsObject = JSON.parse(localStorage.getItem('nursePatientsObject')) || [];

  // Check for duplicate patient assignments and add new patients
  for (let i = 0; i < inputDivs.length; i++) {
    let newRoomInput = inputDivs[i].querySelector('input[id^="room"]');
    let newPatientInput = inputDivs[i].querySelector('input[id^="patient"]');

    let newRoomNumber = newRoomInput.value.trim();
    let newPatientName = newPatientInput.value.trim();

    // Check if both input fields are not empty
    if (newRoomNumber !== '' && newPatientName !== '') {
      // Check for duplicate patient assignments in existing patients
      let isDuplicate = wardPatientsArray.some(function(existingPatient) {
        return (
          existingPatient.room_number === newRoomNumber ||
          existingPatient.patient_name === newPatientName
        );
      });

      if (isDuplicate) {
        swal("Duplicate patient assignment! Please ensure using a new patient name and room number", " ", "error");
        return;
      } else {
        let newPatientObject = {
          room_number: newRoomNumber,
          patient_name: newPatientName
        };

        wardPatientsArray.push(newPatientObject);
      }
    }
  }

  // Calculate the nursePatientsArray by subtracting the existing patients
  let nursePatientsArray = wardPatientsArray.slice(-inputDivs.length);

  // Push the nursePatientsArray as an object into the nursePatientsObject array
  nursePatientsObject.push({
    nursePatientsArray
  });

  // Store the updated wardPatientsArray and nursePatientsObject in local storage
  localStorage.setItem('wardPatients', JSON.stringify(wardPatientsArray));
  localStorage.setItem('nursePatientsObject', JSON.stringify(nursePatientsObject));

  console.log("wardPatientsArray: ", wardPatientsArray); // Display the updated ward patients array
  console.log("nursePatientsObject: ", nursePatientsObject); // Display the nurse patients object
}
  
const add_nursebtn = document.getElementById("submit");
add_nursebtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (validateForm()) {
    addData();
    addPatientBtn.style.display = 'block';
    finalizePatientListBtn.style.display = 'block';
    document.getElementById('info-card').reset();
  }
});

const validateForm = () => {
  let name = document.getElementById("nurse-name").value;
  let break_time = document.getElementById("nurse-break").value;
  let break_relief = document.getElementById("break-relief").value;
  let fire_code = document.getElementById("fire-code").value;

  switch (true) {
    case (name === ""):
      swal("Please fill-in nurse's name", " ", "error");
      return false;
    case (break_time === ""):
      swal("Please fill-in nurse's break", " ", "error");
      return false;
    case (fire_code === ""):
      swal("Please fill-in fire code", " ", "error");
      return false;
    case (break_relief === ""):
      swal("Please fill-in nurse's relief", " ", "error");
      return false;
    default:
      return true;
  }
};


// const showNurseData = () => {
//   let nurseList;
//   if (localStorage.getItem("nurseList") == null) {
//     nurseList = [];
//   } else {
//     nurseList = JSON.parse(localStorage.getItem("nurseList"));
//   }

//   let nursePatientsObject;
//   if (localStorage.getItem("nursePatientsObject") == null) {
//     nursePatientsObject = [];
//   }
//   else {
//     nursePatientsObject = JSON.parse(localStorage.getItem("nursePatientsObject"));
//   }

//   let nursePatientsArray;
//   if (localStorage.getItem("nursePatientsArray") == null) {
//     nursePatientsArray = [];
//   }
//   else {
//     nursePatientsArray = JSON.parse(localStorage.getItem("nursePatientsArray"));
//   }

//   // set references to card containers
//   const shiftCardsContainer = document.querySelector(".shift-cards");

//   // Resets the innerHTML of the card containers to remove old data
//   shiftCardsContainer.innerHTML = '';

//   // iterate through localStorage data to generate cards
//   nurseList.forEach((nurseElement, nurseIndex) => {
//     const nurseDiv = document.createElement('div');

//     nurseDiv.innerHTML =
//     '<div class=\'button-wrapper\'>' +
//     '<button onclick="deleteData(' + nurseIndex + ')" class="delete-button">Delete</button>' +
//     '<button onclick="handleNurseUpdate(' + nurseIndex + ')" class="edit-button">Edit</button>' +
//     '</div>'+
//       '<p><strong>Name:</strong> ' + nurseElement.name + '</p>' +
//       '<p><strong>Break:</strong> ' + nurseElement.break_time + '</p><p><strong>Relief:</strong> ' + nurseElement.break_relief + '</p>' +
//       '<p><strong>Extra Duties:</strong> <span style="color:red">' + nurseElement.extra_duties + '</span></p>' +
//       '<p><strong>Fire Code:</strong> <span style="color:red">' + nurseElement.fire_code + '</span></p>' 

//     nurseDiv.classList.add('nurse-info');

//     const patientCard = document.createElement('div');
//     patientCard.classList.add('patient-info');

//     // Retrieve the patient data from local storage for the specific nurse
//     const nursePatientsArray = nursePatientsObject[nurseIndex].nursePatientsArray;
//     nursePatientsArray.forEach((patientElement) => {
//       const newDiv = document.createElement('div');
//       let patientInfo = patientElement.room_number && patientElement.room_number !== '' ? '<p><strong>Room :</strong> ' + patientElement.room_number + ' - ' + patientElement.patient_name + '</p>' : '';
//       newDiv.innerHTML = patientInfo +
//       newDiv.classList.add('patient-card');
//       patientCard.appendChild(newDiv);
//     });
//     nurseDiv.appendChild(patientCard);
//     shiftCardsContainer.appendChild(nurseDiv);
//   });
// }




// clear local storage when page loads


window.addEventListener('load', function () {
  // Clear the local storage
  localStorage.clear();
  console.log('Local storage has been reset.');
});

// function to add data to local storage

const addData = () => {
  // if form is validated
  if (validateForm() == true) {
    let name = document.getElementById("nurse-name").value;
    let break_time = document.getElementById("nurse-break").value;
    let break_relief = document.getElementById("break-relief").value;
    let extra_duties = document.getElementById("extra-duties").value;
    let fire_code = document.getElementById("fire-code").value;


    let nurseList;
    if (localStorage.getItem("nurseList") == null) {
      nurseList = [];
    } else {
      nurseList = JSON.parse(localStorage.getItem("nurseList"));
    }

    //  validating nurse name to ensure no duplicates
    if (nurseList.some(nurse => nurse.name === name)) {
      swal("Duplicate nurse name detected. Please enter a unique nurse name.", " ", "error");
      return; // Exit the function if there's a duplicate nurse name
    }

    nurseList.push({
      name,
      break_time,
      break_relief,
      extra_duties,
      fire_code,
    });

    localStorage.setItem("nurseList", JSON.stringify(nurseList));
    showNurseData();

    document.getElementById("nurse-name").value = "";
    document.getElementById("nurse-break").value = "";
    document.getElementById("break-relief").value = "";
    document.getElementById("extra-duties").value = "";
    document.getElementById("fire-code").value = "";

  }
};
// function to delete Data from local storage


function deleteData(index) {
  let nurseList;
  if (localStorage.getItem("nurseList") == null) {
    nurseList = [];
  }
  else {
    nurseList = JSON.parse(localStorage.getItem("nurseList"));
  }

  let nursePatientsObject;
  if (localStorage.getItem("nursePatientsObject") == null) {
    nursePatientsObject = [];
  }
  else {
    nursePatientsObject = JSON.parse(localStorage.getItem("nursePatientsObject"));
  }


  nurseList.splice(index, 1);
  localStorage.setItem("nurseList", JSON.stringify(nurseList));
   
  nursePatientsObject.splice(index, 1);
  localStorage.setItem("nursePatientsObject", JSON.stringify(nursePatientsObject));
  
  // update the html after deleting that data from local storage
  showNurseData();
}



function uupdateNurseData(index) {
  // submit button will hide and update button will show for updating of data in local storage
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let nurseList;
  if (localStorage.getItem("nurseList") == null) {
    nurseList = [];
  } else {
    nurseList = JSON.parse(localStorage.getItem("nurseList"));
  }

  let nursePatientsObject;
  if (localStorage.getItem("nursePatientsObject") == null) {
    nursePatientsObject = [];
  } else {
    nursePatientsObject = JSON.parse(localStorage.getItem("nursePatientsObject"));
  }

  console.log("nurseList: ", nurseList);
  console.log("nursePatientsObject: ", nursePatientsObject);

  // Repopulating the form data from local storage
  document.getElementById("nurse-name").value = nurseList[index].name;
  document.getElementById("nurse-break").value = nurseList[index].break_time;
  document.getElementById("break-relief").value = nurseList[index].break_relief;
  document.getElementById("extra-duties").value = nurseList[index].extra_duties;
  document.getElementById("fire-code").value = nurseList[index].fire_code;

  // Repopulating the patient information
  let nursePatientsArray = nursePatientsObject[index].nursePatientsArray;
  let patientInputsContainer = document.getElementById("all-patients");
  patientInputsContainer.innerHTML = ""; // Clear existing patient inputs

  // Repopulate patient inputs
  for (let i = 0; i < nursePatientsArray.length; i++) {
    let roomNumber = nursePatientsArray[i].room_number;
    let patientName = nursePatientsArray[i].patient_name;

    let patientInputDiv = document.createElement("div");
    patientInputDiv.className = "psingle-input";

    let roomInput = document.createElement("input");
    roomInput.type = "text";
    roomInput.id = "room" + (i + 1);
    roomInput.placeholder = "Room";
    roomInput.value = roomNumber;

    let patientInput = document.createElement("input");
    patientInput.type = "text";
    patientInput.id = "patient" + (i + 1);
    patientInput.placeholder = "Patient";
    patientInput.value = patientName;

    patientInputDiv.appendChild(roomInput);
    patientInputDiv.appendChild(patientInput);

    patientInputsContainer.appendChild(patientInputDiv);
  }

  // When the update button is clicked, get the new values and run the validation function
  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      nurseList[index].name = document.getElementById("nurse-name").value;
      nurseList[index].break_time = document.getElementById("nurse-break").value;
      nurseList[index].break_relief = document.getElementById("break-relief").value;
      nurseList[index].extra_duties = document.getElementById("extra-duties").value;
      nurseList[index].fire_code = document.getElementById("fire-code").value;

      // Update the patient information in the nursePatientsObject
      let updatedNursePatientsArray = [];
      let updatedPatientInputs = document.getElementsByClassName("psingle-input");
      for (let i = 0; i < updatedPatientInputs.length; i++) {
        let roomInput = updatedPatientInputs[i].querySelector('input[id^="room"]');
        let patientInput = updatedPatientInputs[i].querySelector('input[id^="patient"]');
        let roomNumber = roomInput.value;
        let patientName = patientInput.value;

        let patientObject = {
          room_number: roomNumber,
          patient_name: patientName,
        };
        updatedNursePatientsArray.push(patientObject);
      }

      nursePatientsObject[index].nursePatientsArray = updatedNursePatientsArray;

      // Render the data in the HTML
      showNurseData();

      // Store the data in local storage
      localStorage.setItem("nurseList", JSON.stringify(nurseList));
      localStorage.setItem("nursePatientsObject", JSON.stringify(nursePatientsObject));

      // Reset the form
      document.getElementById("info-card").reset();

      // Update button will hide and submit button shows
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}

 

// This is a function that :  a- repopulate from LS using index
//                            b- delete the list with the specific index from local storage
//                            c- allow the user to update the object

const NursePopulateDeleteEdit = (index) =>
{
    
  let nurseList;
  if (localStorage.getItem("nurseList") == null) {
    nurseList = [];
  }
  else {
    nurseList = JSON.parse(localStorage.getItem("nurseList"));
  }


    // Repopulating the form data from local storage
    document.getElementById("nurse-name").value = nurseList[index].name;
    document.getElementById("nurse-break").value = nurseList[index].break_time;
    document.getElementById("break-relief").value = nurseList[index].break_relief;
    document.getElementById("extra-duties").value = nurseList[index].extra_duties;
    document.getElementById("fire-code").value = nurseList[index].fire_code;

    // deleting the object with the index number from local storage in preparation to replace it with the new one


    nurseList.splice(index, 1);
    localStorage.setItem("nurseList", JSON.stringify(nurseList));
}

// /           this is another function that:
//                     d- validate the new nurse info
//                     e- if valid, push the new object to the same index that was deleted
//                     f- store in LS



const nurseValidatePushStoreLS = (index) =>
{
  // running a function to validate the nurse's info in the form
  // if the input is valid, the validate form function will return true and then 
  // the onject with the index number will be updated in the object(nurseList)
  if (validateForm() == true) {
    nurseList[index].name = document.getElementById("nurse-name").value;
    nurseList[index].break_time = document.getElementById("nurse-break").value;
    nurseList[index].break_relief = document.getElementById("break-relief").value;
    nurseList[index].extra_duties = document.getElementById("extra-duties").value;
    nurseList[index].fire_code = document.getElementById("fire-code").value;
};

// storing the newly edited properties for the object in the local storage
localStorage.setItem("nurseList", JSON.stringify(nurseList));

showNurseData();

}

const showNurseData = () => {
  let nurseList;
  if (localStorage.getItem("nurseList") == null) {
    nurseList = [];
  } else {
    nurseList = JSON.parse(localStorage.getItem("nurseList"));
  }

  // set references to card containers
  const shiftCardsContainer = document.querySelector(".shift-cards");

  // Resets the innerHTML of the card containers to remove old data
  shiftCardsContainer.innerHTML = '';

  // iterate through localStorage data to generate cards
  nurseList.forEach((nurseElement, nurseIndex) => {
    const nurseDiv = document.createElement('div');

    nurseDiv.innerHTML =
    '<div class=\'button-wrapper\'>' +
    '<button onclick="deleteData(' + nurseIndex + ')" class="delete-button">Delete</button>' +
    '<button onclick="NursePopulateDeleteEdit(' + nurseIndex + ')" class="edit-button">Edit</button>' +
    '</div>'+
      '<p><strong>Name:</strong> ' + nurseElement.name + '</p>' +
      '<p><strong>Break:</strong> ' + nurseElement.break_time + '</p><p><strong>Relief:</strong> ' + nurseElement.break_relief + '</p>' +
      '<p><strong>Extra Duties:</strong> <span style="color:red">' + nurseElement.extra_duties + '</span></p>' +
      '<p><strong>Fire Code:</strong> <span style="color:red">' + nurseElement.fire_code + '</span></p>' 

    nurseDiv.classList.add('nurse-info');

    shiftCardsContainer.appendChild(nurseDiv);
  });
}

// view-only display
// Working as of 05/23 6:30PM
const final_submit1 = () => {
  const final_submit_btn = document.getElementById("submit-all-btn");
  const form_card = document.querySelector(".info-card");
  const buttons = document.querySelectorAll(".button-wrapper")

  form_card.style.display = "none";
  final_submit_btn.style.display = "none";

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
}



