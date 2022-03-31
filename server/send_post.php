<?php
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['token']) || !isset($data['text'])) {
    die("Missing POST parameters");
}

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data['token'];
renew_token($token);
$uuid = get_uuid($token);
$text = $data['text'];

$sth = $conn->prepare("INSERT INTO posts(user_uuid, text) VALUES (?, ?)");
$sth->bind_param('ss', $uuid, $text);
$sth->execute();
$sth->close();
