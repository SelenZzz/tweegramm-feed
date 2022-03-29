<?php

include 'utils/cors.php';
$conn = include 'utils/connection.php';

if (!isset($_GET['u']) || !isset($_GET['p']) || !isset($_GET['e'])) {
    die("Missing url parameters");
}

$username = $_GET['u'];
$password = md5($_GET['p']);
$email    = $_GET['e'];

$sth = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?,?,?)");
$sth->bind_param('sss', $username, $password, $email);
$result = $sth->execute();

$sth = $conn->prepare("SELECT uuid FROM users WHERE username = ?");
$sth->bind_param('s', $username);
$sth->execute();

$sth->bind_result($uuid);
$sth->fetch();
$sth->close();

require 'utils/create_token.php';
$res = tokenize($uuid, $username);
echo json_encode($res);
