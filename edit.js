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


// adding Day vs Night shift under the date
// Get the day and night buttons and the shift text element
const dayButton = document.querySelector('.day-button');
const nightButton = document.querySelector('.night-button');
const shiftText = document.querySelector('#shift-text');

// Add a click event listener to the day button
dayButton.addEventListener('click', function() {
  shiftText.textContent = "Day Shift";
  
  // Hide the day and night buttons
  dayButton.style.display = "none";
  nightButton.style.display = "none";
});
nightButton.addEventListener('click', function() {
  shiftText.textContent = "Night Shift";
  
  // Hide the day and night buttons
  dayButton.style.display = "none";
  nightButton.style.display = "none";
});
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

