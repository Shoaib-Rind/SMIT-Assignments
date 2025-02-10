
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzFNkTRTxKDA4rzLCvVMnQ4UcBo14qpiE",
  authDomain: "facebook-clone-eb203.firebaseapp.com",
  projectId: "facebook-clone-eb203",
  storageBucket: "facebook-clone-eb203.firebasestorage.app",
  messagingSenderId: "814762466292",
  appId: "1:814762466292:web:7f25f2687f573a617ff7a1",
  measurementId: "G-7C7HGYVGY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = 



import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth , db} from "./dashboard.js";
import { addDoc,collection } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

let addUserData = async(user)=>{
try {
  const docRef = await addDoc(collection(db, "users"), {
    email: user.email, 
    phoneNumber: user.phoneNumber, 
    photoURL: user.photoURL, 
    displayName: user.displayName, 
    uid: user.uid,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}

let signUpUser = async(email,password)=>{
  
await createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed up 
  const user = userCredential.user;
  
  console.log('successful login')
  console.log(user)
  addUserData(user).then(()=>{
    localStorage.setItem('loggedInUser', user.uid)
    window.location.replace('./dashboard.html');
  })
  

  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.error(errorCode,errorMessage)
  // ..
});
}


document.querySelector('#signUp-btn').addEventListener('click',()=>{
  var emailValue = document.querySelector('#email').value;
  var passwordValue = document.querySelector('#password').value;
  // console.log(emailValue,passwordValue);
  signUpUser(emailValue,passwordValue);



})