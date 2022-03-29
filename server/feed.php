<?php

include 'utils/cors.php';
$conn = include 'utils/connection.php';

if (!isset($_GET['u'])) {
    $sth = $conn->prepare("SELECT t.uuid, u.username, t.text, t.media, t.likes,
    UNIX_TIMESTAMP(t.created_at)*1000 as createdAt
    FROM tweets t LEFT JOIN users u ON t.user_uuid = u.uuid
    ORDER BY createdAt DESC");
} else {
    $username = $_GET['u'];

    $sth = $conn->prepare("SELECT t.uuid, u.username, t.text, t.media, t.likes,
    UNIX_TIMESTAMP(t.created_at)*1000 as createdAt
    FROM tweets t LEFT JOIN users u ON t.user_uuid = u.uuid
    WHERE u.username = ?
    ORDER BY createdAt DESC");
    $sth->bind_param('s', $username);
}
$sth->execute();
$sth->bind_result($uuid, $username, $text, $media, $likes, $createdAt);

$res = [];
while ($sth->fetch()) {
    $item              = [];
    $item['uuid']      = $uuid;
    $item['username']  = $username;
    $item['text']      = $text;
    $item['likes']     = $likes;
    $item['createdAt'] = $createdAt;
    array_push($res, $item);
}
echo json_encode($res);
$sth->close();
