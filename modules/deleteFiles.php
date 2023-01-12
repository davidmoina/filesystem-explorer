<?php

$name = $_GET['name'];

$url_insert = dirname(__DIR__) . "/root";
$url_target = str_replace('\\', '/', $url_insert) . '/' . $name;

if(is_dir($url_target)) {
    rmdir($url_target);
} else {
    unlink($url_target);
}

if (file_exists($url_target) === false) {
    echo json_encode("The file $name has been deleted");
}

// echo json_encode(is_dir($url_target));