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

$sth = $conn->prepare("SELECT u.bio, u.birthday, u.registrated_at FROM users u WHERE u.username = ?");
$sth->bind_param('s', $username);

$sth->execute();
$sth->bind_result($bio, $bithday, $joined);
$sth->fetch();
$sth->close();
$res['bio']      = $bio;
$res['birthday'] = $bithday;
$res['joined']   = $joined;
echo json_encode($res);
