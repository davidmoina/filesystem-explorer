<?php

$name = $_GET['name'];

$url_insert = dirname(__DIR__) . "/root";
$url_target = str_replace('\\', '/', $url_insert) . '/' . $name;

unlink($url_target);

echo json_encode("The file $name has been deleted");
