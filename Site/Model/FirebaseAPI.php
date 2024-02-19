<?php
require "config/dbcon.php";

if (isset($_POST["register_btn"]))
{
    echo $_POST["register_btn"];

    $fullname = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

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


