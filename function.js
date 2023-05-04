const loginBtn = document.getElementById("login-button");
loginBtn.onclick = (e) =>
{
    e.preventDefault();
    // catch the value which is type use login page
    const emailAddress = document.getElementById("email-login").value;
    const passWord     = document.getElementById("pass-login").value;

// getting the value in localstorage which stores user in registration form
    const emailstored = localStorage.getItem("Email");
    const passstored  = localStorage.getItem("Password");

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
// function nurse (name, break_Time, break_relief, fire_code, extra_duties, rooms, patients)
//   {
//     this.name         = name;
//     this.break_Time   = ["First", "Second", "Third"];
//     this.break_relief = break_relief;
//     this.fire_code    = ["R","A","C","E"];
//     this.extra_duties = ["In-charge", "Shift Count", "Safety Round", "Crash Cart"];
//     this.rooms        = rooms;
//     this.patients     = patients

//     return {
//           nurse_info,
//           review_info: () => {
//             console.log(nurse_info)
//           },
//           register: () => {
//             localStorage.setItem(nurse_info.name, JSON.stringify(nurse_info))
//           }
//           }
// }

const submit_edt  = document.getElementById('edit-button');
const nurse_name   = document.getElementById('nurse-name');
const nurse_break  = document.getElementById('nurse-break');
const break_relief = document.getElementById('break-relief');
const extra_duties = document.getElementById('extra-duties');
const fire_code    = document.getElementById('fire-code');

const room1    = document.getElementById('room1');
const patient1 = document.getElementById('patient1');
const room2    = document.getElementById('room2');
const patient2 = document.getElementById('patient2');
const room3    = document.getElementById('room3');
const patient3 = document.getElementById('patient3');
const room4    = document.getElementById('room4');
const patient4 = document.getElementById('patient4');



// Generates a new nurse object based on the data passed in... also provides methods for handling registration of nurses

const generateNurse = (event) => {
  //prevents page refresh on submit
  event.preventDefault();

  const new_nurse = {
    name: nurse_name.value,
    break_time: nurse_break.value,
    break_relief: break_relief.value,
    extra_duties: extra_duties.value ?? 'N/A',
    fire_code: fire_code.value,
    patients: [
      {
        patient_name: patient1.value,
        room: room1.value
      },
      {
        patient_name: patient2.value,
        room: room2.value
      },
      {
        patient_name: patient3.value,
        room: room3.value
      },
      {
        patient_name: patient4.value,
        room: room4.value
      }
    ],
    register: () => {
      localStorage.setItem(new_nurse.name, JSON.stringify(new_nurse))
    },

    submit_edt:onclick = (e) =>
    {
      e.preventDefault();
        const edit_page = document.getElementById("edit-sheet");
        const view_page = document.getElementById("view-page");
        edit_page.style.display = 'none';
        view_page.style.display = 'block';
    },
    


  };

  console.log(new_nurse);

    // Retrieve nurse data from local storage
    const nurseData = localStorage.getItem(new_nurse.name);
    if (nurseData) {
      const nurse = JSON.parse(nurseData);
    }
  
  // Update view section with nurse data
const  updateView = () =>
{
  const name_view  = document.getElementById('name-view');
  const break_view  = document.getElementById('break-view');
  const relief_view = document.getElementById('relief-view');
  const duties_view = document.getElementById('duties-view');
  const code_view   = document.getElementById('code-view');
  
  const room1_view    = document.getElementById('rm1');
  const patient1_view  = document.getElementById('pt1');
  const room2_view     = document.getElementById('rm2');
  const patient2_view  = document.getElementById('pt2');
  const room3_view     = document.getElementById('rm3');
  const patient3_view  = document.getElementById('pt3');
  const room4_view     = document.getElementById('rm4');
  const patient4_view  = document.getElementById('pt4');
 

name_view.textContent = localStorage.getItem('name');
break_view.textContent = nurse.break_time;
relief_view.textContent = nurse.break_relief;
duties_view.textContent = nurse.extra_duties;
code_view.textContent = nurse.fire_code;
patient1_view.textContent = nurse.patients[0].patient_name;
room1_view.textContent = nurse.patients[0].room;
patient2_view.textContent = nurse.patients[1].patient_name;
room2_view.textContent = nurse.patients[1].room;
patient3_view.textContent = nurse.patients[2].patient_name;
room3_view.textContent = nurse.patients[2].room;
patient4_view.textContent = nurse.patients[3].patient_name;
room4_view.textContent = nurse.patients[3].room;
}
updateView();

};
 


