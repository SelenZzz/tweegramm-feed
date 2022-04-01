<?php
require 'utils/parse_parameters.php';
$data = check_post_parameters("token");

require 'utils/cors.php';
require 'utils/sessions.php';
$conn = require 'utils/connection.php';

$token = $data['token'];

$res['response'] = expire_token($token);
expire_old_tokens($token);
echo json_encode($res);
