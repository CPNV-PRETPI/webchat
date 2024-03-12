var currentUser;
var logged;
var currentGroupID;

//check Auth state and change "logged" value
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        logged = true;
        currentUser = user;
        console.log("user logged in", user);
    } else {
        logged = false;
        currentUser = "";
        console.log("user logged out");
    }

    //Check if it's the "home" page and redirect if not connected
    if (document.title == ("home")) {
        if (!logged) {
            window.location = 'index.php?action=loginOrRegister';
        }
    }
});

/**
 * Check if it's the "login or register" page and add Listeners
 */
if (document.title == ("login or register")) {

    document.getElementById("register_btn").addEventListener("click", Register);

    document.getElementById("login_btn").addEventListener("click", Login);

    document.getElementById("google_login_btn").addEventListener("click", GoogleLogin);
}

/**
 * Check if it's the "home" page, add Listeners and update the groups/messages
 */
if (document.title == ("home")) {

    UpdateGroups();//Fetch groups and display the group names

    document.getElementById('sendMsg').addEventListener('click', SendMessage)// Add click event listener to the send button
}

document.getElementById("logout").addEventListener("click", function () {
    firebase.auth().signOut()
        .then(() => {// Sign-out successful.
            console.log("SignOUT successful");
            window.location.href = '?action=loginOrRegister';
        })
        .catch((error) => {// An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ":" + errorMessage);
        });
});

/**
 * Function to register
 */
function Register() {
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    var userName = document.getElementById('register-name').value;
    var user;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            user = result.user;
            console.log("Registered")
        })
        .then(function () {
            user.updateProfile({
                displayName: userName,
                photoURL: "https://lh3.googleusercontent.com/a/ACg8ocJahWUBU_uY34LBhei3N8-neSeQsYCFrZmi1hXMLQwOGOw=s96-c"
            })
                .then(function () {
                    // Update successful.
                    window.location = '?action=home';
                })
                .catch((error) => {// An error happened.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                })
        })
        .catch((error) => {// An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
}

/**
 * Function to login with email and password
 */
function Login() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            var user = result.user;
            console.log("Logged in")
            window.location.href = '?action=home';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code, errorMessage);
        })
}

/**
 * Function to login with Google
 */
function GoogleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("Logged in with Google")
            window.location = '?action=home';
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