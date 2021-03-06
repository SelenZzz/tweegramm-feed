<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("username", "password", "userAgent");

require 'utils/cors.php';
$conn    = require 'utils/connection.php';
$configs = require 'utils/config.php';

$username = $data['username'];
$password = md5($configs['salt'].$data['password']);
$agent    = $data['userAgent'];

$sth = $conn->prepare('SELECT uuid FROM users WHERE username = ? and password = ?');
$sth->bind_param('ss', $username, $password);
$sth->execute();

$sth->bind_result($uuid);
$sth->fetch();
$sth->close();

if (!isset($uuid)) {
    $res['token'] = '';
} else {
    require 'utils/sessions.php';
    $res['token'] = add_session($uuid, $agent);
}
echo json_encode($res);
