const db = firebase.firestore();// Initialize Cloud Firestore and get a reference to the service

var currentUser;
var logged = localStorage.getItem('logged') === 'true'; // Retrieve the value from local storage
var currentGroupID;
let currentGroupListener; // Store reference to the current group listener

document.addEventListener('DOMContentLoaded', function() {
    // Check Auth state and change "logged" value
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            localStorage.setItem('logged', true); // Store the value in local storage
            currentUser = user;
            console.log("user logged in", user);
        } else {
            localStorage.setItem('logged', false); // Store the value in local storage
            currentUser = "";
            console.log("user logged out");
        }
    });

    // Function to check if the user is logged in and handle redirection
    function checkAuthAndRedirect() {
        var hash = window.location.hash.replace("#", "");
        if (localStorage.getItem('logged') === "true") { // if the user is logged in
            switch(hash) {
                case 'loginOrRegister': // when the hash is 'loginOrRegister' redirect to the home page
                    window.location = '#home';
                    break;
                case 'home': // when the hash is 'home' show the menu and update Groups list
                    document.getElementById('dropdownMenu').style.display = "block";//show dropdownMenu
                    UpdateGroups();//Fetch groups and display the group names
                    break;
                case 'settings': // when the hash is 'settings' show the menu and update Settings list
                    document.getElementById('dropdownMenu').style.display = "block";//show dropdownMenu
                    //UpdateSettings();//Fetch groups and display the group names
                    break;
                default:
                    window.location = '#home';   
                    break;
            }
        } else { // if there is no user logged in
            switch(hash) {
                case 'loginOrRegister': 
                    document.getElementById('dropdownMenu').style.display = "none"; // hide dropdownMenu
                    break;
                default:
                    window.location = '#loginOrRegister';    
                    break;
            }
        }
    };

    document.addEventListener('hashchange', checkAuthAndRedirect());

    /**
     * Check all click event and add Listeners
     */
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'register_btn') {
            Register();
        } else if (event.target && event.target.id === 'login_btn') {
            Login();
        } else if (event.target && event.target.id === 'google_login_btn') {
            GoogleLogin();
        } else if (event.target && event.target.id === 'sendMsg') {
            SendMessage();
        } else if (event.target && event.target.id === 'logout') {
            Logout();
        }
    });


    /**
     * Function to logout
     */
    function Logout(){
        firebase.auth().signOut()
            .then(() => {// Sign-out successful.
                console.log("SignOUT successful");
                window.location.href = '#loginOrRegister';
            })
            .catch((error) => {// An error happened.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + ":" + errorMessage);
            });
    }

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
                    window.location = '#';
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
                window.location.href = '#';
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
                window.location = '#';
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
    
    /**
     * Fetch groups
     */
    function UpdateGroups() {
        // Fetch all groups from Firestore
        db.collection("Groups").get()
        .then((querySnapshot) => {
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
                // Stop listening to the previous group messages
                if (currentGroupListener) {
                    currentGroupListener(); // Unsubscribe from previous listener
                }
    
                loadMessagesForGroup(group.id); // Load messages for the new group
                currentGroupID = group.id;
    
                // Start listening to real-time updates for the new group
                currentGroupListener = db.collection("Groups").doc(group.id).collection("Messages")
                    .orderBy("Timestamp", "asc")
                    .onSnapshot(snapshot => {
                        const messages = [];
                        snapshot.forEach(doc => {
                            messages.push(doc.data());
                        });
                        displayMessages(messages);
                    }, error => {
                        console.error('Error fetching messages:', error);
                    });
            });
    
            groupsListContainer.appendChild(groupNameElement);
        });
    }

    /**
     * Function to load messages for a specific group
     * @param {*} groupId
     */
    function loadMessagesForGroup(groupId) {
        db.collection("Groups", ).doc(groupId).collection("Messages").orderBy("Timestamp", "asc").get()
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

        db.collection("Groups", ).doc(currentGroupID).collection("Messages").add({
            Text: messageText,
            Auth: currentUser.email,
            Timestamp: firebase.firestore.Timestamp.now()
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            // Clear the message input field after sending
            messageInput.value = '';
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
    }
});