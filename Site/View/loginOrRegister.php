<?php
/**
 * @file      loginRegister.php
 * @brief     This view is designed to display the loginRegister page
 * @author    Created by Joshua.SURICO
 * @version   06-02-2024
 */

session_start();
ob_start();
$title = "login or register"
?>
<link rel="stylesheet" href="View/content/css/loginOrRegister.css"/>

<form action="Model/FirebaseAPI.php" method="POST">
  <div class="container Register">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

    <label for="register-email"><b>Full name</b></label>
    <input type="text" placeholder="Enter full name" name="register-name" id="register-name" required>

    <label for="register-email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="register-email" id="register-email" required>

    <label for="register-password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="register-password" id="register-password" required>

    <hr>
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

    <button name="register_btn" type="submit" class="registerbtn" id="register_btn">Register</button>
  </div>
</form>
<div class="container signin">
    <p>
      <h1>Already have an account?</h1>
      <button type="button" onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Login with Email</button>
      <button type="button" id="google-login" name="google-login" style="width:auto;"><i class="fa fa-google "></i> Login with Google</button>
  </p>
</div>

<div id="id01" class="modal">
  <form class="modal-content animate">
    <div class="container">
      <label for="login-email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="login-email" id="login-email" required>

      <label for="login-password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="login-password" id="login-password" required>
        
      <button type="button" id="login">Login</button>
    </div>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
    </div>
  </form>
</div>

<script>
// Get the modal
var modal = document.getElementById('id01');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>

<?php
$content = ob_get_clean();
require "gabarit.php";
?>