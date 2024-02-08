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
require "Controler/navigation.php";
require "Controler/users.php";
require "Model/FirebaseAPI.php";

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'home' :
            home();
            break;
        case 'logout' :
            logout();
            break;
        case 'loginOrRegister' :
            loginOrRegister();
            break;
        case 'post' :
            sendAmsg($_POST);
            break;
        default :
            lost();
    }
} else {
    loginOrRegister();
}