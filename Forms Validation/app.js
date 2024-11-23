
<<<<<<< HEAD
=======


>>>>>>> 26bfb3ec53276c8f57f0fe4ecdb5fe6986be9ca8
  var usernameData = false;

function inputValid(e)
{
  if(e.target.value.length < 3){
    console.log(e.target.nextElementSibling)
    e.target.nextElementSibling.innerText = 'Atleast 3 char required'
    e.target.nextElementSibling.style.display = 'block'
    return;
  }
  e.target.nextElementSibling.style.display = 'none';
  usernameData = true;


}
function submitData(e){
  e.preventDefault();

  var username = document.getElementById('username');
  var password = document.getElementById('password');
<<<<<<< HEAD
  var email = document.getElementById('email');
  var gender = document.querySelector('input[name="gender"]:checked');
  var city = document.getElementById('select').value;

  if(password.value.length < 8){
=======

  if(password.value.length < 11){
>>>>>>> 26bfb3ec53276c8f57f0fe4ecdb5fe6986be9ca8
    console.log(password.nextElementSibling)
    password.nextElementSibling.innerText = 'Weak password'
    return;
  }
  password.nextElementSibling.style.display = 'none'

  if (!usernameData ) return
   
  
var i= 0;
while(i < usersData.length){
  if(usersData[i].username === username.value){
    alert("Username already exist!");
    return;
  }
  i++;
}

  usersData = [...usersData ,   { 
    username: username.value,
    password: password.value,
<<<<<<< HEAD
    email: email.value,
=======
>>>>>>> 26bfb3ec53276c8f57f0fe4ecdb5fe6986be9ca8
    studentId: Math.floor(Math.random() * 100000)
  }
]

  console.log(usersData);

  username.value = ''; 
  password.value = '';
<<<<<<< HEAD
  email.value = '';
=======
>>>>>>> 26bfb3ec53276c8f57f0fe4ecdb5fe6986be9ca8
  usernameData = false;
}

var usersData = [
  {
    username: 'Ali',
    password: '123456789000992',
    studentId:'270176',
  },
  {
    username: 'Asharib',
    password: '1234567890354',
    studentId:'430177',
  },
  {
    username: 'Shoaib',
    password: '33434123123123',
    studentId:'34343',
  },

]


function seeSearch(e){

    var foundUser = false;
    var displayData = document.getElementsByClassName("displayData")[0];

    displayData.innerHTML = '';
    var searchInput = e.target.value.toLowerCase();
    if (searchInput === '') {
<<<<<<< HEAD
      displayData.style.display = 'none';
      return; 
=======
      displayData.style.display = 'none'; // Hide the container
      return; // Stop execution
>>>>>>> 26bfb3ec53276c8f57f0fe4ecdb5fe6986be9ca8
  }

   for (var i = 0 ; i < usersData.length ; i++ ){
    if (usersData[i].username.toLowerCase().includes(searchInput)) {
      foundUser = true;  

    var foundUser = document.createElement("div");
    foundUser.className = "user-found";
    foundUser.innerHTML = `
                      <h3>Username: ${usersData[i].username}</h3> 
                      <h3>Password: ${usersData[i].password} </h3>
<<<<<<< HEAD
                      <h3>Studen ID: ${usersData[i].studentId}</h3>
                      <h3>Email Address: ${usersData[i].email}</h3> `;  
=======
                      <h3>Studen ID: ${usersData[i].studentId}</h3> `;  
>>>>>>> 26bfb3ec53276c8f57f0fe4ecdb5fe6986be9ca8

    displayData.appendChild(foundUser);
      displayData.style.display= "block"
    }
   }

<<<<<<< HEAD
   const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const genderError = document.getElementById("genderError");
    const cityError = document.getElementById("cityError");

=======
>>>>>>> 26bfb3ec53276c8f57f0fe4ecdb5fe6986be9ca8
   if (!foundUser) {

    displayData.innerHTML = "No users found.";
}    
    displayData.style.display = "block";
    foundUser = '' 

<<<<<<< HEAD
    let isValid = true;
    if (!username) {
        usernameError.textContent = "Username is required.";
        isValid = false;
      }
    if (!password) {
        passwordError.textContent = "Password is required.";
        isValid = false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        emailError.textContent = "Enter a valid email.";
        isValid = false;
    }
    if (!gender) {
      genderError.textContent = "Please select your gender.";
      isValid = false;
    }
    if (!city) {
      cityError.textContent = "Please select your city.";
      isValid = false;
    } 

=======
>>>>>>> 26bfb3ec53276c8f57f0fe4ecdb5fe6986be9ca8
}    