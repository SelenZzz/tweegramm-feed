<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("token");

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data["token"];
renew_token($token);
$uuid = $token === '' ? '' : get_uuid($token);

$sth = $conn->prepare("SELECT t.uuid, u.username, t.text, t.media,
	(SELECT COUNT(l.uuid) FROM likes l WHERE l.post_uuid = t.uuid) as likes,
    (SELECT COUNT(l.uuid) FROM likes l WHERE l.user_uuid = ? AND l.post_uuid = t.uuid) as liked,
    UNIX_TIMESTAMP(t.created_at)*1000 as createdAt
    FROM posts t LEFT JOIN users u ON t.user_uuid = u.uuid
    ORDER BY createdAt DESC");
$sth->bind_param('s', $uuid);

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
$sth->close();
echo json_encode($res);
