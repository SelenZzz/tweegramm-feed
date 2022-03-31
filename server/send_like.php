<?php
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['token']) || !isset($data['post_uuid'])) {
    die("Missing url parameters");
}

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data['token'];
renew_token($token);
$uuid = get_uuid($token);
$post = $data['post_uuid'];

$sth = $conn->prepare('SELECT COUNT(l.uuid) FROM likes l WHERE l.user_uuid = ? AND l.post_uuid = ?');
$sth->bind_param('ss', $uuid, $post);
$sth->execute();
$sth->bind_result($is_liked);
$sth->fetch();
$sth->close();

if ($is_liked == 1) {
    $sth = $conn->prepare('DELETE FROM likes WHERE post_uuid = ? AND user_uuid = ?');
} else {
    $sth = $conn->prepare('INSERT INTO likes (post_uuid, user_uuid) VALUES (?, ?)');
}
$sth->bind_param('ss', $post, $uuid);
$sth->execute();
$sth->close();

$add_value = ($is_liked == 1 ? -1 : +1);

$sth = $conn->prepare('UPDATE posts SET likes = likes + ? WHERE uuid = ?');
$sth->bind_param('is', $add_value, $post);
$sth->execute();
$sth->close();

$sth = $conn->prepare("SELECT t.uuid, u.username, t.text, t.media, t.likes,
    (SELECT COUNT(l.uuid) FROM likes l WHERE l.user_uuid = ? AND l.post_uuid = ?) as liked,
    UNIX_TIMESTAMP(t.created_at)*1000 as createdAt
    FROM posts t
    LEFT JOIN users u ON t.user_uuid = u.uuid
    WHERE t.uuid = ? ");
$sth->bind_param('sss', $uuid, $post, $post);
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
