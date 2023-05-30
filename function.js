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

window.addEventListener('DOMContentLoaded', () => {
  const update_patient_list = new CustomEvent('update_patient_list');
  document.dispatchEvent(update_patient_list)
})

// Listen for the custom event to log updates.
document.addEventListener('update_patient_list', function() {
  const patient_array = getPatientsFromLS();
  let patientCount = patient_array.length;

  console.log(`There are ${patientCount} patients`, patient_array)
});


const addPatientBtn = document.getElementById('add-patient-btn');
const allPatientsDiv = document.getElementById('all-patients');


addPatientBtn.addEventListener('click', function(e) {
  e.preventDefault();

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


  // I would probably handle the validation of patient data here.  
  // We can check if the name and room number are the same as any of the existing patients
  // If they are, the patient is already assigned to another nurse, so we can trigger an alert and prevent
  // the document from adding new fields until the collision is resolved by the user


  setPatientsToLS(patientObject);

  // Append new input fields into the parent container
  allPatientsDiv.appendChild(patientDiv);

  // Dispatch custom event so we can globally track the patient's list
  const update_patient_list = new CustomEvent('update_patient_list');
  addPatientBtn.dispatchEvent(update_patient_list)
});


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

const setPatientsToLS = (new_patient_object) =>
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













const add_nursebtn = document.getElementById("submit");

add_nursebtn.addEventListener('click', (event) => {
  event.preventDefault();
  validateForm();
  addData();
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

  // set references to card containers
  const dayCardsContainer = document.querySelector(".day-cards");
  const nightCardsContainer = document.querySelector(".night-cards");

  // Resets the innerHTML of the card containers to remove old data
  dayCardsContainer.innerHTML = '';
  nightCardsContainer.innerHTML = '';

  // iterate through localStorage data to generate cards
  nurseList.forEach((element, index) => {
    const newDiv = document.createElement('div');

    newDiv.innerHTML = '<p><strong>Name:</strong> ' + element.name + '</p>' +
      '<p><strong>Break:</strong> ' + element.break_time + '</p><p><strong>Relief:</strong> ' + element.break_relief + '</p>' +
      '<p><strong>Extra Duties:</strong> <span style="color:red">' + element.extra_duties + '</span></p>' +
      '<p><strong>Fire Code:</strong> <span style="color:red">' + element.fire_code + '</span></p>' +
      '<div class=\'button-wrapper\'>' +
      '<button onclick="deleteData(' + index + ')" class="delete-button">Delete</button>' +
      '<button onclick="updateData(' + index + ')" class="edit-button">Edit</button>' +
      '</div>';

    newDiv.classList.add('nurse-info');

    dayCardsContainer.appendChild(newDiv);

// Get the toggle switch element
// const toggleSwitch = document.querySelector("switch");

// Add an event listener to the toggle switch
// toggleSwitch.addEventListener("click", function() 
// {
//   if (toggleSwitch.checked) 
//   {
//     // Append the newly created card to the night shift cards container
//     nightCardsContainer.appendChild(newDiv);
//   } 
//   else 
//   {
//     // Append the newly created card to the day shift cards container
//     dayCardsContainer.appendChild(newDiv);
//   }
// });

  });
};

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
const validatePatients = (patient_array) => {
  // Retreive stored nurse objects
  // Generate a single array containing all patient data from all nurse objects
  // Loop through the patient_array passed in from validation data
  // check if the current index of the new patient data matches any of the other patients
  // check based on name && room number
}