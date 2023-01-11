<?php

$file = $_FILES['fileData'];
$url_insert = dirname(__DIR__) . "/root";
$url_target = str_replace('\\', '/', $url_insert) . '/' . $file['name'];

move_uploaded_file($file['tmp_name'], $url_target);
echo json_encode($file);
