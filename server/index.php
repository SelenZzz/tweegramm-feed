<?php

include 'utils/cors.php';
$conn = include 'utils/connection.php';

$sth = $conn->prepare("SHOW TABLES;");
$sth->execute();
$sth->bind_result($table);

$res = [];
while ($sth->fetch()) {
    echo $table.' ';
}

$sth->close();
