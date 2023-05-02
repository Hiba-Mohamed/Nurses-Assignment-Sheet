const loginBtn = document.getElementById("login-button");
loginBtn.onclick = (e) =>
{
    e.preventDefault();
    // catch the value which is type use login page
    const emailAddress = document.getElementById("email").value;
    const passWord = document.getElementById("pass").value;

// getting the value in localstorage which stores user in registration form
    const emailstored = localStorage.getItem("Email");
    const passstored = localStorage.getItem("Password");

    if(emailAddress == "" || passWord == "")
      {
        swal("All fields must be filled", "error");
      }
    else 
      {
         if (emailAddress == emailstored && passWord == passstored )
           {
            swal("", "Login successful", "success");
           }
           else
           {
            swal("", "Please check if the Email address and password are correct", "error");
           }
      }
}

// creating an account

const create_direct = document.getElementById("create-direct");

create_direct.onclick = (e) =>
{
    const login_page = document.getElementById("log-in");
    const create_page = document.getElementById("create-account");
    login_page.style.display = 'none';
    create_page.style.display = 'block';
}

const submit_button = document.getElementById("create-btn");
submit_button.addEventListener('click', function(e)
{
    e.preventDefault();
    // all input data receive these variables
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const pass  = document.getElementById("pass").value;
    const cpass = document.getElementById("cpass").value;

    // storing this data in web browser store
    localStorage.setItem('FirstName', fname);
    localStorage.setItem('LastName', lname);
    localStorage.setItem('Email', email);
    localStorage.setItem('Password', pass);
    localStorage.setItem('Cpassword', cpass);

    // setting conditions
    if(fname == "" || lname == "" || email == "" || pass == "" || cpass == "")     {
        swal("Opps..!", "All input fields must be filled", "error");
     }
     else
     {
        if(pass !== cpass) 
        {
            swal("Opps..!", "The passwords you entered are not matching", "error");
        }
        else
        {
            swal("Registration successful!", "You created a new account!", "success");
        }
     }
});


// directing to login page from creating an account page

const login_direct = document.getElementById("login-direct");
login_direct.onclick = (e) =>
{
    const login_page = document.getElementById("log-in");
    const create_page = document.getElementById("create-account");
    login_page.style.display = 'block';
    create_page.style.display = 'none';
}

// editing page

// current date function

  const calendar_text = document.getElementById("current-date");
  let now      = new Date();
  let options  = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let fullDate = now.toLocaleDateString('en-US', options);
  calendar_text.innerHTML = fullDate;



// adding Day vs Night shift under the date
const dayButton = document.querySelector('.day-button');
const nightButton = document.querySelector('.night-button');
const shiftText = document.querySelector('#shift-text');

dayButton.addEventListener('click', function() 
{
  shiftText.textContent = "Day Shift";
  dayButton.style.display = "none";
  nightButton.style.display = "none";
});

nightButton.addEventListener('click', function() 
{
  shiftText.textContent = "Night Shift";
  dayButton.style.display = "none";
  nightButton.style.display = "none";
});



// view page

function displayFullDate() 
{
   const calendar_text = document.getElementById("date-view");
  var now      = new Date();
  var options  = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var fullDate = now.toLocaleDateString('en-US', options);
  calendar_text.innerHTML = fullDate;
}
displayFullDate();

const shift_text = document.getElementById("shift-text");
const day_night = localStorage.getItem('Shift');
const shift_display = shift_text.innerHTML = day_night;



// creating a constructor function for storing the inputs added
// by the user
function nurse (name, break_Time, break_relief, code, duties, rooms, patients)
  {
    this.name       = name;
    this.break_Time = break_Time;
    this.break_relief    = break_relief;
    this.code       = code;
    this.duties     = duties;
    this.rooms      = rooms;
    this.patients   = patients
  }

  const form_button = document.getElementById("submit-button");
form_button.onclick = (e) => 
{
    e.preventDefault();
    // all input data receive these variables
    const nurse_name    = document.getElementById("nurse-name").value;
    const nurse_break   = document.getElementById("nurse-break").value;
    const break_relief  = document.getElementById("break-relief").value;
    const extra_duties  = document.getElementById("extra-duties").value;
    const fire_code     = document.getElementById("fire-code").value;
    const room1         = document.getElementById("room1").value;
    const patient1      = document.getElementById("patient1").value;
    const room2         = document.getElementById("room2").value;
    const patient2      = document.getElementById("patient2").value;
    const room3         = document.getElementById("room3").value;
    const patient3      = document.getElementById("patient3").value;
    const room4         = document.getElementById("room4").value;
    const patient4      = document.getElementById("patient4").value;

    // storing this data in web browser store
    localStorage.setItem('Nurse name', nurse_name);
    localStorage.setItem('Nurse break', nurse_break);
    localStorage.setItem('Nurse relief', break_relief);
    localStorage.setItem('Extra duties', extra_duties);
    localStorage.setItem('Fire code', fire_code);
    localStorage.setItem('Room 1', room1);
    localStorage.setItem('Patient 1', patient1);
    localStorage.setItem('Room 2', room2);
    localStorage.setItem('Patient 2', patient2);
    localStorage.setItem('Room 3', room3);
    localStorage.setItem('Patient 3', patient3);
    localStorage.setItem('Room 4', room4);
    localStorage.setItem('Patient 4', patient4);

    window.location.href = "view.html"

}

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}



// connecting the input from the form to the constructor function 


 
// using the stored data to create the viewing page 
;

// ability to add a whole card when clicking "add nurse" button

// ability to add room and patient when clicking "add patient" button

// ability to hide the parts that are empty in the viewing page rather than having empty fields

// // Factory pattern
// // const createNurse = (name, tasks, patients) =>
// const nurse = (name, break_time, code, duties) =>
// {
//   const nurse_info = {
//     name,
//     break_time,
//     code,
//     duties,
//   }

//   return {
//     nurse_info,
//     review_info: () => {
//       console.log(nurse_info)
//     },
//     register: () => {
//       localStorage.setItem(nurse_info.name, JSON.stringify(nurse_info))
//     }
//   }
// }

// // // called the factorty pattern to initialize a new nurse object
// // const hiba_mohammed = createNurse(
// //   'Hiba Mohammed',
// //   {
// //     'check_medecine': 'Check stock on all medications in RM 413',
// //     'create_schedule': 'Create schedule for the next shift',
// //     'update_fire_code': 'Ensure all relevant fire codes are up to date for the current shift'
// //   },
// //   {
// //     'Clark Oake': {room: 'RM413', condition: 'stable', vitals: {heart_rate: 90, weight: 180}},
// //     'Jan Mertlik': {room: 'RM415', condition: 'stable', vitals: {heart_rate: 90, weight: 180}},
// //     'Sahand Seifi': {room: 'RM413', condition: 'stable', vitals: {heart_rate: 90, weight: 180}},
// //   }
// // );

// // used the created nurse object to call factory methods
// // hiba_mohammed.review_info();
// // hiba_mohammed.register();

// // retrieved stored JSON data from localStorage
// const retrieveNurseFromStorage = (nurse_name) => {

//   const nurse_info = JSON.parse(localStorage.getItem(nurse_name))

//   console.log(nurse_info)

//   return nurse_info
// }

// // Handle the submission of a new nurse creation form
// const handleNurseSubmit = (e) => {
//   e.preventDefault()

//   const new_nurse = createNurse(nurse_name.value, nurse_break.value, nurse_code.value)

//   new_nurse.register();
//   console.log(new_nurse.nurse_info);
// }

// retrieveNurseFromStorage('Clark');
