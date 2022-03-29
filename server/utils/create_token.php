<?php

$configs = require 'config.php';

require 'vendor/autoload.php';
use Firebase\JWT\JWT;

function tokenize($uuid, $username)
{
    if (!isset($uuid) || !isset($username)) {
        $token = '';
    } else {
        global $configs;
        $now   = strtotime('now');
        $token = JWT::encode([
            'iat' => $now, //WHEN TOKEN IS GENERATED
            'nbf' => $now, // WHEN TOKEN IS CONSIDERED VALID
            'exp' => $now + 3600, // EXPIRY 1 HR FROM NOW
            'jti' => base64_encode(random_bytes(16)), // ID
            'iss' => $configs['JWT_ISSUER'], // ISSUER
            'aud' => $configs['JWT_AUD'], // AUDIENCE
            'data' => [
                'uuid'     => $uuid,
                'username' => $username,
            ],
        ], $configs['JWT_SECRET'], $configs['JWT_ALGO']);
    }
    $res['token'] = $token;
    return $res;
}
