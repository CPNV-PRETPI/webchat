<?php
/**
 * @file      index.php
 * @brief     This file is the rooter managing the link with controllers.
 * @author    Created by Pascal.BENZONANA
 * @author    Updated by Nicolas.GLASSEY
 * @author    Updated by Joshua.SURICO
 * @version   06-02-2024
 */

session_start();
require "controler/navigation.php";
?>
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
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
</script>
<?php
if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'home' :
            home();
            break;
        case 'login' :
            login($_POST);
            break;
        case 'logout' :
            logout();
            break;
        case 'register' :
            register();
            break;
        case 'post' :
            sendAmsg($_POST);
            break;
        default :
            lost();
    }
} else {
    home();
}