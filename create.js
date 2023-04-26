const submit_button = document.querySelector(".button");
submit_button.onclick = (e) => 
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
}