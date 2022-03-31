<?php

function check_get_parameters(...$params)
{
    foreach ($params as $p) {
        if (!isset($_GET[$p])) {
            die($p.' is not set');
        }
    }
    return $_GET;
}

function check_post_parameters(...$params)
{
    $data = json_decode(file_get_contents('php://input'), true);
    foreach ($params as $p) {
        if (!isset($data[$p])) {
            die($p.' is not set');
        }
    }
    return $data;
}
