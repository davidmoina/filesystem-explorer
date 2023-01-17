<?php
    $name = $_GET['name'];
    $path = $_GET["path"];

    $url_insert = dirname(__DIR__) . $path;
    $url_trash = dirname(__DIR__) . "/trash";

    $url_target = str_replace('\\', '/', $url_insert) . '/' . $name;

    $url_destination = str_replace('\\', '/', $url_trash . "/" . $name);
    rename($url_target, $url_destination);

    echo json_encode($url_trash);