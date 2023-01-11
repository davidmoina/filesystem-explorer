<?php

    $newFolder = "new_folder";

    if(!is_dir($newFolder)) {
        mkdir($newFolder);
        echo "Folder created successfully";
    } else {
        echo "The folder $newFolder already exist!";
    }