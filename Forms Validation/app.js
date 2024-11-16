


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

  if(password.value.length < 11){
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
    studentId: Math.floor(Math.random() * 100000)
  }
]

  console.log(usersData);

  username.value = ''; 
  password.value = '';
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
      displayData.style.display = 'none'; // Hide the container
      return; // Stop execution
  }

   for (var i = 0 ; i < usersData.length ; i++ ){
    if (usersData[i].username.toLowerCase().includes(searchInput)) {
      foundUser = true;  

    var foundUser = document.createElement("div");
    foundUser.className = "user-found";
    foundUser.innerHTML = `
                      <h3>Username: ${usersData[i].username}</h3> 
                      <h3>Password: ${usersData[i].password} </h3>
                      <h3>Studen ID: ${usersData[i].studentId}</h3> `;  

    displayData.appendChild(foundUser);
      displayData.style.display= "block"
    }
   }

   if (!foundUser) {

    displayData.innerHTML = "No users found.";
}    
    displayData.style.display = "block";
    foundUser = '' 

}    