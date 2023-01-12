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
        <div>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" name="" id="" placeholder="Please enter some here">
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
                    <i class="fa-solid fa-house"></i>
                    <i class="fa-solid fa-left-long"></i>
                </div>
                <div>
                    <i class="fa-solid fa-trash-can"></i>
                    <i class="fa-solid fa-copy"></i>
                    <i class="fa-solid fa-scissors"></i>
                    <i class="fa-solid fa-paste"></i>
                    <i id="btnEdit" class="fa-solid fa-pen-to-square"></i>
                </div>
            </div>
            <div class="route-section">
                <p>Home/</p>
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

    <footer>

    </footer>
    <script src="./assets/js/app.js?v=<?php echo (rand()); ?>"></script>
</body>

</html>