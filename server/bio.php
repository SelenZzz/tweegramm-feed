<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("token", "username");

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data['token'];
renew_token($token);
$uuid     = $token === '' ? '' : get_uuid($token);
$username = $data['username'];

$sth = $conn->prepare("SELECT u.bio FROM users u WHERE u.username = ?");
$sth->bind_param('s', $username);

$sth->execute();
$sth->bind_result($bio);
$sth->fetch();
$sth->close();
$res['bio'] = $bio;
echo json_encode($res);
