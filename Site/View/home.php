<?php
/**
 * @file      home.php
 * @brief     This view is designed to display the home page
 * @author    Created by Joshua.SURICO
 * @version   06-02-2024
 */

ob_start();
$title = "Accueil";
?>
<link rel="stylesheet" href="View/content/css/home.css"/>

<div>
    <div class="container" id="groups">
        <ul class="groupsList">
            <li>group name</li>
            <li>group name</li>
            <li>group name</li>
            <li>group name</li>
        </ul>
    </div>
    <div class="container" id="discussion">
        <div id="messages">
            <h1 id="groupName"></h1>
            <ul class="messagesList">
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
            </ul>
        </div>
        <div id="">
            <input type="text" placeholder="Enter message" name="message" id="message">
            <a id="sendMsg" name="sendMsg">send</a>
            <a id="addPhoto" name="addPhoto"><i class="fa-solid fa-plus"></i></a>
        </div>
    </div>
</div>

<?php
$content = ob_get_clean();
require "gabarit.php";
?>