<?php
/**
 * @file      users.php
 * @brief     This controller is designed to manage all users actions
 * @author    Created by Joshua.SURICO
 * @version   06-02-2024
 */

 //require "Model/FirebaseAPI.php";

 if (isset($_POST["register_btn"]))
 {
     echo $_POST["register_btn"];
 
     $fullname = $_POST["register-name"];
     $email = $_POST["register-email"];
     $password = $_POST["register-password"];
 
     $userProperties = [
         'email' => $email,
         'emailVerified' => false,
         'password' => $password,
         'displayName' => $fullname,
         'photoUrl' => 'https://picsum.photos/id/10/200/300',
         'disabled' => false,
     ];
     
     $createdUser = $auth->createUser($userProperties);
 
     if ($createdUser)
     {
         $_SESSION['status'] = "User Created/Registered Successfully";
         exit();
     }
     else{
         $_SESSION["status"] = "User Not Created/Registered";
         exit();
     }
 }
 
 if (isset($_POST["login_btn"]))
 {
     $email = $_POST["login-email"];
     $password = $_POST["login-password"];
 }

/**
 * @brief This function is designed to manage logout request
 * @remark In case of login, the user session will be destroyed.
 */
function logout()
{
    $_SESSION = array();
    session_destroy();
    require "view/home.php";
}

function sendAmsg($MsgRequest)
{
    
    $author = $MsgRequest["author"];
    $message = $MsgRequest["message"];
}