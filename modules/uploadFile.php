<?php

$file = $_FILES['fileData'];
$url_insert = dirname(__DIR__) . "/root";
$url_target = str_replace('\\', '/', $url_insert) . '/' . $file['name'];

move_uploaded_file($file['tmp_name'], $url_target);

$fileInfo = (object) [
    'type' => filetype($url_target),
    'name' => $file['name'],
    'lastModify' => date("Y/m/d H:i:s", filemtime($url_target)),
    'creationDate' => date("Y/m/d H:i:s", filectime($url_target)),
    'size' => filesize($url_target),
];

echo json_encode($fileInfo);
