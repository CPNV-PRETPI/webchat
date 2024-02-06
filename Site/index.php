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

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'home' :
            home();
            break;
        case 'login' :
            login();
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