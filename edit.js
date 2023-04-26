function displayFullDate() 
{
   const calendar_text = document.getElementById("current-date");
  var now      = new Date();
  var options  = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var fullDate = now.toLocaleDateString('en-US', options);
  calendar_text.innerHTML = fullDate;
}
displayFullDate();

function currentShift ()
{
    const dayNight = document.getElementById("current-shift");
}