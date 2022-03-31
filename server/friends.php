<?php

require 'utils/cors.php';
$conn = require 'utils/connection.php';

$sth = $conn->prepare("SELECT uuid, username, email FROM users ORDER BY username ASC");
$sth->execute();
$sth->bind_result($uuid, $username, $email);

$res = [];
while ($sth->fetch()) {
    $item             = [];
    $item['uuid']     = $uuid;
    $item['username'] = $username;
    $item['info']     = $email;
    array_push($res, $item);
}
echo json_encode($res);
$sth->close();
