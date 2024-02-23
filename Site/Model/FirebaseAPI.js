// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signInWithPopup} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, serverTimestamp, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
//import { getDatabase, set, ref, child } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js'
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
//const database = getDatabase();
const db = getFirestore(app);// Reference to the Firestore database
const groupsRef = collection(db, "Groups");// Reference to the Firestore database collection "Groups"
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
var currentUser;
var logged;
var currentGroupID;

//check Auth state and change "logged" value
auth.onAuthStateChanged(function(user) {
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
    if(document.title == ("home")){
        if(!logged){
            window.location = 'index.php?action=loginOrRegister';
        }
    }
});

/**
 * Check if it's the "login or register" page and add Listeners
 */
if(document.title == ("login or register")){

    document.getElementById("register_btn").addEventListener("click", Register);

    document.getElementById("login_btn").addEventListener("click", Login);

    document.getElementById("google_login_btn").addEventListener("click", GoogleLogin);
}

/**
 * Check if it's the "home" page, add Listeners and update the groups/messages
 */
if(document.title == ("home")){
    
    UpdateGroups();//Fetch groups and display the group names

    document.getElementById('sendMsg').addEventListener('click', SendMessage)// Add click event listener to the send button
}

/**
 * Function to register
 */
function Register(){
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    var userName = document.getElementById('register-name').value;
    var user;

    createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{
        user = result.user;
        console.log("Registered")
    })
    .then(function () {
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
 * Function to login with email and password
 */
function Login(){
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((result)=>{
        var user = result.user;
        console.log("Logged in")
        window.location.href = 'index.php?action=home';
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code, errorMessage);
    })
}

/**
 * Function to login with Google
 */
function GoogleLogin(){
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("Logged in with Google")
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

/**
 * Function to send a message to the current group
 * @returns 
 */
function SendMessage() {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim(); // Trim whitespace

    if (messageText === '') {
        // If the message is empty, do nothing
        return;
    }

    const groupRef = doc(db, 'Groups', currentGroupID);
    const messagesRef = collection(groupRef, 'Messages');

    try {
        addDoc(messagesRef, {
            Text: messageText,
            Auth: currentUser.email,
            Timestamp: serverTimestamp()
        });

        console.log('Message sent successfully!');
        // Clear the message input field after sending
        messageInput.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

/**
 * Fetch groups
 */
function UpdateGroups(){
    // Fetch all groups from Firestore
    getDocs(groupsRef)
    .then(querySnapshot => {
        const groups = [];
        querySnapshot.forEach(doc => {
            groups.push({ id: doc.id, ...doc.data() });
        });
        displayGroupNames(groups);
    })
    .catch(error => {
        console.error('Error getting groups:', error);
    });
}

/**
 * Function to display group names
 * @param {*} groups 
 */
function displayGroupNames(groups) {
    const groupsListContainer = document.getElementById('groupsList');

    groups.forEach(group => {
        const groupNameElement = document.createElement('div');
        groupNameElement.textContent = group.Name;
        groupNameElement.classList.add('group-name');

        // Add click event listener to load messages for the clicked group
        groupNameElement.addEventListener('click', () => {
            loadMessagesForGroup(group.id);
            currentGroupID = group.id;
        });

        groupsListContainer.appendChild(groupNameElement);
    });
}

/**
 * Function to load messages for a specific group
 * @param {*} groupId 
 */
function loadMessagesForGroup(groupId) {
    const groupRef = collection(db, "Groups", groupId, "Messages");

    getDocs(groupRef)
    .then(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(doc => {
            messages.push(doc.data());
        });
        displayMessages(messages);
    })
    .catch(error => {
        console.log('Error getting documents:', error);
    });
}

/**
 * Function to display messages
 * @param {*} messages 
 */
function displayMessages(messages) {
    const messagesContainer = document.getElementById('messagesList');
    messagesContainer.innerHTML = ''; // Clear previous messages

    messages.forEach(message => {
        const messageElement1 = document.createElement('div');
        messageElement1.classList.add('info');

        const messageElement2 = document.createElement('div');
        messageElement2.classList.add('message');

        const messageAuth = document.createElement('div');
        messageAuth.classList.add('messageAuth');
        messageAuth.textContent = message.Auth;

        const messageTimestamp = document.createElement('div');
        messageTimestamp.classList.add('messageTimestamp');
        messageTimestamp.textContent = new Date(message.Timestamp.toDate()).toLocaleString();

        const messageText = document.createElement('div');
        messageText.textContent = message.Text;

        // Append message content to message element
        messageElement1.appendChild(messageAuth);
        messageElement1.appendChild(messageTimestamp);
        messageElement2.appendChild(messageText);

        // Append message element to messages container
        messagesContainer.appendChild(messageElement1);
        messagesContainer.appendChild(messageElement2);
    });
}