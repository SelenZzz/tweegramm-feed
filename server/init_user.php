<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("token");

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data["token"];
renew_token($token);
expire_old_tokens($token);
$uuid = $token === '' ? '' : get_uuid($token);
// get username
$sth = $conn->prepare("SELECT u.username FROM users u LEFT JOIN sessions s
    ON u.uuid = s.user_uuid WHERE s.token = ?");
$sth->bind_param('s', $token);
$sth->execute();

$sth->bind_result($username);
$sth->fetch();
$sth->close();
$res['username'] = $username;

// get notifications count
$sth = $conn->prepare("SELECT COUNT(l.uuid) as notifications_cnt
    FROM likes l
    INNER JOIN (SELECT p.uuid, p.text FROM posts p WHERE p.user_uuid = ?) p ON p.uuid = l.post_uuid
    LEFT JOIN users u ON l.user_uuid = u.uuid
    WHERE l.user_uuid <> ?
    ORDER BY l.created_at DESC");
$sth->bind_param('ss', $uuid, $uuid);
$sth->execute();

$sth->bind_result($notifications_cnt);
$sth->fetch();
$sth->close();
$res['notifications'] = $notifications_cnt;

echo json_encode($res);
