<?php

$path = $_GET['path'];

$urlFile = str_replace('\\', '/', dirname(__DIR__)) . $path;

$file = fopen($urlFile, "r");

$arrInfo = ["<table>"];

while (($data = fgetcsv($file)) !== false) {

    array_push($arrInfo, "<tr>");

    foreach ($data as $i) {
        array_push($arrInfo, "<td>" . htmlspecialchars($i) . "</td>");
    }
    array_push($arrInfo, "</tr>");
}

array_push($arrInfo, "</table>");

fclose($file);

echo json_encode($arrInfo);
