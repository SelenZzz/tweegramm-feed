<?php
// Create connection
$configs = include 'config.php';
$conn    = new mysqli(
    $configs['servername'],
    $configs['username'],
    $configs['password'],
    $configs['database']
);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: '.$conn->connect_error);
}
//echo 'Connection established';
return $conn;
