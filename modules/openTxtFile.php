<?php

$path = $_GET['path'];

$urlFile = str_replace('\\', '/', dirname(__DIR__)) . $path;

$file = fopen($urlFile, "r");

$fileInfo = fread($file, filesize($urlFile));

if ($file == false) {
    echo json_encode("An unexpected error has occurred");
    exit();
}

fclose($file);

echo json_encode($fileInfo);
