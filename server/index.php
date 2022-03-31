<?php

require 'utils/cors.php';
$conn = require 'utils/connection.php';

$sth = $conn->prepare("SHOW TABLES;");
$sth->execute();
$sth->bind_result($table);

$res = [];
while ($sth->fetch()) {
    echo $table.' ';
}

$sth->close();
