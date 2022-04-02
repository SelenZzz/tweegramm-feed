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

$sth = $conn->prepare("UPDATE users u SET u.bio = ? WHERE u.uuid = ?");
$sth->bind_param('ss', $text, $uuid);
$sth->execute();
$sth->close();

$res['result'] = 'ok';
echo json_encode($res);
