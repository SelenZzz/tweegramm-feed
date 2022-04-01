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
    $sth     = $conn->prepare('SELECT IF (
        (SELECT TIMESTAMPDIFF (SECOND, (SELECT last_usage FROM sessions WHERE token = ?), CURRENT_TIMESTAMP)) > ?
        OR (SELECT COUNT(expired) FROM sessions WHERE expired = 1 AND token = ?) > 0,
        1, 0) AS expired');
    $sth->bind_param('sis', $token, $configs['JWT_EXPIRY'], $token);
    $sth->execute();

    $sth->bind_result($expired);
    $sth->fetch();
    $sth->close();

    return $expired;
}

function expire_token($token)
{
    if (!isset($token) || $token === '') {
        return "token is not set";
    }
    $conn = require 'connection.php';
    $sth  = $conn->prepare('UPDATE sessions s SET s.expired=1 WHERE s.token = ?');
    $sth->bind_param('s', $token);
    $sth->execute();
    return "token expired";
}

function expire_old_tokens($token)
{
    if (!isset($token) || $token === '') {
        return "missing token";
    }
    $configs = require 'config.php';
    $conn    = require 'connection.php';
    $sth     = $conn->prepare('UPDATE sessions s SET s.expired=1
        WHERE (SELECT TIMESTAMPDIFF (SECOND, s.last_usage, CURRENT_TIMESTAMP)) > ?
        AND s.user_uuid = (SELECT s.user_uuid FROM sessions s WHERE s.token = ?)');
    $sth->bind_param('ss', $configs['JWT_EXPIRY'], $token);
    $sth->execute();
    return "done";
}
