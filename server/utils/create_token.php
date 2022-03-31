<?php

require 'vendor/autoload.php';
use Firebase\JWT\JWT;

function tokenize($uuid, $agent)
{
    if (!isset($uuid) || !isset($agent)) {
        $token = '';
    } else {
        $configs = require 'config.php';
        $now     = strtotime('now');
        $token   = JWT::encode([
            'iat' => $now, //WHEN TOKEN IS GENERATED
            'nbf' => $now, // WHEN TOKEN IS CONSIDERED VALID
            'exp' => $now + $configs['JWT_EXPIRY'], // EXPIRY 1 HR FROM NOW
            'jti' => base64_encode(random_bytes(16)), // ID
            'iss' => $configs['JWT_ISSUER'], // ISSUER
            'aud' => $configs['JWT_AUD'], // AUDIENCE
            'data' => [
                'uuid'  => $uuid,
                'agent' => $agent,
            ],
        ], $configs['JWT_SECRET'], $configs['JWT_ALGO']);
    }
    return $token;
}
