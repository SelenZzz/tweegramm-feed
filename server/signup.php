<?php
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['username']) || !isset($data['password']) || !isset($data['email'])) {
    die("Missing url parameters");
}

require 'utils/cors.php';
$conn = require 'utils/connection.php';

$username = $data['username'];
$password = md5($configs['salt'].$data['password']);
$email    = $data['email'];

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
