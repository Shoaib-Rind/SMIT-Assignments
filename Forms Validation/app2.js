
var usersData = JSON.parse(localStorage.getItem('users'));


function loginDashboard(email, password){

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  for (let i = 0; i < usersData.length; i++) {
    if(password === usersData[i].password && email === usersData[i].email){
      return usersData[i];
    }
  }
  
  window.location.replace('./index2.html');

}

function submitForm(e){
  e.preventDefault();
  var passValue = document.getElementById("password").value;
  var emailValue = document.getElementById("email").value;

  var isLogin = searchData({password: passValue,email: emailValue,})
  if(isLogin){
    console.log(isLogin)
    localStorage.setItem('login',JSON.stringify(isLogin));
    window.location.replace('./dashboard.html')
  }


}