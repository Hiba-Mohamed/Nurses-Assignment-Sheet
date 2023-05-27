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
login_direct.onclick = () =>
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
            swal("Please fill-in nurse's name"," " , "error");
            return false;
        case (break_time === ""):
            swal("Please fill-in nurse's break"," " , "error");
            return false;
        case (fire_code === ""):
            swal("Please fill-in fire code"," " , "error");
            return false;
        case (break_relief === ""):
            swal("Please fill-in nurse's relief"," " , "error");
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
      let room1 = element.room1 && element.room1 !== '' ? '<p><strong>Room :</strong> ' + element.room1 + ' - ' + element.patient1 + '</p>' : '';
      let room2 = element.room2 && element.room2 !== '' ? '<p><strong>Room :</strong> ' + element.room2 + ' - ' + element.patient2 + '</p>' : '';
      let room3 = element.room3 && element.room3 !== '' ? '<p><strong>Room :</strong> ' + element.room3 + ' - ' + element.patient3 + '</p>' : '';
      let room4 = element.room4 && element.room4 !== '' ? '<p><strong>Room :</strong> ' + element.room4 + ' - ' + element.patient4 + '</p>' : '';
      let room5 = element.room5 && element.room5 !== '' ? '<p><strong>Room :</strong> ' + element.room5 + ' - ' + element.patient5 + '</p>' : '';
      let room6 = element.room6 && element.room6 !== '' ? '<p><strong>Room :</strong> ' + element.room6 + ' - ' + element.patient6 + '</p>' : '';
      let room7 = element.room7 && element.room7 !== '' ? '<p><strong>Room :</strong> ' + element.room7 + ' - ' + element.patient7 + '</p>' : '';
      let room8 = element.room8 && element.room8 !== '' ? '<p><strong>Room :</strong> ' + element.room8 + ' - ' + element.patient8 + '</p>' : '';
  
      newDiv.innerHTML = '<p><strong>Name:</strong> ' + element.name + '</p>' +
        '<p><strong>Break:</strong> ' + element.break_time + '</p><p><strong>Relief:</strong> ' + element.break_relief + '</p>' +
        '<p><strong>Extra Duties:</strong> <span style="color:red">' + element.extra_duties + '</span></p>' +
        '<p><strong>Fire Code:</strong> <span style="color:red">' + element.fire_code + '</span></p>' +
        room1 + room2 + room3 + room4 + room5 + room6 + room7 + room8 +
        '<div class=\'button-wrapper\'>' +
        '<button onclick="deleteData(' + index + ')" class="delete-button">Delete</button>' +
        '<button onclick="updateData(' + index + ')" class="edit-button">Edit</button>' +
        '</div>';
  
      newDiv.classList.add('nurse-info');
  
      // Check the checkboxes for day shift and night shift
      const dayShiftCheckbox = document.getElementById("dayShift");
      const nightShiftCheckbox = document.getElementById("nightShift");
  
      if (dayShiftCheckbox.checked) {
        // Append the newly created card to the day shift cards container
        dayCardsContainer.appendChild(newDiv);
      } else if (nightShiftCheckbox.checked) {
        // Append the newly created card to the night shift cards container
        nightCardsContainer.appendChild(newDiv);
      }
    });
  };
  
  // clear local storage when page loads
  window.addEventListener('load', function() {
    // Clear the local storage
    localStorage.clear();
    console.log('Local storage has been reset.');});

// function to add data to local storage

const addData = () => {

  
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

   //  validating nurse name to ensure no duplicates
   if (nurseList.some(nurse => nurse.name === name)) 
   {
    swal("Duplicate nurse name detected. Please enter a unique nurse name.", " ", "error");
     return; // Exit the function if there's a duplicate nurse name
 }
 
        nurseList.push
            (
                {
                    name,
                    break_time,
                    break_relief,
                    extra_duties,
                    fire_code,
                    patients: [
                      {
                        // Unique name across all Nurse Objects' Patient Data
                        patient_name: [],
                        // unique number between0 and 10000
                        room_number: [],
                      }]
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
  // Working as of 05/23 6:30PM
  const final_submit1 = () => {
    const final_submit_btn = document.getElementById("submit-all-btn");
    const form_card        = document.querySelector(".info-card");
    const buttons = document.querySelectorAll(".button-wrapper")

    form_card.style.display = "none";
    final_submit_btn.style.display = "none";

    for (let i = 0; i < buttons.length; i++)
    {
      buttons[i].style.display = "none";
    }
  }

  const sample_nurse_data = {
    name: 'unique_name',
    break_relief:'validated_other_nurse_name',
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
  const validatePatients = (patient_array) =>
  {
    // Retreive stored nurse objects
    // Generate a single array containing all patient data from all nurse objects
    // Loop through the patient_array passed in from validation data
      // check if the current index of the new patient data matches any of the other patients
        // check based on name && room number
  }