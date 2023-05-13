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
        swal("All fields must be filled", " ", "error");
      }
    else 
      {
         if (emailAddress == emailstored && passWord == passstored )
           {
            swal("Login successful", "", "success");
           }
           else
           {
            swal("Please check if the Email address and password are correct", "", "error");
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
        swal("All input fields must be filled", "", "error");
     }
     else
     {
        if(pass !== cpass) 
        {
            swal("The passwords you entered are not matching", "", "error");
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
   const calendar_text = document.getElementById("current-date");
  let now      = new Date();
  let options  = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let fullDate = now.toLocaleDateString('en-US', options);
  calendar_text.innerHTML = fullDate;
}
displayFullDate();

// const shift_text = document.getElementById("shift-text");
// const day_night = localStorage.getItem('Shift');
// const shift_display = shift_text.innerHTML = day_night;

document.getElementById("update").style.display = "none";

function validateForm() {
    let name = document.getElementById("nurse-name").value;
    let break_time = document.getElementById("nurse-break").value;
    let break_relief = document.getElementById("break-relief").value;
    let fire_code = document.getElementById("fire-code").value;

    switch (true) {
        case (name == ""):
            alert("Nurse's name is required");
            // swal("Please fill in nurse's name"," " , "error");
            return false;
        case (break_time == ""):
            alert("Break time is required");
            // swal("Please fill nurse's break"," " , "error");
            return false;
        case (fire_code == ""):
            alert("Fire code is required");
            // swal("Please fill in fire code"," " , "error");
            return false;
        case (break_relief == ""):
            alert("Break relief is required");
            // swal("Please fill in nurse's relief"," " , "error");
            return false;
        default:
            return true;
    }
}

const showData = () => {
    let nurseList;
    if (localStorage.getItem("nurseList") == null) {
        nurseList = [];
    }
    else {
        nurseList = JSON.parse(localStorage.getItem("nurseList"));
    }
    // set ref to card container
    const display_cards = document.querySelector("#display-cards");

    // Resets the innerHTML of the display-cards component to remove old data
    display_cards.innerHTML = '';

    // iterate through localStorage data to generate cards
    nurseList.forEach(
        (element, index) =>
        {
            const newDiv = document.createElement('div');
            let room1 = element.room1 && element.room1 !== '' ? '<p><strong>Room :</strong> ' + element.room1 + ' - ' + element.patient1 + '</p>' : '';
            let room2 = element.room2 && element.room2 !== '' ? '<p><strong>Room :</strong> ' + element.room2 + ' - ' + element.patient2 + '</p>' : '';
            let room3 = element.room3 && element.room3 !== '' ? '<p><strong>Room :</strong> ' + element.room3 + ' - ' + element.patient3 + '</p>' : '';
            let room4 = element.room4 && element.room4 !== '' ? '<p><strong>Room :</strong> ' + element.room4 + ' - ' + element.patient4 + '</p>' : '';
            let room5 = element.room5 && element.room5 !== '' ? '<p><strong>Room :</strong> ' + element.room5 + ' - ' + element.patient5 + '</p>' : '';
            let room6 = element.room6 && element.room6 !== '' ? '<p><strong>Room :</strong> ' + element.room6 + ' - ' + element.patient6 + '</p>' : '';
            let room7 = element.room7 && element.room7 !== '' ? '<p><strong>Room :</strong> ' + element.room7 + ' - ' + element.patient7 + '</p>' : '';
            let room8 = element.room8 && element.room8 !== '' ? '<p><strong>Room :</strong> ' + element.room8 + ' - ' + element.patient8 + '</p>' : '';
            
            newDiv.innerHTML = '<p><strong>Name:</strong> ' + element.name + '</p>' +
                '<p><strong>Break:</strong> ' + element.break_time + '<p><strong>Relief:</strong> ' + element.break_relief + '</p>' +
                '<p><strong>Extra Duties:</strong> <span style="color:red">' + element.extra_duties + '</span></p>' +
                '<p><strong>Fire Code:</strong> <span style="color:red">' + element.fire_code + '</span></p>' +
                room1 + room2 + room3 + room4 + room5 + room6 + room7 + room8 +
                '<div class=\'button-wrapper\'>' +
                '<button onclick="deleteData('+ index +')" class="delete-button">Delete</button>' +
                '<button onclick="updateData('+ index +')" class="edit-button">Edit</button>' +
                '</div>';
                
            
            newDiv.classList.add('nurse-info');
            
            // Appends the newly created card into the display-cards innerHTML
            display_cards.appendChild(newDiv);
    });
    

    // document.querySelector(".nurse-info").innerHTML = html;
}

// loads all data when document or page loaded
document.onload = showData();

// function to add data to local storage

function addData() {
    // if form is validated
    if (validateForm() == true) {
        let name = document.getElementById("nurse-name").value;
        let break_time = document.getElementById("nurse-break").value;
        let break_relief = document.getElementById("break-relief").value;
        let extra_duties = document.getElementById("extra-duties").value;
        let fire_code = document.getElementById("fire-code").value;
        let room1 = document.getElementById("room1").value;
        let patient1 = document.getElementById("patient1").value;
        let room2 = document.getElementById("room2").value;
        let patient2 = document.getElementById("patient2").value;
        let room3 = document.getElementById("room3").value;
        let patient3 = document.getElementById("patient3").value;
        let room4 = document.getElementById("room4").value;
        let patient4 = document.getElementById("patient4").value;
        let room5 = document.getElementById("room5").value;
        let patient5 = document.getElementById("patient5").value;
        let room6 = document.getElementById("room6").value;
        let patient6 = document.getElementById("patient6").value;
        let room7 = document.getElementById("room7").value;
        let patient7 = document.getElementById("patient7").value;
        let room8 = document.getElementById("room8").value;
        let patient8 = document.getElementById("patient8").value;

        let nurseList;
        if (localStorage.getItem("nurseList") == null) {
            nurseList = [];
        }
        else {
            nurseList = JSON.parse(localStorage.getItem("nurseList"));
        }

        nurseList.push
            (
                {
                    name,
                    break_time,
                    break_relief,
                    extra_duties,
                    fire_code,
                    room1,
                    patient1,
                    room2,
                    patient2,
                    room3,
                    patient3,
                    room4,
                    patient4,
                    room5,
                    patient5,
                    room6,
                    patient6,
                    room7,
                    patient7,
                    room8,
                    patient8,
                }
            );
        localStorage.setItem("nurseList", JSON.stringify(nurseList));
        showData();

        document.getElementById("nurse-name").value = "";
        document.getElementById("nurse-break").value = "";
        document.getElementById("break-relief").value = "";
        document.getElementById("extra-duties").value = "";
        document.getElementById("fire-code").value = "";
        document.getElementById("room1").value = "";
        document.getElementById("patient1").value = "";
        document.getElementById("room2").value = "";
        document.getElementById("patient2").value = "";
        document.getElementById("room3").value = "";
        document.getElementById("patient3").value = "";
        document.getElementById("room4").value = "";
        document.getElementById("patient4").value = "";
        document.getElementById("room5").value = "";
        document.getElementById("patient5").value = "";
        document.getElementById("room6").value = "";
        document.getElementById("patient6").value = "";
        document.getElementById("room7").value = "";
        document.getElementById("patient7").value = "";
        document.getElementById("room8").value = "";
        document.getElementById("patient8").value = "";
    }

}

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

    document.getElementById("nurse-name").value = nurseList[index].name;
    document.getElementById("nurse-break").value = nurseList[index].break_time;
    document.getElementById("break-relief").value = nurseList[index].break_relief;
    document.getElementById("extra-duties").value = nurseList[index].extra_duties;
    document.getElementById("fire-code").value = nurseList[index].fire_code;
    document.getElementById("room1").value = nurseList[index].room1;
    document.getElementById("patient1").value = nurseList[index].patient1;
    document.getElementById("room2").value = nurseList[index].room2;
    document.getElementById("patient2").value = nurseList[index].patient2;
    document.getElementById("room3").value = nurseList[index].room3;
    document.getElementById("patient3").value = nurseList[index].patient3;
    document.getElementById("room4").value = nurseList[index].room4;
    document.getElementById("patient4").value = nurseList[index].patient4;
    document.getElementById("room5").value = nurseList[index].room5;
    document.getElementById("patient5").value = nurseList[index].patient5;
    document.getElementById("room6").value = nurseList[index].room6;
    document.getElementById("patient6").value = nurseList[index].patient6;
    document.getElementById("room7").value = nurseList[index].room7;
    document.getElementById("patient7").value = nurseList[index].patient7;
    document.getElementById("room8").value = nurseList[index].room8;
    document.getElementById("patient8").value = nurseList[index].patient8;


    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            nurseList[index].name = document.getElementById("nurse-name").value;
            nurseList[index].break_time = document.getElementById("nurse-break").value;
            nurseList[index].break_relief = document.getElementById("break-relief").value;
            nurseList[index].extra_duties = document.getElementById("extra-duties").value;
            nurseList[index].fire_code = document.getElementById("fire-code").value;
            nurseList[index].room1 = document.getElementById("room1").value;
            nurseList[index].patient1 = document.getElementById("patient1").value;
            nurseList[index].room2 = document.getElementById("room2").value;
            nurseList[index].patient2 = document.getElementById("patient2").value;
            nurseList[index].room3 = document.getElementById("room3").value;
            nurseList[index].patient3 = document.getElementById("patient3").value;
            nurseList[index].room4 = document.getElementById("room4").value;
            nurseList[index].patient4 = document.getElementById("patient4").value;
            nurseList[index].room5 = document.getElementById("room5").value;
            nurseList[index].patient5 = document.getElementById("patient5").value;
            nurseList[index].room6 = document.getElementById("room6").value;
            nurseList[index].patient6 = document.getElementById("patient6").value;
            nurseList[index].room7 = document.getElementById("room7").value;
            nurseList[index].patient7 = document.getElementById("patient7").value;
            nurseList[index].room8 = document.getElementById("room8").value;
            nurseList[index].patient8 = document.getElementById("patient8").value;
            
            showData();
            localStorage.setItem("nurseList", JSON.stringify(nurseList));

            

            document.getElementById("nurse-name").value = "";
            document.getElementById("nurse-break").value = "";
            document.getElementById("break-relief").value = "";
            document.getElementById("extra-duties").value = "";
            document.getElementById("fire-code").value = "";
            document.getElementById("room1").value = "";
            document.getElementById("patient1").value = "";
            document.getElementById("room2").value = "";
            document.getElementById("patient2").value = "";
            document.getElementById("room3").value = "";
            document.getElementById("patient3").value = "";
            document.getElementById("room4").value = "";
            document.getElementById("patient4").value = "";
            document.getElementById("room5").value = "";
            document.getElementById("patient5").value = "";
            document.getElementById("room6").value = "";
            document.getElementById("patient6").value = "";
            document.getElementById("room7").value = "";
            document.getElementById("patient7").value = "";
            document.getElementById("room8").value = "";
            document.getElementById("patient8").value = "";

            //  update button will hide and submit button shows 

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
        
       
    }

}

// view-only display
const final_submit = () => {
    const final_submit_btn = document.getElementById("submit-all-btn");
    const delete_buttons = document.getElementsByClassName("delete-button");
    const edit_buttons = document.getElementsByClassName("edit-button");
    const form_card = document.getElementById("all-cards");
    const dayButton = document.querySelector('.day-button');
    const nightButton = document.querySelector('.night-button');

    dayButton.addEventListener('click', () => {
        dayButton.checked = true;
        nightButton.checked = false;
      });
      
      nightButton.addEventListener('click', () => {
        nightButton.checked = true;
        dayButton.checked = false;
      });
  
    final_submit_btn.addEventListener('click',
  view_only = () => 
      {
        if (dayButton.checked || nightButton.checked) {
            for (let i = 0; i < delete_buttons.length; i++) {
                delete_buttons[i].style.display = "none";
              }
              for (let i = 0; i < edit_buttons.length; i++) {
                edit_buttons[i].style.display = "none";
              }
              form_card.style.display = "none";
              final_submit_btn.style.display = "none";
        }
        else
        {
            swal("Please choose either day or night shift"," " , "error");
        }
  
      }
    )
  }
  
  final_submit();
// // adding Day vs Night shift under the date
// const dayButton = document.querySelector('.day-button');
// const nightButton = document.querySelector('.night-button');
// const shiftText = document.querySelector('#shift-text');

// dayButton.addEventListener('click', function() 
// {
//   shiftText.textContent = "Day Shift";
//   dayButton.style.display = "none";
//   nightButton.style.display = "none";
// });

// nightButton.addEventListener('click', function() 
// {
//   shiftText.textContent = "Night Shift";
//   dayButton.style.display = "none";
//   nightButton.style.display = "none";
// });



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

// const submit_edt  = document.getElementById('edit-button');
// const nurse_name   = document.getElementById('nurse-name');
// const nurse_break  = document.getElementById('nurse-break');
// const break_relief = document.getElementById('break-relief');
// const extra_duties = document.getElementById('extra-duties');
// const fire_code    = document.getElementById('fire-code');

// const room1    = document.getElementById('room1');
// const patient1 = document.getElementById('patient1');
// const room2    = document.getElementById('room2');
// const patient2 = document.getElementById('patient2');
// const room3    = document.getElementById('room3');
// const patient3 = document.getElementById('patient3');
// const room4    = document.getElementById('room4');
// const patient4 = document.getElementById('patient4');



// // Generates a new nurse object based on the data passed in... also provides methods for handling registration of nurses

// const generateNurse = (event) => {
//   //prevents page refresh on submit
//   event.preventDefault();

//   const new_nurse = {
//     name: nurse_name.value,
//     break_time: nurse_break.value,
//     break_relief: break_relief.value,
//     extra_duties: extra_duties.value ?? 'N/A',
//     fire_code: fire_code.value,
//     patients: [
//       {
//         patient_name: patient1.value,
//         room: room1.value
//       },
//       {
//         patient_name: patient2.value,
//         room: room2.value
//       },
//       {
//         patient_name: patient3.value,
//         room: room3.value
//       },
//       {
//         patient_name: patient4.value,
//         room: room4.value
//       }
//     ],
//     register: () => {
//       localStorage.setItem(new_nurse.name, JSON.stringify(new_nurse))
//     },

//     submit_edt:onclick = (e) =>
//     {
//       e.preventDefault();
//         const edit_page = document.getElementById("edit-sheet");
//         const view_page = document.getElementById("view-page");
//         edit_page.style.display = 'none';
//         view_page.style.display = 'block';
//     },
    


//   };


  
// //   console.log(new_nurse);

// //     // Retrieve nurse data from local storage
// //     const nurseData = localStorage.getItem(new_nurse.name);
// //     if (nurseData) {
// //       const nurse = JSON.parse(nurseData);
// //     }
  
// //   // Update view section with nurse data
// // const  updateView = () =>
// // {
// //   const name_view  = document.getElementById('name-view');
// //   const break_view  = document.getElementById('break-view');
// //   const relief_view = document.getElementById('relief-view');
// //   const duties_view = document.getElementById('duties-view');
// //   const code_view   = document.getElementById('code-view');
  
// //   const room1_view    = document.getElementById('rm1');
// //   const patient1_view  = document.getElementById('pt1');
// //   const room2_view     = document.getElementById('rm2');
// //   const patient2_view  = document.getElementById('pt2');
// //   const room3_view     = document.getElementById('rm3');
// //   const patient3_view  = document.getElementById('pt3');
// //   const room4_view     = document.getElementById('rm4');
// //   const patient4_view  = document.getElementById('pt4');
 

// // name_view.textContent = localStorage.getItem('name');
// // break_view.textContent = nurse.break_time;
// // relief_view.textContent = nurse.break_relief;
// // duties_view.textContent = nurse.extra_duties;
// // code_view.textContent = nurse.fire_code;
// // patient1_view.textContent = nurse.patients[0].patient_name;
// // room1_view.textContent = nurse.patients[0].room;
// // patient2_view.textContent = nurse.patients[1].patient_name;
// // room2_view.textContent = nurse.patients[1].room;
// // patient3_view.textContent = nurse.patients[2].patient_name;
// // room3_view.textContent = nurse.patients[2].room;
// // patient4_view.textContent = nurse.patients[3].patient_name;
// // room4_view.textContent = nurse.patients[3].room;
// // }
// // updateView();

// // };
 





// // // Suggested CRUD Functions (all using nurse's name as a key)

// // // Retrieve array of nurses from LocalStorage (assuming they are stored as 'all_nurses')
// // // Takes no arguments and returns an array of Nurse Objects or undefined
// // const getAllNursesFromLS = () =>
// // {
// //   let current_nurses = JSON.parse(localStorage.getItem('all_nurses'))

// //   // if no data exists, force our return to be undefined for better error handling
// //   if (!current_nurses) {
// //     console.log('No Data Available in Local Storage');
// //     return undefined;
// //   }

// //   // otherwise, return the retrieved data as an array
// //   return current_nurses
// // };

// // // Handle the writing of our nurse array back into localStorage
// // // for persistence when we are done operating on it
// // // Takes an array of Nurse Objects to write and has no return
// // const writeAllNursesToLS = (nurse_array) =>
// // {
// //   // Guard clause to protect against bad input
// //   if (!nurse_array) return console.warn('Please provide a valid Nurse Array as input');

// //   try{
// //     localStorage.setItem('all_nurses', JSON.stringify(nurse_array))
// //   }
// //   catch (error) {
// //     console.warn('There was an error writing the supplied data in Local Storage, please refresh your browser and try again')
// //   }
// // }


// // // Create a nurse within the array of nurse info OR update the nurse if it already exists
// // // NOTE: We can't have 2 nurses with the same name
// // // Takes a new Nurse Object and has no return
// // const createNurseLS = (nurse_object) =>
// // {
// //   // Guard clause to protect against bad input
// //   if (!nurse_object) return console.warn('Please provide a valid Nurse Object as input');

// //   // Get nurses from storage or undefined if none are defined yet
// //   const current_nurses = getAllNursesFromLS();

// //   // If the nurse array doesn't exist in storage, write our data as the first index of a new array
// //   if (!current_nurses) {
// //     writeAllNursesToLS([nurse_object])
// //   }

// //   else {
// //     // Set a new variable to track the index of the nurse if we match it in LS data
// //     let nurse_index;

// //     // either gets the current values of the nurse's object if they already exist
// //     // or returns 'undefined' if the nurse isn't in LS data
// //     const existing_nurse = current_nurses.find(
// //       (nurse, index) => {
// //         if (nurse.name === nurse_object.name) {
// //           nurse_index = index;
// //           return nurse
// //         }
// //       }
// //     )

// //     if (existing_nurse) {
// //       // Merge the new data over the old data in case we don't update all fields
// //       // This should update anything new but preserve anything we didn't touch
// //       const merged_nurse = Object.assign(existing_nurse, nurse_object)

// //       // Overwrite the array index containing the original Nurse Data
// //       current_nurses[nurse_index] = merged_nurse
// //       writeAllNursesToLS(current_nurses);
// //     }
// //   }
// // }


// // // Delete a nurse from the array if it exists
// // // takes a name (string) as input, has no return value
// // const deleteNurseLS = (nurse_name) =>
// // {
// //   // Guard clause to protect against bad input
// //   if (!nurse_name) return console.warn('Please provide a valid Nurse\'s name to delete');

// //   // Get nurses from storage or undefined if none are defined yet
// //   const current_nurses = getAllNursesFromLS();

// //   // If the nurse array doesn't exist in storage, return an error
// //   if (!current_nurses) return console.log('Looks like there are no nurses in Local Storage')

// //   // either gets the current values of the nurse's object if they already exist
// //   // or returns 'undefined' if the nurse isn't in LS data
// //   const nurse_to_delete = current_nurses.find(
// //     (nurse, index) => {
// //       if (nurse.name === nurse_object.name) {
// //         nurse_index = index;
// //         return nurse
// //       }
// //     }
// //   )

// //   if (nurse_to_delete) {
// //     // remove the index containing the nurse to delete
// //     delete current_nurses[nurse_index];

// //     // write the updated array to LS
// //     writeAllNursesToLS(current_nurses);
// //   }
// //   else return console.log('Looks like that nurse doesn\'t exist, please check the spelling and try again')
// // }
