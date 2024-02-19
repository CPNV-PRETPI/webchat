<?php
/**
 * @file      gabarit.php
 * @brief     This view is designed to centralize all common graphical component like header and footer (will be call by all views)
 * @author    Created by Pascal.BENZONANA
 * @author    Updated by Nicolas.GLASSEY
 * @author    Updated by Joshua.SURICO
 * @version   06-02-2024
 */
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title><?= $title; ?></title>
    <meta charset="UTF-8">
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"/>
    <link rel="stylesheet" href="view/content/css/all.min.css"/>
    <link rel="stylesheet" href="view/content/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="view/content/css/templatemo-style.css"/>
    <script src="https://kit.fontawesome.com/07a6ec1a6f.js" crossorigin="anonymous"></script>

    <style>
        .dropdown-toggle::after {
            display: none;
        }
    </style>

</head>
<body style="padding-top: 100px">

<nav class="navbar fixed-top navbar-expand-lg navbar-expand navbar-light bg-light justify-content-between">
    <a class="navbar-brand" href="index.php?action=home"><img src="view\content\logo\Webchat.png" style="width:50px"></a>
    <form class="form-inline">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-bars"></i>
                    </a>
                    <div class="dropdown-menu" id="menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="index.php?action=home">Home</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" id="loginOrRegister" href="index.php?action=loginOrRegister">Login or Register</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" id="logout" href="index.php?action=loginOrRegister">Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </form>
</nav>

<?= $content; ?>

<div>
    <!-- Page footer -->
    <footer class="row tm-page-footer">
        <p id="userAccount" class="col-12 tm-copyright-text mb-0">
            Account: <span id="displayName"></span>
        </p>
    </footer>
</div>
<script src="view/content/js/jquery.min.js"></script>
<script src="view/content/js/parallax.min.js"></script>
<script src="view/content/js/bootstrap.min.js"></script>
</body>
</html>