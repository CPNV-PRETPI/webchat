<?php

require __DIR__.'/vendor/autoload.php';

use Kreait\Firebase\Factory;

$factory = (new Factory)
    ->withServiceAccount('webchat-f8f06-firebase-adminsdk-3s6ni-636d92c95a.json')
    ->withDatabaseUri('https://webchat-f8f06-default-rtdb.europe-west1.firebasedatabase.app/');

$database = $factory->createDatabase();
$auth = $factory->createAuth();