document.addEventListener('DOMContentLoaded', function() {
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
                window.location = '?action=loginOrRegister';
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
    
    /**
     * Fetch groups
     */
    function UpdateGroups(){
        // Fetch all groups from Firestore
        firebase.getDocs(groupsRef)
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
        const groupRef = firebase.collection(db, "Groups", groupId, "Messages");

        firebase.getDocs(groupRef)
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
});