<?php

    $newFolder = "new_folder";
    $route = dirname(__DIR__) . "/root";
    $directory = str_replace('\\', '/', $route) . "/" . $newFolder;

    if(!is_dir($directory)) {
        mkdir($directory);
        echo "Folder created successfully";
    } else {
        echo "The folder $directory already exist!";
    }