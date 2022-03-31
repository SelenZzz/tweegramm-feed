<?php
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['uuid']) || !isset($data['text'])) {
    die("Missing POST parameters");
}

require 'utils/cors.php';
$conn = require 'utils/connection.php';

$user_uuid = $data['uuid'];
$text      = $data['text'];

$sth = $conn->prepare("INSERT INTO posts(user_uuid, text) VALUES (?, ?)");
$sth->bind_param('ss', $user_uuid, $text);
$sth->execute();
$sth->close();
