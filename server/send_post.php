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

$sth = $conn->prepare("SELECT p.uuid, u.username, p.text, p.media, p.likes,
    (SELECT COUNT(l.uuid) FROM likes l WHERE l.user_uuid = ? AND l.post_uuid = p.uuid) as liked,
    UNIX_TIMESTAMP(p.created_at)*1000 as createdAt
    FROM posts p LEFT JOIN users u ON p.user_uuid = u.uuid
    WHERE p.user_uuid = ?
    ORDER BY createdAt DESC
    LIMIT 1");
$sth->bind_param('ss', $uuid, $uuid);
$sth->execute();

$sth->bind_result($uuid, $username, $text, $media, $likes, $liked, $createdAt);
$sth->fetch();
$sth->close();

$res['uuid']      = $uuid;
$res['username']  = $username;
$res['text']      = $text;
$res['likes']     = $likes;
$res['liked']     = $liked;
$res['createdAt'] = $createdAt;

echo json_encode($res);
