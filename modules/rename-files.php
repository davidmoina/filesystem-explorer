<?php
    $name = $_GET['name'];
    $newName = $_GET['newName']

    $url_insert = dirname(__DIR__) . "/root";
    $url_target = str_replace('\\', '/', $url_insert) . '/' . $name;
    $url_new_name = str_replace('\\', '/', $url_insert) . '/' . $newName;

    rename($url_target, $url_new_name)
?>