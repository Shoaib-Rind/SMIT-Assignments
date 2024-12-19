
// var loggedInUser = JSON.parse(localStorage.getItem('login'));

// if (loggedInUser) {
  
//   window.location.replace('./index2.html');
//   document.getElementById('printName').innerText = showName.username;
// }


function loginPage(e){

   window.location.replace('./dashboard.html');

}

 
var usernameData = false;

function inputValid(e) {
  if (e.target.value.length < 3) {
    e.target.nextElementSibling.innerText = 'At least 3 characters required';
    e.target.nextElementSibling.style.display = 'block';
    return;
  }
  e.target.nextElementSibling.style.display = 'none';
  usernameData = true;
}

function passCheck(e) {
  if (e.target.value.length < 8) {
    e.target.nextElementSibling.innerText = 'Weak Password ( Max 8 Char required )';
    e.target.nextElementSibling.style.display = 'block';
    return;
  }
  e.target.nextElementSibling.style.display = 'none';
  usernameData = true;
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


function submitData(e) {
  e.preventDefault();

  var username = document.getElementById('username');
  var password = document.getElementById('password');
  var email = document.getElementById('email');
  var gender = document.querySelector('input[name="gender"]:checked');
  var city = document.getElementById('select').value;

  
  let isValid = true;

  if (!validateEmail(email.value)) {
    document.getElementById('emailError').innerText = 'Enter a valid email.';
    isValid = false;
  }

  if (!gender) {
    document.getElementById('genderError').innerText = 'Please select your gender.';
    isValid = false;
  }

  if (!city) {
    document.getElementById('cityError').innerText = 'Please select your city.';
    isValid = false;
  }

  if (!isValid) return;
  
  
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].username.toLocaleLowerCase() === username.value) {
      alert('Username already exists!');
      return;
    }

    if (usersData[i].email.toLowerCase() === email.value.toLowerCase()) {
      alert('Email already exists!');
      return;
    }
  }


  usersData.push({
    username: username.value,
    password: password.value,
    email: email.value,
    studentId: Math.floor(Math.random() * 100000),
  });

  saveData()
  console.log(usersData);

  
  username.value = '';
  password.value = '';
  email.value = '';
  if (gender) gender.checked = false;
  document.getElementById('select').value = '';
  usernameData = false;

  alert("Data Submitted Sucessfully")

  window.location.replace('./dashboard.html');
}

var usersData = JSON.parse(localStorage.getItem('usersData')) || [
  { username: 'Ali', password: '123456789000992', email: 'Ali@example.com', studentId: '270176' },
  { username: 'Asharib', password: '1234567890354', email: 'Asharib@example.com', studentId: '430177' },
  { username: 'Shoaib', password: '33434123123123', email: 'Shoaib@example.com', studentId: '34343' },
];

function seeSearch(e) {
  var displayData = document.getElementsByClassName('displayData')[0];
  displayData.innerHTML = '';
  var searchInput = e.target.value.toLowerCase();

  if (searchInput === '') {
    displayData.style.display = 'none';
    return;
  }

  let foundUser = false;
  for (var i = 0; i < usersData.length; i++) {
    if (usersData[i].username.toLowerCase().includes(searchInput)) {
      foundUser = true;

      var userElement = document.createElement('div');
      userElement.className = 'user-found';
      userElement.innerHTML = `
        <h3>Username: ${usersData[i].username}</h3>
        <h3>Student ID: ${usersData[i].studentId}</h3>
        <h3>Email Address: ${usersData[i].email}</h3>`;
      displayData.appendChild(userElement);
    }
  }

  if (!foundUser) {
    displayData.innerHTML = 'No users found.';
  }

  displayData.style.display = foundUser ? 'block' : 'none';
}

function saveData() {
  localStorage.setItem('usersData', JSON.stringify(usersData))
  console.log(usersData)
  
}


function loginDashboard(){

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  for (let i = 0; i < usersData.length; i++) {
    if(password === usersData[i].password && email === usersData[i].email){
      localStorage.setItem('login', JSON.stringify(usersData[i]));
      return usersData[i];
    }
  }
  
}