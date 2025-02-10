
   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
   import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
   import { getFirestore,collection,getDocs,addDoc,deleteDoc,doc,updateDoc,deleteField
   } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
 
   // Your web app's Firebase configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
   const firebaseConfig = {
     apiKey: "AIzaSyAc5xDvgvLREjAdELfPILjsCuwsTCQDK6o",
     authDomain: "schooldata-8cc38.firebaseapp.com",
     projectId: "schooldata-8cc38",
     storageBucket: "schooldata-8cc38.firebasestorage.app",
     messagingSenderId: "310026387644",
     appId: "1:310026387644:web:1ceb3c66706b1b1ec5d0b9",
     measurementId: "G-121G0W9QQ4"
   };
 
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
   const db = getFirestore(app);


  let addstudent = async () => {
    
    try {
      // Add a document to the "Student Data" collection
      const docRef = await addDoc(collection(db, "Detail"), {
        Std_name: "Asharib",
        Std_age: 43,
      });
  
      console.log("Document written with ID: ", docRef.id);
      console.log("addstudent function called!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  // addstudent();


   let allData = [];

   (async () => {
    try {
      let querySnapshot = await getDocs(collection(db,'Detail' ));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
        allData.push({ id: doc?.id, ...doc?.data() });
      });
      
    } catch (error) {
      console.error(error)
    }}
   )().then(() => {
    allData?.map(std=>{
      document.querySelector(".main").innerHTML += `<div>
      <div>
      <h2>Name:${std?.std_name}</h2>
      <h2>age:${std?.std_age}</h2>
      </div>
      <button key='${std?.id}' onClick='deleteStudent(event)'>delete</button>
      </div>`
    })
  });


   console.log(allData)

  let updateData = async () => {
    try {
      // Reference the document and delete the field
      await updateDoc(doc(db, 'Detail' , 'lmP0MPCUITzCM7CT9agQ'), {
        Std_age: deleteField(),
        Std_name: "Shah" ,// Deleting the field,
        Std_age: 90,
      });
      console.log("Field successfully deleted!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  // updateData();


  let deleteStudent = async (id)=>{
    try {
      await deleteDoc(doc(db, 'Detail',id));
      console.log('Deleted');
    } catch (error) {

      console.error(error);
    }
  }

  // deleteStudent('lmP0MPCUITzCM7CT9agQ');



  
  // async function displayPosts(uid) {
  //     const postsContainer = document.querySelector(".post-list ul");
  //     if (!postsContainer) {
  //         console.error("Posts container not found!");
  //         return;
  //     }
  //     try {
  //         postsContainer.innerHTML = "";
  //         const q = query(collection(db, "posts"), where("uid", "==", uid));
  //         const querySnapshot = await getDocs(q);
  
  //         querySnapshot.forEach((doc) => {
  //             const postData = doc.data();
  //             if (postData.uid === uid) {
  //                 const postElement = document.createElement("li");
  //                 const postId = doc.id
  //                 postElement.innerHTML = `
  //                     <p>${postData.text}</p><br>
  //                     <p>Created at: ${new Date(postData.createdAt).toLocaleString()}</p>
  //                     <p>User ID: ${uid}</p><button id="edit">Edit</button> <button id="delete">Delete</button>`;
  //                 postsContainer.appendChild(postElement);
  //             }
  //         });
  //     } catch (error) {
  //         console.error("Error posts: ", error);
  //     }
  // }
  


  
  // async function displayPosts(uid) {
  //     const postsContainer = document.querySelector(".post-list ul");
  //     if (!postsContainer) {
  //         console.error("Posts container not found!");
  //         return;
  //     }
  //     try {
  //         postsContainer.innerHTML = "";
  //         const q = query(collection(db, "posts"), where("uid", "==", uid));
  //         const querySnapshot = await getDocs(q);
  
  //         querySnapshot.forEach((doc) => {
  //             const postData = doc.data();
  //             const postId = doc.id; // Get Firestore document ID
  
  //             if (postData.uid === uid) {
  //                 const postElement = document.createElement("li");
  //                 postElement.innerHTML = `
  //                     <p>${postData.text}</p><br>
  //                     <p>Created at: ${new Date(postData.createdAt).toLocaleString()}</p>
  //                     <p>User ID: ${uid}</p>
  //                     <button class="edit-btn" data-id="${postId}">Edit</button>
  //                     <button class="delete-btn" data-id="${postId}">Delete</button>`;
  //                 postsContainer.appendChild(postElement);
  //             }
  //         });
  
  //         // Attach event listeners to delete buttons after posts are loaded
  //         document.querySelectorAll(".delete-btn").forEach(button => {
  //             button.addEventListener("click", async (event) => {
  //                 const postId = event.target.dataset.id;
  //                 await deletePost(postId);
  //             });
  //         });
  
  //     } catch (error) {
  //         console.error("Error loading posts: ", error);
  //     }
  // }
  
  // // Function to delete a post
  // async function deletePost(postId) {
  //     if (!postId) return;
  
  //     if (!confirm("Are you sure you want to delete this post?")) return;
  
  //     try {
  //         await deleteDoc(doc(db, "posts", postId)); // Correctly delete the Firestore document
  //         alert("Post deleted successfully!");
  //         displayPosts(auth.currentUser.uid); // Refresh the post list after deletion
  //     } catch (error) {
  //         console.error("Error deleting post:", error);
  //         alert("Error deleting post. Please try again.");
  //     }
  // }