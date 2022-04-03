<?php
require 'utils/parse_parameters.php';
$data = check_post_parameters("username", "password", "email", "birthday", "userAgent");

require 'utils/cors.php';
$conn = require 'utils/connection.php';

$username = $data['username'];
$password = md5($configs['salt'].$data['password']);
$email    = $data['email'];
$agent    = $data['userAgent'];
$birthday = $data['birthday'];

$sth = $conn->prepare("INSERT INTO users (username, password, email, birthday) VALUES (?,?,?,?)");
$sth->bind_param('ssss', $username, $password, $email, $birthday);
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
