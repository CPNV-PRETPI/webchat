<?php
?>
<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithPopup} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
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

    if(document.title == ("login or register")){
        document.getElementById("google_login_btn").addEventListener("click", function(){
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                alert("Welcome "+ user.displayName);
                console.log(user);
                window.location = 'index.php?action=home';
                // ...
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
                // ...
            })
        })

        document.getElementById("register_btn").addEventListener("click", function(){
            Email = document.getElementById('register-email').value;
            Password = document.getElementById('register-password').value;
            DisplayName = document.getElementById('register-name').value;

            createUserWithEmailAndPassword(auth, Email, Password)
            .then((credentials)=>{_
                console.log(error.code);
                const user = credentials.user;
                console.log("Welcome " + user.displayName);
                console.log(user);
                //get(child(dbref, 'UserAuthList/' + credentials.user.uid))
                window.location = 'index.php?action=home';
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code, errorMessage);
                console.log(user);
            })
        })

        document.getElementById("login_btn").addEventListener("click", function(){
            Email = document.getElementById('login-email').value;
            Password = document.getElementById('login-password').value;

            createUserWithEmailAndPassword(auth, Email, Password)
            .then((credentials)=>{_
                console.log(error.code);
                const user = credentials.user;
                console.log("Welcome " + user.displayName);
                console.log(user);
                //get(child(dbref, 'UserAuthList/' + credentials.user.uid))
                window.location = 'index.php?action=home';
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code, errorMessage);
                console.log(user);
            })
        })
    }

    //checkifuserislogged
    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log("user logged in", user);
        } else {
            console.log("user logged out");
        }
    });

    document.getElementById("logout").addEventListener("click", function() {
        auth.signOut().then(() => {
            // Sign-out successful.
            console.log("SignOUT successful");
        })
        .catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ":" + errorMessage);
        });
    });
</script>