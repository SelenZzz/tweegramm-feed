<?php
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data["token"])) {
    die('Missing parameters');
}

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data["token"];
if (is_token_expired($token) === 1) {
    $username = '';
    die(json_encode($username));
}
renew_token($token);

$sth = $conn->prepare("SELECT u.username FROM users u LEFT JOIN sessions s
    ON u.uuid = s.user_uuid WHERE s.token = ?");
$sth->bind_param('s', $token);
$sth->execute();

$sth->bind_result($username);
$sth->fetch();
$sth->close();

echo json_encode($username);
