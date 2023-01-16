<?php

$name = $_GET['name'];

$url_insert = dirname(__DIR__) . "/root";
$url_target = str_replace('\\', '/', $url_insert) . '/' . $name;

$type =  filetype($url_target);
if (is_dir($url_target)) {
    rmdir($url_target);
} else {
    unlink($url_target);
}

if (file_exists($url_target) === false) {
    if ($type === "dir") $type = "folder";
    echo json_encode("The $type $name has been deleted");
}

// echo json_encode(is_dir($url_target));