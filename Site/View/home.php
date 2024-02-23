<?php
/**
 * @file      home.php
 * @brief     This view is designed to display the home page
 * @author    Created by Joshua.SURICO
 * @version   06-02-2024
 */

ob_start();
$title = "home";
?>
<link rel="stylesheet" href="View/content/css/home.css"/>

<div class="container-wrapper">
    <div class="container" id="groups">
        <div id="groupsList"></div>
    </div>
    <div class="container" id="discussion">
        <div id="messages">
            <h1 id="groupName"></h1>
            <div id="messagesList"></div>
        </div>
        <div id="send">
            <input type="text" placeholder="Enter message" name="message" id="message">
            <button id="sendMsg" name="sendMsg">send</button>
            <a id="addPhoto" name="addPhoto"><i class="fa-solid fa-plus"></i></a>
        </div>
    </div>
    <button id="toggleGroups">Toggle Groups</button>
</div>

<?php
$content = ob_get_clean();
require "gabarit.php";
?>