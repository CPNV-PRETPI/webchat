<?php
/**
 * @file      home.php
 * @brief     This view is designed to display the home page
 * @author    Created by Joshua.SURICO
 * @version   06-02-2024
 */

ob_start();
$title = "Accueil";

if (!isset($_SESSION['userEmailAddress']) || (!isset($_GET['action'])) || (@$_GET['action'] == "logout")) : ?>
    <a class="navbar-brand" onclick="alert('Il faut être login pour poster des observation')">POST</a>
<?php else : ?>
    <a class="navbar-brand" href="index.php?action=post">POST</a>
<?php endif; ?>

    <div>home
        <div class="container">
            <h1>Group Name</h1>
            <ul class="message-list">
                <?php include 'messages.php'; ?>
            </ul>
        </div>
        <input type="text" placeholder="Enter message" name="message" id="message" required>
    </div>
<?php
$content = ob_get_clean();
require "gabarit.php";
?>