<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("token", "username");

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data['token'];
renew_token($token);
$uuid     = $token === '' ? '' : get_uuid($token);
$username = $data['username'];

$sth = $conn->prepare("SELECT t.uuid, u.username, t.text, t.media, t.likes,
    (SELECT COUNT(l.uuid) FROM likes l WHERE l.user_uuid = ? AND l.post_uuid = t.uuid) as liked,
    UNIX_TIMESTAMP(t.created_at)*1000 as createdAt
    FROM posts t LEFT JOIN users u ON t.user_uuid = u.uuid
    WHERE u.username = ?
    ORDER BY createdAt DESC");
$sth->bind_param('ss', $uuid, $username);

$sth->execute();
$sth->bind_result($uuid, $username, $text, $media, $likes, $liked, $createdAt);

$res = [];
while ($sth->fetch()) {
    $item              = [];
    $item['uuid']      = $uuid;
    $item['username']  = $username;
    $item['text']      = $text;
    $item['likes']     = $likes;
    $item['liked']     = $liked;
    $item['createdAt'] = $createdAt;
    array_push($res, $item);
}
echo json_encode($res);
$sth->close();
