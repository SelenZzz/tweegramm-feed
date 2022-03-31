<?php
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data["uuid"])) {
    $uuid = ' ';
} else {
    $uuid = $data["uuid"];
}

include 'utils/cors.php';
$conn = include 'utils/connection.php';

$sth = $conn->prepare("SELECT t.uuid, u.username, t.text, t.media, t.likes,
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
echo json_encode($res);
$sth->close();
