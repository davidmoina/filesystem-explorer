<?php

$textToSearch = $_GET['textToSearch'];
$path = $_GET["path"];

if ($handle = opendir(".." . $path)) {

    $filesInfoArr = [];
    while (false !== ($file = readdir($handle))) {


        if ($file != "." && $file != "..") {
            if (str_contains($file, $textToSearch)) {
                $matchedFile = str_replace('\\', '/', dirname(__DIR__)) . $path . '/' . $file;
                $fileInfo = (object) [
                    'type' => filetype($matchedFile),
                    'name' => $file,
                    'lastModify' => date("Y/m/d H:i:s", filemtime($matchedFile)),
                    'creationDate' => date("Y/m/d H:i:s", filectime($matchedFile)),
                    'size' => filesize($matchedFile),
                    'extension' => "",
                ];
                if (isset(pathinfo($matchedFile)['extension'])) {
                    $fileInfo->extension = pathinfo($matchedFile)['extension'];
                }
                array_push($filesInfoArr, $fileInfo);
            };
        }
    }
    echo json_encode($filesInfoArr);
}
