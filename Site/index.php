<?php
/**
 * @file      index.php
 * @brief     This file is the rooter managing the link with controllers.
 * @author    Created by Pascal.BENZONANA
 * @author    Updated by Nicolas.GLASSEY
 * @author    Updated by Joshua.SURICO
 * @version   06-02-2024
 */
require "Controler/navigation.php";

// Check if email parameter is set in the URL
/*if (isset($_GET['email'])) {
    // Retrieve email from URL
    $email = $_GET['email'];
    // Store email in session variable
    $_SESSION['user_email'] = $email;
}
// Check if name parameter is set in the URL
if (isset($_GET['name'])) {
    // Retrieve name from URL
    $name = $_GET['name'];
    // Store name in session variable
    $_SESSION['user_name'] = $name;
}*/

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'home' :
            home();
            break;
        case 'loginOrRegister' :
            loginOrRegister();
            break;
        default :
            lost();
    }
} else {
    loginOrRegister();
}