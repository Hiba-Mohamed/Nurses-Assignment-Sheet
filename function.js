const loginBtn = document.getElementById("login-button");
loginBtn.onclick = (e) => {
  e.preventDefault();
  // catch the value which is type use login page
  const emailAddress = document.getElementById("email-login").value;
  const passWord = document.getElementById("pass-login").value;
  const logInPage = document.getElementById("log-in");
  const editSheetPage =  document.getElementById("edit-sheet");

  // getting the value in localstorage which stores user in registration form
  const emailstored = localStorage.getItem("Email");
  const passstored = localStorage.getItem("Password");

  if (emailAddress == "" || passWord == "") {
    swal("All fields must be filled", " ", "error");
  }
  else {
    if (emailAddress == emailstored && passWord == passstored) {
      swal("Login successful", "", "success");
      editSheetPage.style.display = "block";
      logInPage.style.display = "none";
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

const logInPage = document.getElementById("log-in");
const editSheetPage = document.getElementById("edit-sheet");
const guestLoginBtn = document.querySelector('#login-guest-btn');

function loginGuest() {
  editSheetPage.style.display = "block";
  logInPage.style.display = "none";
}

guestLoginBtn.addEventListener('click', loginGuest);

const submit_button = document.getElementById("create-btn");
submit_button.addEventListener('click', function (e) {
  e.preventDefault();

  const createAccountPage = document.getElementById("create-account");
  const logInPage = document.getElementById("log-in");

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
      createAccountPage.style.display = 'none';
      logInPage.style.display = 'block';
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
const ShiftButtons = document.querySelector('.shift-buttons');
const shiftHeading = document.querySelector('#day-night-text');
const shiftChoosetext = document.querySelector('.shift-title');
const nurseForm = document.getElementById("info-card");
const final_submit_btn = document.getElementById("submit-all-btn");

function dayShift() {
  dayShiftButton.addEventListener('click', function(e) {
    e.preventDefault();
    ShiftButtons.style.display = 'none';;
    shiftHeading.innerHTML = "Day Shift";
    nurseForm.style.display = 'block';
    final_submit_btn.style.display = 'block';
    shiftChoosetext.style.display = 'none';
    // Set the shiftType in local storage to "day"
    localStorage.setItem('shiftType', 'day');
  });
}

function nightShift() {
  nightShiftButton.addEventListener('click', function(e) {
    e.preventDefault();
    ShiftButtons.style.display = 'none';;
    shiftHeading.innerHTML = "Night Shift";
    nurseForm.style.display = 'block';
    final_submit_btn.style.display = 'block';
    shiftChoosetext.style.display = 'none';
    // Set the shiftType in local storage to "night"
    localStorage.setItem('shiftType', 'night');
  });
}

// Call the shift functions to add event listeners
dayShift();
nightShift();

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
  const wardPatientsArray = JSON.parse(localStorage.getItem('wardPatientsArray')) || [];
  let patientCount = wardPatientsArray.length;

  console.log(`There are ${patientCount} patients`, wardPatientsArray);
});

const addPatientBtn = document.getElementById('add-patient-btn');
addPatientBtn.addEventListener('click', function handleAddPatientBtn(event)
{
  event.preventDefault();
  dynamicPatientFields();
} );


// a function to handle the html modification for dynamic patient input fields
function dynamicPatientFields() {
  const allPatientsDiv = document.getElementById("all-patients");
  const current_patients = JSON.parse(localStorage.getItem('wardPatientsArray')) || [];
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



// Attach event listener to the submit button 
const add_nursebtn = document.getElementById("submit");
add_nursebtn.addEventListener('click', (event) => {
  event.preventDefault();

  validateForm()
    .then(() => validatePatientFields())
    .then(() => nurseValidatePushStoreLS())
    .then(() => createWardPatientsArray())
    .then(() => showNurseAndPatientData())
    .then(() => resetForm())
    .catch((error) => {
      console.error(error);
      // Handle the error here if needed
    });
});

const resetForm = () => {
  const form = document.getElementById('info-card');
  form.reset();
};


const validateForm = () => {
  return new Promise((resolve, reject) => {
    let name = document.getElementById("nurse-name").value;
    let break_time = document.getElementById("nurse-break").value;
    let break_relief = document.getElementById("break-relief").value;
    let fire_code = document.getElementById("fire-code").value;

    switch (true) {
      case (name === ""):
        swal("Please fill-in nurse's name", " ", "error");
        reject("Form validation error: Nurse's name is required");
        break;
      case (break_time === ""):
        swal("Please fill-in nurse's break", " ", "error");
        reject("Form validation error: Nurse's break time is required");
        break;
      case (fire_code === ""):
        swal("Please fill-in fire code", " ", "error");
        reject("Form validation error: Fire code is required");
        break;
      case (break_relief === ""):
        swal("Please fill-in nurse's relief", " ", "error");
        reject("Form validation error: Nurse's relief is required");
        break;
      default:
        resolve();
        break;
    }
  });
};

const validatePatientFields = () => {
  return new Promise((resolve, reject) => {
    let inputDivs = document.getElementsByClassName('psingle-input');
    let nursePatientsObject = JSON.parse(localStorage.getItem('nursePatientsObject')) || [];

    for (let i = 0; i < inputDivs.length; i++) {
      let newRoomInput = inputDivs[i].querySelector('input[id^="room"]');
      let newPatientInput = inputDivs[i].querySelector('input[id^="patient"]');

      let newRoomNumber = newRoomInput.value.trim();
      let newPatientName = newPatientInput.value.trim();
      if (newRoomNumber === '' && newPatientName === '') {
        // Skip validating empty fields
        continue;
      }

      let isDuplicate = nursePatientsObject.some(function(nursePatientObject) {
        return nursePatientObject.nursePatientsArray.some(function(existingPatient) {
          return (
            existingPatient.room_number === newRoomNumber ||
            existingPatient.patient_name === newPatientName
          );
        });
      });

      if (isDuplicate) {
        swal("Duplicate patient assignment! Please ensure using a new patient name and room number", " ", "error");
        reject("Patient fields validation error: Duplicate patient assignment");
        return;
      }

      let isDuplicateNew = Array.from(inputDivs).slice(0, i).some(function(existingDiv) {
        let existingRoomInput = existingDiv.querySelector('input[id^="room"]');
        let existingPatientInput = existingDiv.querySelector('input[id^="patient"]');
        let existingRoomNumber = existingRoomInput.value.trim();
        let existingPatientName = existingPatientInput.value.trim();

        return (
          existingRoomNumber === newRoomNumber ||
          existingPatientName === newPatientName
        );
      });

      if (isDuplicateNew) {
        swal("Duplicate patient assignment! Please ensure using a new patient name and room number", " ", "error");
        reject("Patient fields validation error: Duplicate patient assignment in newly entered fields");
        return;
      }
    }

    resolve();
  });
};;

const nurseValidatePushStoreLS = () => {
  return new Promise((resolve, reject) => {
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

    if (nurseList.some(nurse => nurse.name === name)) {
      swal("Duplicate nurse name detected. Please enter a unique nurse name.", " ", "error");
      reject("Nurse validation error: Duplicate nurse name");
    } else {
      nurseList.push({
        name,
        break_time,
        break_relief,
        extra_duties,
        fire_code,
      });

      localStorage.setItem("nurseList", JSON.stringify(nurseList));
      resolve();
    }
  });
};

const createWardPatientsArray = () => {
  return new Promise((resolve, reject) => {
    let inputDivs = document.getElementsByClassName('psingle-input');

    if (!validatePatientFields(inputDivs)) {
      reject(new Error('Failed to validate patient fields.'));
      return;
    }

    let wardPatientsArray = JSON.parse(localStorage.getItem('wardPatientsArray')) || [];
    let nursePatientsObject = JSON.parse(localStorage.getItem('nursePatientsObject')) || [];

    for (let i = 0; i < inputDivs.length; i++) {
      let newRoomInput = inputDivs[i].querySelector('input[id^="room"]');
      let newPatientInput = inputDivs[i].querySelector('input[id^="patient"]');

      let newRoomNumber = newRoomInput.value.trim();
      let newPatientName = newPatientInput.value.trim();

      if (newRoomNumber !== '' && newPatientName !== '') {
        let newPatientObject = {
          room_number: newRoomNumber,
          patient_name: newPatientName
        };

        wardPatientsArray.push(newPatientObject);
      }
    }

    let nursePatientsArray = wardPatientsArray.slice(-inputDivs.length);
    nursePatientsObject.push({
      nursePatientsArray
    });
    

    localStorage.setItem('wardPatientsArray', JSON.stringify(wardPatientsArray));
    localStorage.setItem('nursePatientsObject', JSON.stringify(nursePatientsObject));

    console.log("wardPatientsArray: ", wardPatientsArray);
    console.log("nursePatientsObject: ", nursePatientsObject);

    resolve();
  });
};


const showNurseAndPatientData = () => {
  return new Promise((resolve, reject) => {
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

    const shiftCardsContainer = document.querySelector(".shift-cards");

    shiftCardsContainer.innerHTML = '';

    console.log("nurseList:", nurseList);

    nurseList.forEach((nurseElement, index) => {
      console.log("current nurse index:", index);

      const nurseDiv = document.createElement('div');

      nurseDiv.innerHTML =
      '<div class=\'button-wrapper\'>' +
      '<button onclick="deleteData(' + index + ')" class="delete-button">Delete</button>' +
      '<button onclick="handleEditBtn(' + index + ')" class="edit-button">Edit</button>' +
    '</div>' +
    '<table>' +
      '<tr>' +
        '<td><strong>Name:</strong></td>' +
        '<td>' + nurseElement.name + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td><strong>Break:</strong></td>' +
        '<td>' + nurseElement.break_time + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td><strong>Relief:</strong></td>' +
        '<td>' + nurseElement.break_relief + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td><strong>Extra Duties:</strong></td>' +
        '<td><span style="color:red">' + nurseElement.extra_duties + '</span></td>' +
      '</tr>' +
      '<tr>' +
        '<td><strong>Fire Code:</strong></td>' +
        '<td><span style="color:red">' + nurseElement.fire_code + '</span></td>' +
      '</tr>' +
    '</table>';
      nurseDiv.classList.add('nurse-info');

      const nursePatients = nursePatientsObject[index];

      if (nursePatients && nursePatients.nursePatientsArray.length > 0) {
        const table = document.createElement('table');
        table.classList.add('patient-table');

        const tableHeader = document.createElement('tr');
        tableHeader.innerHTML = '<th>Room</th><th>Patient</th>';
        table.appendChild(tableHeader);

        nursePatients.nursePatientsArray.forEach((patient) => {
          const tableRow = document.createElement('tr');

          const roomCell = document.createElement('td');
          roomCell.textContent = patient.room_number;

          const patientCell = document.createElement('td');
          patientCell.textContent = patient.patient_name;

          tableRow.appendChild(roomCell);
          tableRow.appendChild(patientCell);

          table.appendChild(tableRow);
        });

        nurseDiv.appendChild(table);
      }

      shiftCardsContainer.appendChild(nurseDiv);
    });

    if (nurseList && nursePatientsObject) {
      resolve();
    } else {
      reject(new Error('Failed to retrieve nurse and patient data.'));
    }
  });
};

// clear local storage when page loads
window.addEventListener('load', function () {
  // Clear the local storage
  localStorage.clear();
  console.log('Local storage has been reset.');
});


// function to delete Data from local storage
// function to delete data from local storage
function deleteData(index) {
  let nurseList = JSON.parse(localStorage.getItem("nurseList")) || [];
  let nursePatientsObject = JSON.parse(localStorage.getItem("nursePatientsObject")) || [];
  let wardPatientsArray = JSON.parse(localStorage.getItem("wardPatientsArray")) || [];

  nurseList.splice(index, 1);
  nursePatientsObject.splice(index, 1);

  const updatedWardPatientsArray = wardPatientsArray.filter(patient => patient.nursePatientObjectIndex == index);

  localStorage.setItem("nurseList", JSON.stringify(nurseList));
  localStorage.setItem("nursePatientsObject", JSON.stringify(nursePatientsObject));
  localStorage.setItem("wardPatientsArray", JSON.stringify(updatedWardPatientsArray));

  // Update the HTML after deleting the data from local storage
  showNurseAndPatientData();
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
      showNurseAndPatientData();

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



function PatientPopulateDeleteEdit(index) {
  // Retrieve the nursePatientsObject from local storage
  let nursePatientsObject = JSON.parse(localStorage.getItem('nursePatientsObject')) || [];

  // Find the nursePatientsArray at the specified index
  const nursePatientsArray = nursePatientsObject[index]?.nursePatientsArray || [];

  // Prepopulate the dynamic HTML setup
  const allPatientsDiv = document.getElementById('all-patients');
  allPatientsDiv.innerHTML = '';

  nursePatientsArray.forEach((patient, i) => {
    const patientDiv = document.createElement('div');
    patientDiv.classList.add('psingle-input');

    const roomInput = document.createElement('input');
    roomInput.type = 'text';
    roomInput.id = 'room' + (i + 1);
    roomInput.placeholder = 'Room';
    roomInput.value = patient.room_number || '';

    const patientInput = document.createElement('input');
    patientInput.type = 'text';
    patientInput.id = 'patient' + (i + 1);
    patientInput.placeholder = 'Patient';
    patientInput.value = patient.patient_name || '';

    patientDiv.appendChild(roomInput);
    patientDiv.appendChild(patientInput);
    allPatientsDiv.appendChild(patientDiv);
  });

  // Update the wardPatientsArray
  let wardPatientsArray = JSON.parse(localStorage.getItem('wardPatientsArray')) || [];

  wardPatientsArray = wardPatientsArray.filter((patient, i) => i !== index);

  // Store the updated wardPatientsArray in local storage
  localStorage.setItem('wardPatientsArray', JSON.stringify(wardPatientsArray));

  // Delete the nursePatientsArray from the nursePatientsObject
  nursePatientsObject.splice(index, 1);

  // Store the updated nursePatientsObject in local storage
  localStorage.setItem('nursePatientsObject', JSON.stringify(nursePatientsObject));
}


const handleEditBtn = (index) =>
{
  NursePopulateDeleteEdit(index);
  PatientPopulateDeleteEdit(index);
  showNurseAndPatientData();
}


// view-only display
// Working as of 05/23 6:30PM
const final_submit1 = () => {
  const final_submit_btn = document.getElementById("submit-all-btn");
  const form_card = document.querySelector("#info-card");
  const buttons = document.querySelectorAll(".button-wrapper");

  // Check if neither shift type is selected in local storage
  const shiftType = localStorage.getItem('shiftType');
  if (shiftType !== 'day' && shiftType !== 'night') {
    swal("Please select a shift type before final submission", " ", "error");
    return;
  } else {
    form_card.style.display = "none";
    final_submit_btn.style.display = "none";

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.display = "none";
    }
  }
};



