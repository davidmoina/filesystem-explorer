<?php

$path = $_GET["path"];
$numFolder = $_GET["foldNum"];
$newFolder = "new_folder";
$route = dirname(__DIR__) . $path;
$directory = str_replace('\\', '/', $route) . "/" . $newFolder;

$fold = $directory . $numFolder;

mkdir($fold);

$foldInfo = (object) [
    'type' => filetype($fold),
    'name' => $newFolder . $numFolder,
    'lastModify' => date("Y/m/d H:i:s", filemtime($fold)),
    'creationDate' => date("Y/m/d H:i:s", filectime($fold)),
    'size' => filesize($fold),
    'extension' => "",
];

echo json_encode($foldInfo)
?>
