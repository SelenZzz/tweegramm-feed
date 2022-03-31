<?php

function add_session($uuid, $agent)
{
    if (!isset($uuid) || !isset($agent)) {
        die("uuid is not set");
    }
    $conn = require 'connection.php';
    require 'create_token.php';

    $token = tokenize($uuid, $agent);

    $sth = $conn->prepare('INSERT INTO sessions(user_uuid, agent, token) VALUES (?, ?, ?)');
    $sth->bind_param('sss', $uuid, $agent, $token);
    $sth->execute();
    $sth->close();

    return $token;
}

function get_uuid($token)
{
    if (!isset($token)) {
        die('Missing parameters');
    }
    $conn = include 'connection.php';

    $sth = $conn->prepare("SELECT u.uuid FROM users u LEFT JOIN sessions s
    ON u.uuid = s.user_uuid WHERE s.token = ?");
    $sth->bind_param('s', $token);
    $sth->execute();

    $sth->bind_result($uuid);
    $sth->fetch();
    $sth->close();

    return $uuid;
}

function renew_token($token)
{
    if (!isset($token)) {
        die("token is not set");
    }
    $conn = require 'connection.php';
    $sth  = $conn->prepare('UPDATE sessions SET last_usage=NOW() WHERE token = ?');
    $sth->bind_param('s', $token);
    $sth->execute();
    $sth->close();
}

function is_token_expired($token)
{
    if (!isset($token)) {
        die("token is not set");
    }
    $configs = require 'config.php';
    $conn    = require 'connection.php';
    $sth     = $conn->prepare('SELECT CASE WHEN
        (SELECT TIMESTAMPDIFF (SECOND, (SELECT last_usage FROM sessions WHERE token = ?), CURRENT_TIMESTAMP)) > ?
        THEN 1 ELSE 0 END AS expired');
    $sth->bind_param('si', $token, $configs['JWT_EXPIRY']);
    $sth->execute();

    $sth->bind_result($expired);
    $sth->fetch();
    $sth->close();

    return $expired;
}
