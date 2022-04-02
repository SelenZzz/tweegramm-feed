<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("token");

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data['token'];
renew_token($token);
$uuid = get_uuid($token);

$sth = $conn->prepare("SELECT l.uuid, UNIX_TIMESTAMP(l.created_at)*1000 as createdAt, p.text, u.username
    FROM likes l
    INNER JOIN (SELECT p.uuid, p.text FROM posts p WHERE p.user_uuid = ?) p ON p.uuid = l.post_uuid
    LEFT JOIN users u ON l.user_uuid = u.uuid
    WHERE l.user_uuid <> ?
    ORDER BY l.created_at DESC");
$sth->bind_param('ss', $uuid, $uuid);
$sth->execute();
$sth->bind_result($uuid, $createdAt, $text, $username);

$res = [];
while ($sth->fetch()) {
    $item              = [];
    $item['uuid']      = $uuid;
    $item['createdAt'] = $createdAt;
    $item['text']      = $text;
    $item['username']  = $username;
    array_push($res, $item);
}
echo json_encode($res);
$sth->close();
