<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("token");

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data["token"];
if (is_token_expired($token) === 1) {
    $username = '';
    die(json_encode($username));
}
renew_token($token);
expire_old_tokens($token);

$sth = $conn->prepare("SELECT u.username FROM users u LEFT JOIN sessions s
    ON u.uuid = s.user_uuid WHERE s.token = ?");
$sth->bind_param('s', $token);
$sth->execute();

$sth->bind_result($username);
$sth->fetch();
$sth->close();

echo json_encode($username);
