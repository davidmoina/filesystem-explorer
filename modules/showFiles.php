<?php

$path = $_GET['path'];

if ($handle = opendir(".." . $path)) {

    $filesInfoArr = [];
    while (false !== ($file = readdir($handle))) {


        if ($file != "." && $file != "..") {
            $fileToShow = str_replace('\\', '/', dirname(__DIR__)) . $path . '/' . $file;

            $fileInfo = (object) [
                'type' => filetype($fileToShow),
                'name' => $file,
                'lastModify' => date("Y/m/d H:i:s", filemtime($fileToShow)),
                'creationDate' => date("Y/m/d H:i:s", filectime($fileToShow)),
                'size' => filesize($fileToShow),
                'extension' => "",
            ];

            if (isset(pathinfo($fileToShow)['extension'])) {
                $fileInfo->extension = pathinfo($fileToShow)['extension'];
            }

            array_push($filesInfoArr, $fileInfo);
        }
    }

    echo json_encode($filesInfoArr);
    closedir($handle);
}
