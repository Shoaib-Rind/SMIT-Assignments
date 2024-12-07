
console.log(JSON.parse(localStorage.getItem('usersData')));


var usersData = JSON.parse(localStorage.getItem('usersData')) || [];


function loginDashboard(email, password){

  // let email = document.getElementById('email').value;
  // let password = document.getElementById('password').value;

  for (let i = 0; i < usersData.length; i++) {
    if(password === usersData[i].password && email === usersData[i].email){
      return usersData[i];
    }
  }
  
  return null;
  // window.location.replace('./index2.html');

}

function submitForm(e){
  e.preventDefault();
  var passValue = document.getElementById("password").value.trim();
  var emailValue = document.getElementById("email").value.trim();

  var isLogin = loginDashboard(emailValue, passValue);

  // var isLogin = searchData({password: passValue,email: emailValue,})

  if(isLogin){
    console.log(isLogin)
    localStorage.setItem('login',JSON.stringify(isLogin));
    window.location.replace('./index2.html')

  }else {
    alert("Invalid email or password.");

}
}
   

document.getElementById('loginForm').addEventListener('submit', submitForm);

