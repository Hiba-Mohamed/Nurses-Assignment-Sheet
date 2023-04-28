// current date function
function displayFullDate() 
{
   const calendar_text = document.getElementById("current-date");
  var now      = new Date();
  var options  = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var fullDate = now.toLocaleDateString('en-US', options);
  calendar_text.innerHTML = fullDate;
}
displayFullDate();

// displaying Day/night shift using input from edit page
const shift_text = document.getElementById("shift-text");
const day_night = localStorage.getItem('Shift');
const shift_display = shift_text.innerHTML = day_night;


// displaying all input data from the saved in local storage in view page
const nurse_text = document.getElementById("nurse-name");
const nurse_name = localStorage.getItem('Nurse name');
const nurse_display = nurse_text.innerHTML = nurse_name;

const break_text = document.getElementById("nurse-break");
const nurse_break = localStorage.getItem('Nurse break');
const break_display = break_text.innerHTML = nurse_break;

const relief_text = document.getElementById("nurse-relief");
const nurse_relief = localStorage.getItem('Nurse relief');
const relief_display = relief_text.innerHTML = nurse_relief;

const duties_text = document.getElementById("extra-duties");
const nurse_duties = localStorage.getItem('Extra duties');
const duties_display = duties_text.innerHTML = nurse_duties;

const fire_text = document.getElementById("fire-code");
const fire_code = localStorage.getItem('Fire code');
const fire_display = fire_text.innerHTML = fire_code ;

const room1_text = document.getElementById("room1");
const room1 = localStorage.getItem('Room 1');
const room1_display = room1_text.innerHTML = room1;

const patient1_text = document.getElementById("patient1");
const patient1 = localStorage.getItem('Patient 1');
const patient1_display = patient1_text.innerHTML = patient1;

const room2_text = document.getElementById("room2");
const room2 = localStorage.getItem('Room 2');
const room2_display = room2_text.innerHTML = room2;

const patient2_text = document.getElementById("patient2");
const patient2 = localStorage.getItem('Patient 2');
const patient2_display = patient2_text.innerHTML = patient2;

const room3_text = document.getElementById("room3");
const room3 = localStorage.getItem('Room 3');
const room3_display = room3_text.innerHTML = room3;

const patient3_text = document.getElementById("patient3");
const patient3 = localStorage.getItem('Patient 3');
const patient3_display = patient3_text.innerHTML = patient3;

const room4_text = document.getElementById("room4");
const room4 = localStorage.getItem('Room 4');
const room4_display = room4_text.innerHTML = room4;

const patient4_text = document.getElementById("patient4");
const patient4 = localStorage.getItem('Patient 4');
const patient4_display = patient4_text.innerHTML = patient4;
