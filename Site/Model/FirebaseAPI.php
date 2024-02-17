<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithPopup} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
    import { } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
    import { } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js'
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyCifeOqiGEP-pOkjrr3EaXUVymT26H-eGk",
    authDomain: "webchat-f8f06.firebaseapp.com",
    projectId: "webchat-f8f06",
    storageBucket: "webchat-f8f06.appspot.com",
    messagingSenderId: "20371840878",
    appId: "1:20371840878:web:d4383c9bb3bcaeda17eb7f"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // Register a listener for authentication state changes
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            console.log("User is signed in:", user);
        } else {
            // User is signed out
            console.log("User is signed out");
        }
        updateUserAccount(user); // Update the user account info
        updateMenu(user);// Update the Menu Items
    });

    // Define a function to update the user account information
    function updateUserAccount(user) {
        if (user != null) {
            // If user is signed in, update the display name
            document.getElementById('displayName').textContent = user.displayName;
            document.getElementById('userAccount').style.display = 'block';
        } else {
            // If user is signed out, clear the display name
            document.getElementById('displayName').textContent = '';
            document.getElementById('userAccount').style.display = 'none';
        }
    }

    function updateMenu(user){
        if (user != null) {
            document.getElementById('loginOrRegister').style.display = 'none';
            document.getElementById('logout').style.display = 'block';
        } else {
            document.getElementById('loginOrRegister').style.display = 'block';
            document.getElementById('logout').style.display = 'none';
        }
    }

    if(document.title=="login or register"){
        document.getElementById("google-login").addEventListener("click", function() {
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                window.location = 'index.php?action=home';
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + ":" + errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        });
        
        document.getElementById("login").addEventListener("click", function() {
            signInWithEmailAndPassword(auth, document.getElementById("login-email").textContent, document.getElementById("login-psw").textContent)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        });

        document.getElementById("register").addEventListener("click", function() {
            createUserWithEmailAndPassword(auth, document.getElementById("register-email").textContent, document.getElementById("register-psw").textContent)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        });
        
    }

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