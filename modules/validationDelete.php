<?php

$name = $_GET['name'];

$url_insert = dirname(__DIR__) . "/root";
$url_target = str_replace('\\', '/', $url_insert) . '/' . $name;

if (file_exists($url_target) === true) {
    echo json_encode("ok");
} else {
    echo json_encode("error");
}
