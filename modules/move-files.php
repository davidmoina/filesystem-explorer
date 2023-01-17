<?php
    $oldSrc = $_GET["oldSrc"];
    $newSrc = $_GET["newSrc"];
    $name = $_GET["name"];
    $mode = $_GET["mode"];
    $onlyName = $_GET["onlyName"];
    $extension = $_GET["extension"];
    $path = $_GET["path"];
    
    $copyName = $onlyName . "-copy";

    if($extension != "") {
        $copyName = $copyName . "." . $extension;
    }

    $url_insert = dirname(__DIR__) . $oldSrc;
    $url_to_move = dirname(__DIR__) . $newSrc;

    $url_target = str_replace('\\', '/', $url_insert . "/" . $name);
    $url_destination = str_replace('\\', '/', $url_to_move);

    function full_copy( $source, $target ) {
        if ( is_dir( $source ) ) {
            @mkdir( $target );
            $d = dir( $source );
            while ( FALSE !== ( $entry = $d->read() ) ) {
                if ( $entry == '.' || $entry == '..' ) {
                    continue;
                }
                $Entry = $source . '/' . $entry; 
                if ( is_dir( $Entry ) ) {
                    full_copy( $Entry, $target . '/' . $entry );
                    continue;
                }
                copy( $Entry, $target . '/' . $entry );
            }

            $d->close();
        }else {
            copy( $source, $target );
        }
    }

    if($mode == "true") {
        $name = $copyName;
        $url_destination = $url_destination . "/" . $copyName;
        
        if(is_dir($url_target)){
            if(!is_dir($url_destination)) {
                $source = $url_target;
                $destination = $url_destination;

                full_copy($source, $destination);
            }
        } else {
            copy($url_target, $url_destination);
        }
        
    } else {
        $url_destination = $url_destination . "/" . $name;
        rename($url_target, $url_destination);
    }

    $movedFile = (object) [
        'type' => filetype($url_destination),
        'name' => $name,
        'lastModify' => date("Y/m/d H:i:s", filemtime($url_destination)),
        'creationDate' => date("Y/m/d H:i:s", filectime($url_destination)),
        'size' => filesize($url_destination),
        'extension' => "",
    ];

    if (isset(pathinfo($url_destination)['extension'])) {
        $movedFile->extension = pathinfo($url_destination)['extension'];
    }


    echo json_encode($movedFile);
?>