<?php
require 'utils/parse_parameters.php';
$data = check_get_parameters("username");

require 'utils/cors.php';
$conn = require 'utils/connection.php';

$username = $data['username'];

$sth = $conn->prepare("SELECT COUNT(uuid) as exist from users WHERE username = ?");
$sth->bind_param('s', $username);
$sth->execute();

$sth->bind_result($exist);
$sth->fetch();
$sth->close();

$res['exists'] = $exist;
echo json_encode($res);
