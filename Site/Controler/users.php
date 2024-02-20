<?php
/**
 * @file      users.php
 * @brief     This controller is designed to manage all users actions
 * @author    Created by Joshua.SURICO
 * @version   06-02-2024
 */

 
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