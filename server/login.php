<?php
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['username']) || !isset($data['password'])) {
    die('Missing url parameters');
}

require 'utils/cors.php';
$conn    = require 'utils/connection.php';
$configs = require 'utils/config.php';

$username = $data['username'];
$password = md5($configs['salt'].$data['password']);

$sth = $conn->prepare('SELECT uuid FROM users WHERE username = ? and password = ?');
$sth->bind_param('ss', $username, $password);
$sth->execute();

$sth->bind_result($uuid);
$sth->fetch();
$sth->close();

if (!isset($uuid)) {
    $res['token'] = '';
} else {
    require 'utils/create_token.php';
    $res = tokenize($uuid, $username);
}
echo json_encode($res);
