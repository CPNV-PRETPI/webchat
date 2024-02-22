// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithPopup} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
import { getDatabase, set, ref, child } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js'
import { } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCifeOqiGEP-pOkjrr3EaXUVymT26H-eGk",
    authDomain: "webchat-f8f06.firebaseapp.com",
    databaseURL: "https://webchat-f8f06-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "webchat-f8f06",
    storageBucket: "webchat-f8f06.appspot.com",
    messagingSenderId: "20371840878",
    appId: "1:20371840878:web:d4383c9bb3bcaeda17eb7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
logged = null;

if(document.title == ("home")){

}

if(document.title == ("login or register")){

    document.getElementById("register_btn").addEventListener("click", Register)

    document.getElementById("login_btn").addEventListener("click", Login)

    document.getElementById("google_login_btn").addEventListener("click", GoogleLogin)
}

/**
 * Register
 */
function Register(){
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    var userName = document.getElementById('register-name').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{
        const user = result.user;
        console.log(user);
    })
    .then(function () {
        user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: userName,
            photoURL: "https://lh3.googleusercontent.com/a/ACg8ocJahWUBU_uY34LBhei3N8-neSeQsYCFrZmi1hXMLQwOGOw=s96-c"
        })
        .then(function() {
            // Update successful.
            window.location = 'index.php?action=home';
        })
        .catch((error)=>{// An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
    })
    .catch((error)=>{// An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    })
}

/**
 * Login
 */
function Login(){
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((result)=>{
        const user = result.user;
        console.log(user);
        window.location.href = 'index.php?action=home';
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code, errorMessage);
    })
}

/**
 * Google login
 */
function GoogleLogin(){
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);        
        window.location = 'index.php?action=home';
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    })
}

document.getElementById("logout").addEventListener("click", function() {
    auth.signOut()
    .then(() => {// Sign-out successful.
        console.log("SignOUT successful");
        window.location.href = 'index.php?action=loginOrRegister';
    })
    .catch((error) => {// An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ":" + errorMessage);
    });
});

//check Auth state
auth.onAuthStateChanged(function(user) {
    if (user) {
        logged = true;
        console.log("user logged in", user);
    } else {
        logged = false
        console.log("user logged out");
    }
});