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

const calendar_text = document.getElementById("current-date");
let now = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let fullDate = now.toLocaleDateString('en-US', options);
calendar_text.innerHTML = fullDate;


// view page

function displayFullDate() {
  const calendar_text = document.getElementById("current-date");
  let now = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let fullDate = now.toLocaleDateString('en-US', options);
  calendar_text.innerHTML = fullDate;
}
displayFullDate();

// Dynamically rendering patient input in the form 


// document.addEventListener('DOMContentLoaded', function() {
//   const addPatientBtn = document.getElementById('add-patient-btn');
//   const allPatientsDiv = document.getElementById('all-patients');

  
//   let patientCount = 1;
//   let patients = []; // Array to store patient objects

//   addPatientBtn.addEventListener('click', function(e) {
//     e.preventDefault();

//     let patientDiv = document.createElement('div');
//     patientDiv.classList.add('psingle-input');

//     let roomInput = document.createElement('input');
//     roomInput.type = 'text';
//     roomInput.id = 'room' + (patientCount + 1);
//     roomInput.placeholder = 'Room';

//     let patientInput = document.createElement('input');
//     patientInput.type = 'text';
//     patientInput.id = 'patient' + (patientCount + 1);
//     patientInput.placeholder = 'Patient';

//     patientDiv.appendChild(roomInput);
//     patientDiv.appendChild(patientInput);

//     allPatientsDiv.appendChild(patientDiv);

//     // Create patient object and push it to the patients array
//     let patientObject = {
//       patient_name: patientInput.value,
//       room_number: roomInput.value
//     };
//     patients.push(patientObject);

//     patientCount++;
//   });
// });







// Clark's code for Patient's array


// Custom JavaScript event to handle updates to patient list (keeps count in Global Scope)
const event = new CustomEvent("update_patient_list");

window.addEventListener('DOMContentLoaded', () => 
{
  let patientCount = 0;
  const update_patient_list = new CustomEvent('update_patient_list');
  document.dispatchEvent(update_patient_list)
})

// Listen for the custom event to log updates.
document.addEventListener('update_patient_list', function() 
{
  const patient_array = getPatientsFromLS();
  let patientCount = patient_array.length;

  console.log(`There are ${patientCount} patients`, patient_array)
});















const addPatientBtn = document.getElementById('add-patient-btn');
const allPatientsDiv = document.getElementById('all-patients');


// Function to check for duplicate patient names and room numbers
// arguments: ({patient_name: string, room_number: number})    || return: boolean value
function validatePatients(newPatientObject) {
  const patient_array = getPatientsFromLS();

  // Check for duplication of patient name in local storage
  const isDuplicateName = patient_array.some((patient) => patient.patient_name === newPatientObject.patient_name);

  // Check for duplication of room number in local storage
  const isDuplicateRoomNumber = patient_array.some((patient) => patient.room_number === newPatientObject.room_number);

  if (isDuplicateName) {
    swal("Patient name already exists. Please enter a unique patient name", " ", "error");
    return false;
  }

  if (isDuplicateRoomNumber) {
    swal("Room number already exists. Please enter a unique room number", " ", "error");
    return false;
  }

  return true;
}


addPatientBtn.addEventListener('click', function(e) 
{
  e.preventDefault();

  // Retrieving Patient data and setting count
  const current_patients = getPatientsFromLS();
  const patientCount = current_patients.length ?? 0

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


  // Create patient object and push it to the patients array
  let patient_inputs = allPatientsDiv.getElementsByTagName('input');
  const length = patient_inputs.length

  let patientObject = {
    patient_name: patient_inputs[length - 1].value ?? 'undefined',
    room_number: patient_inputs[length - 2].value ?? 404
  };

  // Evaluate validity of patient's data
  const is_valid = validatePatients(patientObject)

  // Validate the patient data
  if (!is_valid) {
    swal("Patient is already assigned. Please enter a unique patient name", " ", "error"); 
    return// Stop execution if validation fails
  }

  // Append new input fields into the parent container
  allPatientsDiv.appendChild(patientDiv);

  // // Add the patient to local storage
  // setPatientsToLS(patientObject);

  // Dispatch custom event so we can globally track the patient's list
  // const update_patient_list = new CustomEvent('update_patient_list');
  // addPatientBtn.dispatchEvent(update_patient_list)
});




// Manipulate HTML inputs to add new fields on button click

// Decide how to extract and validate data from the form


















  

// Note that the contents of our patient array should look like:
// {
//   name: 'Clark',
//   room_number: 123
// }

const getPatientsFromLS = () =>
{
  // Check local storage for current patients array
  let current_patients = localStorage.getItem('patientList');

  // if it exists, return the parsed value for use
  if (current_patients !== null) {
    current_patients = JSON.parse(current_patients);
    return current_patients
  }

  // otherwise, return a new array we can use
  return []
}

const setPatientToLS = (new_patient_object) =>
{
  if (
    !new_patient_object ||
    !new_patient_object.patient_name ||
    !new_patient_object.room_number
  ) throw Error('Invalid input provided for Patient Object')

  const current_patients = getPatientsFromLS();

  current_patients.push(new_patient_object)

  localStorage.setItem('patientList', JSON.stringify(current_patients))
}

const setPatientsToLS = (new_patient_array) =>
{
  if (
    !new_patient_array
  ) throw Error('Invalid input provided for Patient Array')

  const current_patients = getPatientsFromLS();

  current_patients.push(...new_patient_array)

  localStorage.setItem('patientList', JSON.stringify(current_patients))
}













const add_nursebtn = document.getElementById("submit");

add_nursebtn.addEventListener('click', (event) => {
  event.preventDefault();
  validateForm();
  addData();
  // Stop execution of other updates if this one fails
  handlePatientUpdate();
});

document.getElementById("update").style.display = "none";

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
const showData = () => {
  let nurseList;
  if (localStorage.getItem("nurseList") == null) {
    nurseList = [];
  } else {
    nurseList = JSON.parse(localStorage.getItem("nurseList"));
  }

  let patientList;
  if (localStorage.getItem("patientList") == null) {
    patientList = [];
  } else {
    patientList = JSON.parse(localStorage.getItem("patientList"));
  }

  // set references to card containers
  const dayCardsContainer = document.querySelector(".day-cards");
  const nightCardsContainer = document.querySelector(".night-cards");

  // Resets the innerHTML of the card containers to remove old data
  dayCardsContainer.innerHTML = '';
  nightCardsContainer.innerHTML = '';

  // iterate through localStorage data to generate cards
  nurseList.forEach((nurseElement, nurseIndex) => {
    const nurseDiv = document.createElement('div');

    nurseDiv.innerHTML =
      '<p><strong>Name:</strong> ' + nurseElement.name + '</p>' +
      '<p><strong>Break:</strong> ' + nurseElement.break_time + '</p><p><strong>Relief:</strong> ' + nurseElement.break_relief + '</p>' +
      '<p><strong>Extra Duties:</strong> <span style="color:red">' + nurseElement.extra_duties + '</span></p>' +
      '<p><strong>Fire Code:</strong> <span style="color:red">' + nurseElement.fire_code + '</span></p>' +
      '<div class=\'button-wrapper\'>' +
      '<button onclick="deleteData(' + nurseIndex + ')" class="delete-button">Delete</button>' +
      '<button onclick="updateData(' + nurseIndex + ')" class="edit-button">Edit</button>' +
      '</div>';

    nurseDiv.classList.add('nurse-info');

    const patientCard = document.createElement('div');
    patientCard.classList.add('patient-info');

    patientList.forEach((patientElement, patientIndex) => {
      const newDiv = document.createElement('div');
      let patientInfo = patientElement.room_number && patientElement.room_number !== '' ? '<p><strong>Room :</strong> ' + patientElement.room_number + ' - ' + patientElement.patient_name + '</p>' : '';
      newDiv.innerHTML = patientInfo;
      newDiv.classList.add('patient-card');
      patientCard.appendChild(newDiv);
    });

    nurseDiv.appendChild(patientCard);
    dayCardsContainer.appendChild(nurseDiv);
  });
};


// New callback for handling batch updates to the Patient Array
const handlePatientUpdate = () =>
{
  // extract all patient inputs from globally defined allPatientsDiv elem
  let patient_inputs = Array.from(allPatientsDiv.getElementsByTagName('input'));
  const length = patient_inputs.length

  let finalpatientObject = {
    patient_name: patient_inputs[length - 1].value ?? 'undefined',
    room_number: patient_inputs[length - 2].value ?? 404
  };

  // Prevent the updating of patients if the final patient is not valid
  if (!validatePatients(finalpatientObject)) {
    swal("Patient is already assigned. Please enter a unique patient name", " ", "error"); 
    return;
  }

  // create an array of the values from our inputs (ex. [room_number0, patient_name0, room_number1, patient_name1]) 
  const input_values = []

  for (let i = 0; i < patient_inputs.length; i++) {
    console.log(patient_inputs[i].value);
    input_values.push(patient_inputs[i].value); 
  }

  const chunkIntoN = (arr) => {
    const size = 2;
    return Array.from({ length: arr.length / 2 }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  // generate an array that contains the paired data (ex. [ [room_number0, patient_name0], [room_number1, patient_name1] ])
  const patient_pairs_array = chunkIntoN(input_values)


  // generate an array that contains our patient objects
  const patient_object_array = patient_pairs_array.map(
    (patient_pair_entry) => 
    {
      return {
        room_number: patient_pair_entry[0],
        patient_name: patient_pair_entry[1]
      }
    }
  )

  setPatientsToLS(patient_object_array);
}










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
    let roomInputs = document.querySelectorAll(".room");
    let patientInputs = document.querySelectorAll(".patient");
    let patients = [];

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
      patients,
    });

    console.log(patients);

    localStorage.setItem("nurseList", JSON.stringify(nurseList));
    showData();

    document.getElementById("nurse-name").value = "";
    document.getElementById("nurse-break").value = "";
    document.getElementById("break-relief").value = "";
    document.getElementById("extra-duties").value = "";
    document.getElementById("fire-code").value = "";

    // Clear patient inputs
    roomInputs.forEach(input => (input.value = ""));
    patientInputs.forEach(input => (input.value = ""));
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

  nurseList.splice(index, 1);
  localStorage.setItem("nurseList", JSON.stringify(nurseList));
  showData();
}

// function to update/edit date in local storage

function updateData(index) {
  // submit button will hide and update button will show for updating of data in local storage
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let nurseList;
  if (localStorage.getItem("nurseList") == null) {
    nurseList = [];
  }
  else {
    nurseList = JSON.parse(localStorage.getItem("nurseList"));
  }
  console.log(nurseList);

  document.getElementById("nurse-name").value = nurseList[index].name;
  document.getElementById("nurse-break").value = nurseList[index].break_time;
  document.getElementById("break-relief").value = nurseList[index].break_relief;
  document.getElementById("extra-duties").value = nurseList[index].extra_duties;
  document.getElementById("fire-code").value = nurseList[index].fire_code;


  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      nurseList[index].name = document.getElementById("nurse-name").value;
      nurseList[index].break_time = document.getElementById("nurse-break").value;
      nurseList[index].break_relief = document.getElementById("break-relief").value;
      nurseList[index].extra_duties = document.getElementById("extra-duties").value;
      nurseList[index].fire_code = document.getElementById("fire-code").value;

      showData();
      localStorage.setItem("nurseList", JSON.stringify(nurseList));

      document.getElementById("nurse-name").value = "";
      document.getElementById("nurse-break").value = "";
      document.getElementById("break-relief").value = "";
      document.getElementById("extra-duties").value = "";
      document.getElementById("fire-code").value = "";
      
      //  update button will hide and submit button shows 

      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }

  }

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

const sample_nurse_data = {
  name: 'unique_name',
  break_relief: 'validated_other_nurse_name',
  patients: [
    {
      // Unique name across all Nurse Objects' Patient Data
      name: 'unique_name',
      // unique number between0 and 10000
      room_number: 0
    }
  ]
}

// NEW FUNCTION REQUIRED | CLARK 5/23 7 PM now
// add a new nurse
// const validatePatients = (patient_array) => {
  // Retreive stored nurse objects
  // Generate a single array containing all patient data from all nurse objects
  // Loop through the patient_array passed in from validation data
  // check if the current index of the new patient data matches any of the other patients
  // check based on name && room number
// }