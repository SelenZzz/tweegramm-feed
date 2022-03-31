<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("username", "password", "email", "userAgent");

require 'utils/cors.php';
$conn = require 'utils/connection.php';

$username = $data['username'];
$password = md5($configs['salt'].$data['password']);
$email    = $data['email'];
$agent    = $data['userAgent'];

$sth = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?,?,?)");
$sth->bind_param('sss', $username, $password, $email);
$result = $sth->execute();

$sth = $conn->prepare("SELECT uuid FROM users WHERE username = ?");
$sth->bind_param('s', $username);
$sth->execute();

$sth->bind_result($uuid);
$sth->fetch();
$sth->close();

require 'utils/sessions.php';
$res['token'] = add_session($uuid, $agent);
echo json_encode($res);
