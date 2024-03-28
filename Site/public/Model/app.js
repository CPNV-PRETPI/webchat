const db = firebase.firestore();// Initialize Cloud Firestore and get a reference to the service

var currentUser;
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

    function checkHashAndUpdate(){
        var hash = window.location.hash.replace("#", "");
        switch(hash){
            case "home":
                UpdateGroups();//Fetch groups and display the group names
                break;
            case "profile":
                updateProfileSettings();//Fetch profile settings property and display them
                break;
        }
    }

    window.addEventListener('hashchange', checkHashAndUpdate());

    /**
     * Add listener to all click event and call the correct function by checking the target id
     */
    document.addEventListener('click', function(event) {
        // Check if the clicked element has an id
        if (event.target && event.target.id) {
            const targetId = event.target.id;
            switch (targetId) {
                case 'register_btn':
                    Register();
                    break;
                case 'login_btn':
                    Login();
                    break;
                case 'google_login_btn':
                    GoogleLogin();
                    break;
                case 'sendMsg':
                    SendMessage();
                    break;
                case 'logout':
                    Logout();
                    break;
                default:
                    // If the clicked element is not one of the specific buttons, check for dropdown menu buttons
                    if (targetId === 'menuButton') {
                        // Toggle dropdown menu
                        toggleDropdownMenu(event.target);
                    } else {
                        // Close all dropdown menus when clicking outside
                        document.querySelectorAll('.dropdownMenu').forEach(menu => {
                            if (!menu.contains(event.target)) {
                                menu.style.display = 'none';
                            }
                        });
                    }
                    break;
            }
        }
    });

    // Add event listener to the input field for sending message when "Enter" key is pressed
    document.addEventListener("keydown", function(event) {
        if (event.target) {
            switch (event.target.id) {
                case 'messageInput':
                    if (event.key === "Enter") { SendMessage(); }
                    break;
            }
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

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                var user = result.user;
                user.updateProfile({
                    displayName: userName,
                    photoURL: "https://lh3.googleusercontent.com/a/ACg8ocJahWUBU_uY34LBhei3N8-neSeQsYCFrZmi1hXMLQwOGOw=s96-c"
                })
                .then(function () {
                    // Update successful.
                    window.location = '#home';
                })
                .catch((error) => {// An error happened.
                    console.log(error);
                })
                console.log("Registered")
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
                window.location.href = '#home';
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
                const credential = result.credential;
                const token = credential.accessToken;
                // The signed-in user info.
                console.log("Logged in with Google")
                window.location = '#home';
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
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

            if (message.Auth === currentUser.email) { // Check if the author of the message is the current user
                // Create a button with three dots as a menu trigger
                const menuButton = document.createElement('button');
                menuButton.classList.add('menuButton');
                menuButton.innerHTML = '&#x22EE;'; // Unicode character for three dots (ellipsis)
                menuButton.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent click event from bubbling to message element
                    toggleDropdownMenu(menuButton); // Toggle dropdown menu
                });
    
                // Create a dropdown menu
                const dropdownMenu = document.createElement('div');
                dropdownMenu.classList.add('dropdownMenu');
                dropdownMenu.innerHTML = `
                    <button class="dropdownItem">Delete</button>
                    <button class="dropdownItem">Modify</button>
                    <button class="dropdownItem">Respond</button>
                `;
                dropdownMenu.style.display = 'none'; // Hide dropdown menu by default
    
                // Append message content to message element
                messageElement1.appendChild(messageAuth);
                messageElement1.appendChild(messageTimestamp);
                messageElement1.appendChild(menuButton); // Append the menu button to the message element
                messageElement1.appendChild(dropdownMenu); // Append the dropdown menu to the message element
                
                messageElement2.appendChild(messageText);

                // Add event listeners for showing/hiding menu button on hover
                messageElement1.addEventListener('mouseenter', function() {
                    menuButton.style.visibility = 'visible';
                });
                messageElement1.addEventListener('mouseleave', function() {
                    menuButton.style.visibility = 'hidden';
                    dropdownMenu.style.display = 'none'; // Hide dropdown menu when mouse leaves the message
                });
            } else {
                // If the author of the message is not the current user, display the message without the menu button
                // Append message content to message element
                messageElement1.appendChild(messageAuth);
                messageElement1.appendChild(messageTimestamp);
                messageElement2.appendChild(messageText);
            }
    
            // Append message element to messages container
            messagesContainer.appendChild(messageElement1);
            messagesContainer.appendChild(messageElement2);
        });
    }

    // Function to toggle dropdown menu visibility
    function toggleDropdownMenu(menuButton) {
        const dropdownMenu = menuButton.nextElementSibling; // Get the next sibling, which is the dropdown menu
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none'; // Hide the dropdown menu if it's currently visible
        } else {
            // Hide all other dropdown menus first
            document.querySelectorAll('.dropdownMenu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.style.display = 'none';
                }
            });
            dropdownMenu.style.display = 'block'; // Show the dropdown menu
        }
    }

    /**
     * Function to send a message to the current group
     * @returns 
     */
    function SendMessage() {
        const messageInput = document.getElementById('messageInput');
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

    /**
     * 
     */
    function updateProfileSettings(){
        // Fetch the current user profile from Firestore
        /*db.collection("Profiles").doc("").get()
            .then((querySnapshot) => {
                const groups = [];
                querySnapshot.forEach(doc => {
                    groups.push({ id: doc.id, ...doc.data() });
                });
                displayProfile();
            })
            .catch(error => {
                console.error('Error getting profile:', error);
            });*/
    }
});