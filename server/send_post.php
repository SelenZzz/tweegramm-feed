<?php

include 'utils/cors.php';
$conn = include 'utils/connection.php';

if (!isset($_GET['u']) || !isset($_GET['t'])) {
    die("Missing url parameters");
}

$user_uuid = $_GET['u'];
$text      = $_GET['t'];

$sth = $conn->prepare("INSERT INTO tweets(user_uuid, text) VALUES (?, ?)");
$sth->bind_param('ss', $user_uuid, $text);
$sth->execute();
$sth->close();
