
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc ,updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { query, where ,orderBy  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
const firebaseConfig = {
    apiKey: "AIzaSyAoDA2-yAOgOhDVfXwSHlgSqnC-AlnDTyQ", 
    authDomain: "to-do-list-4ad69.firebaseapp.com",
    projectId: "to-do-list-4ad69",
    storageBucket: "to-do-list-4ad69.firebasestorage.app",
    messagingSenderId: "1009605544384",
    appId: "1:1009605544384:web:ef64057e885d3c8edaa025",
    measurementId: "G-XXR7H1N8EQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
    if (!user) {
        localStorage.removeItem("loggedInUser");
        window.location.replace("./index.html");
        return;
    }

    const uid = user.uid;
    localStorage.setItem("loggedInUser", uid);
    getUserData(uid);
    displayPosts(uid);
    displayAllPosts();
    console.log("UID:", uid);});

    document.addEventListener('DOMContentLoaded', function () {
        
        const postButton = document.querySelector("#post");
        if (postButton) {
            postButton.addEventListener('click', async () => {
                let postContent = document.querySelector("#createPost").value;
    
                if (postContent.trim() === "") {
                    return;
                }
                try {
                    let date = new Date();
                    await addDoc(collection(db, "posts"), {
                        text: postContent,
                        createdAt: date.getTime(),
                        uid: auth.currentUser.uid 
                    });
    
                    document.querySelector("#createPost").value = "";
                    alert("Post created!");
                    if (auth.currentUser) {
                        displayPosts(auth.currentUser.uid);
                    }
                    displayAllPosts();
    
                } catch (error) {
                    console.error("Error creating post: ", error);
                    alert("Error. Please try again later.");
                }
            });
        } else {
            console.error("Post button not found!");
        }
    
        
        let logoutBtn1 = document.querySelector("#logout-btn1");
        if (logoutBtn1) {
            logoutBtn1.addEventListener("click", async () => {
                try {
                    await signOut(auth);
                    localStorage.removeItem("loggedInUser");
                    console.log("Logout successful");
                    window.location.replace("./index.html");
                } catch (error) {
                    console.error("Error signing out", error);
                }
            });
        } else {
            console.error("Logout button not found!");
        }
    });
    


async function displayAllPosts() {
    const allPostsContainer = document.getElementById("allPostsContainer");
    if (!allPostsContainer) {
        console.error("All posts container not found!");
        return;
    }

    allPostsContainer.innerHTML = "";

    try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            postElement.innerHTML = `
                <div class="post-content">${postData.text}</div><br>
                <div class="post-meta">
                User ID: ${postData.uid}
                <br>Posted at: ${new Date(postData.createdAt).toLocaleString()}</div>`;

            allPostsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error getting posts: ", error);
    }
}

async function getUserData(uid) {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User Data:", userData);
            const userNameElement = document.querySelector("#user-name");
            if (userNameElement) {
                userNameElement.textContent = userData.displayName || "User";
            }
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting user data:", error);
    }
}

async function updatePost(postId, newText) {
    if (!postId || !newText.trim()) {
        console.error("Invalid post ID or empty text.");
        return;
    }

    try {
        await updateDoc(doc(db, "posts", postId), {
            text: newText
        });
        alert("Post updated successfully!");
        displayPosts(auth.currentUser.uid); 
    } catch (error) {
        console.error("Error updating post:", error);
        alert("Error updating post. Please try again.");
    }
}

async function displayPosts(uid) {
    const postsContainer = document.querySelector(".post-list ul");
    if (!postsContainer) {
        console.error("Posts container not found!");
        return;
    }
    try {
        postsContainer.innerHTML = "";
        const q = query(collection(db, "posts"), where("uid", "==", uid), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            const postId = doc.id; 

            if (postData.uid === uid) {
                const postElement = document.createElement("li");
                postElement.innerHTML = `
                    <p class="post-text">${postData.text}</p>
                    <input type="text" class="edit-input" value="${postData.text}" style="display: none;">
                    <br>
                    <p>Created at: ${new Date(postData.createdAt).toLocaleString()}</p>
                    <p>User ID: ${uid}</p>
                    <button class="edit-btn" data-id="${postId}">Edit</button>
                    <button class="save-btn" data-id="${postId}" style="display: none;">Save</button>
                    <button class="delete-btn" data-id="${postId}">Delete</button>`;

                postsContainer.appendChild(postElement);
            }
        });

        
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const postElement = event.target.closest("li");
                const textElement = postElement.querySelector(".post-text");
                const inputElement = postElement.querySelector(".edit-input");
                const saveButton = postElement.querySelector(".save-btn");

                
                textElement.style.display = "none";
                inputElement.style.display = "block";
                saveButton.style.display = "inline-block";
                event.target.style.display = "none";
            });
        });

        
        document.querySelectorAll(".save-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                const postElement = event.target.closest("li");
                const inputElement = postElement.querySelector(".edit-input");
                const postId = event.target.dataset.id;

                await updatePost(postId, inputElement.value);
            });
        });

        
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                const postId = event.target.dataset.id;
                await deletePost(postId);
            });
        });

    } catch (error) {
        console.error("Error loading posts: ", error);
    }
}

async function deletePost(postId) {
    if (!postId) return;

    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
        await deleteDoc(doc(db, "posts", postId));
        alert("Post deleted successfully!");
        displayPosts(auth.currentUser.uid); // Refresh the post list after deletion
    } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post. Please try again.");
    }
}