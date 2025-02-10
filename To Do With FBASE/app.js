
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  import { getAuth,signOut,
           createUserWithEmailAndPassword,
           signInWithEmailAndPassword,
           onAuthStateChanged,
          GoogleAuthProvider,
    signInWithPopup, } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import { getFirestore,collection, addDoc , getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAoDA2-yAOgOhDVfXwSHlgSqnC-AlnDTyQ",
    authDomain: "to-do-list-4ad69.firebaseapp.com",
    projectId: "to-do-list-4ad69",
    storageBucket: "to-do-list-4ad69.firebasestorage.app",
    messagingSenderId: "1009605544384",
    appId: "1:1009605544384:web:ef64057e885d3c8edaa025",
    measurementId: "G-XXR7H1N8EQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(); 


  let signUpWithEmailPass = async (email,pass,name,phone) => {
    console.log(email,name,pass,phone);
await createUserWithEmailAndPassword(auth, email, pass)
  .then(async(userCredential) => {
    // Signed up
    const user = userCredential.user;
    // console.log("signed up", user);
     const docRef = await addDoc(collection(db, "users"), {
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: name,
      phoneNumber: phone,
    })
      console.log('success',docRef.id)
      window.location.href = "dashboard.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  let signUpBtn = document.querySelector("#signUp-btn");
  if (signUpBtn) {
    signUpBtn.addEventListener("click", function () {
      let emailValue = document.querySelector("#email").value;
      let passwordValue = document.querySelector("#password").value;
      let nameValue = document.querySelector("#name").value;
      let phoneValue = document.querySelector("#phone").value;
      signUpWithEmailPass(emailValue, passwordValue, nameValue, phoneValue);
    });
  }
});

  document.querySelector("#google-signUp")?.addEventListener("click", async () => {
    try {
      let result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      
      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(userRef);
      let userExists = querySnapshot.docs.some(doc => doc.data().uid === user.uid);
  
      if (!userExists) {
        await addDoc(userRef, {
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber || "",
        });
      }
  
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error(error.code, error.message);
    }
  });
  let logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOutFun();
      window.location.replace("./index.html");
      console.log("Log out Success");
    });
  };


let checkUser = async () => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user);
        // ...
      } else {
        // User is signed out
        console.log("signed out");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

checkUser();

async function signOutFun() { 
  await signOut(auth)
    .then(() => {
      console.log("Logged out");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error(error.message);
    });
}

