<?php

$textToSearch = $_GET['textToSearch'];
$path = $_GET["path"];

$url_path = dirname(__DIR__) . $path;
$url_target = str_replace('\\', '/', $url_path);


$filesInfoArr = [];

function goThroughDirectorys($dirname, $textToSearch)
{
    global $filesInfoArr;
    if (is_dir($dirname))
        $dir_handle = opendir($dirname);

    while ($file = readdir($dir_handle)) {
        if ($file != "." && $file != "..") {
            if (str_contains($file, $textToSearch)) {
                $matchedFile = $dirname . '/' . $file;
                $fileInfo = (object) [
                    'type' => filetype($matchedFile),
                    'name' => $file,
                    'lastModify' => date("Y/m/d H:i:s", filemtime($matchedFile)),
                    'creationDate' => date("Y/m/d H:i:s", filectime($matchedFile)),
                    'size' => filesize($matchedFile),
                    'extension' => "",
                    'path' => substr($dirname, strlen(dirname(__DIR__))),
                ];
                if (isset(pathinfo($matchedFile)['extension'])) {
                    $fileInfo->extension = pathinfo($matchedFile)['extension'];
                }
                array_push($filesInfoArr, $fileInfo);
            }
            if (is_dir($dirname . "/" . $file))
                goThroughDirectorys($dirname . '/' . $file, $textToSearch);
        }
    }
    closedir($dir_handle);
    return true;
}

goThroughDirectorys($url_target, $textToSearch);

echo json_encode($filesInfoArr);



// if ($handle = opendir(".." . $path)) {
    
//     $filesInfoArr = [];
//     while (false !== ($file = readdir($handle))) {

//         if ($file != "." && $file != "..") {
//             if (str_contains($file, $textToSearch)) {
//                 $matchedFile = str_replace('\\', '/', dirname(__DIR__)) . $path . '/' . $file;
//                 $fileInfo = (object) [
//                     'type' => filetype($matchedFile),
//                     'name' => $file,
//                     'lastModify' => date("Y/m/d H:i:s", filemtime($matchedFile)),
//                     'creationDate' => date("Y/m/d H:i:s", filectime($matchedFile)),
//                     'size' => filesize($matchedFile),
//                     'extension' => "",
//                 ];
//                 if (isset(pathinfo($matchedFile)['extension'])) {
//                     $fileInfo->extension = pathinfo($matchedFile)['extension'];
//                 }
//                 array_push($filesInfoArr, $fileInfo);
//             };
//         }
//     }
//     echo json_encode($filesInfoArr);
// }
