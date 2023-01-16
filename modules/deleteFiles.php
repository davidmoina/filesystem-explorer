<?php

$name = $_GET['name'];
$path = $_GET["path"];

$url_insert = dirname(__DIR__) . $path;
$url_target = str_replace('\\', '/', $url_insert) . '/' . $name;

function deleteFolder($dirname)
{
    if (is_dir($dirname))
        $dir_handle = opendir($dirname);
    if (!$dir_handle)
        return false;

    while ($file = readdir($dir_handle)) {
        if ($file != "." && $file != "..") {
            if (!is_dir($dirname . "/" . $file))
                unlink($dirname . "/" . $file);
            else deleteFolder($dirname . '/' . $file);
        }
    }
    closedir($dir_handle);
    rmdir($dirname);
    return true;
}

$type =  filetype($url_target);
if (is_dir($url_target)) {
    deleteFolder($url_target);
} else {
    unlink($url_target);
}

if (file_exists($url_target) === false) {
    if ($type === "dir") $type = "folder";
    echo json_encode("The $type $name has been deleted");
}
