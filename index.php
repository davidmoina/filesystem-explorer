<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/style.css?v=<?php echo (rand()); ?>">
    <script defer src="https://kit.fontawesome.com/8bbf7b9ae4.js" crossorigin="anonymous"></script>
    <title>Drive</title>
</head>

<body>
    <header class="header">
        <div>
            <h1>Drive</h1>
        </div>
        <div class="container-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="inputSearch" placeholder="Please enter some here">
        </div>
    </header>

    <main class="main">
        <aside class="aside-menu">
            <button id="btnNewFolder"><i class="fa-solid fa-folder-plus"></i> New folder</button>
            <label for="btnUploadFile"><i class="fa-solid fa-file-arrow-up"></i> Upload file</label>
            <input type="file" name="fileData" id="btnUploadFile">

        </aside>

        <section class="files-display">
            <div class="menu-section">
                <div>
                    <i id="btnHome" class="fa-solid fa-house"></i>
                    <i id="btnBack" class="fa-solid fa-left-long"></i>
                </div>
                <div class="nothing-selected">
                    <i class="fa-solid fa-trash-can"></i>
                    <i class="fa-solid fa-copy"></i>
                    <i class="fa-solid fa-scissors"></i>
                    <i class="fa-solid fa-paste"></i>
                    <i id="btnEdit" class="fa-solid fa-pen-to-square"></i>
                </div>
            </div>
            <div id="routeSection" class="route-section">
                <p>/root</p>
            </div>
            <div class="files-header">
                <p class="name">Name</p>
                <p>Last Modified</p>
                <p>Creation date</p>
                <p>Size</p>
            </div>
            <div class="files-body">

            </div>
        </section>
    </main>

    <div class="modal-confirm-delete">
        <p>The file <span></span> is going to be removed, do you want to move on?</p>
        <div>
            <button>Yes</button>
            <button>No</button>
        </div>
    </div>

    <div class="modal-delete-done">
    </div>

    <div class="modal-display-file">
        <button id="closeModalDisplayFile">🗙</button>
        <div id="containerDisplayFileOpened">

        </div>
    </div>

    <script src="./assets/js/app.js?v=<?php echo (rand()); ?>"></script>
</body>

</html>