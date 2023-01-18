const btnUploadFile = document.getElementById("btnUploadFile");
const modalShowImg = document.querySelector(".modal-show-img");
const btnNewFolder = document.getElementById("btnNewFolder");
const filesBodyContainer = document.querySelector(".files-body");
const trash = document.getElementById("btnDelete");
const btnEdit = document.getElementById("btnEdit");
const modalConfirmDelete = document.querySelector(".modal-confirm-delete");
const textConfirmDelete = document.querySelector(".modal-confirm-delete span");
const modaldeleteDone = document.querySelector(".modal-delete-done");
const btnsConfirmDelete = document.querySelectorAll(
  ".modal-confirm-delete button"
);
const definitelyDelete = document.getElementById("definitelyDelete");

const btnHome = document.getElementById("btnHome");
const btnBack = document.getElementById("btnBack");
const searchIcon = document.querySelector(".fa-magnifying-glass");
const inputSearch = document.getElementById("inputSearch");
const btnMove = document.getElementById("btnMove");
const btnPaste = document.getElementById("btnPaste");
const btnCopy = document.getElementById("btnCopy");
const btnRecycleBin = document.getElementById("btnRecycleBin");

let savedPath = ["/root"];

let path;
let move = false;
let copy = false;

const routeSection = document.getElementById("routeSection");
const modalDisplayFiles = document.querySelector(".modal-display-file");
const displayFileOpened = document.getElementById("containerDisplayFileOpened");
const closeModalDisplayFile = document.getElementById("closeModalDisplayFile");
const nothingSelectedcontainer = document.querySelector(".nothing-selected");

const iconsFiles = {
  folder: "fa-solid fa-folder",
  openedFolder: "fa-solid fa-folder-open",
  doc: "fa-solid fa-file-word",
  csv: "fa-solid fa-file-csv",
  jpg: "fa-solid fa-file-image",
  png: "fa-regular fa-file-image",
  txt: "fa-solid fa-file-lines",
  ppt: "fa-solid fa-presentation-screen",
  odt: "fa-solid fa-file",
  pdf: "fa-solid fa-file-pdf",
  zip: "fa-solid fa-file-zipper",
  rar: "fa-solid fa-file-exclamation",
  exe: "fa-solid fa-file-excel",
  svg: "fa-regular fa-file-lines",
  mp3: "fa-solid fa-file-audio",
  mp4: "fa-solid fa-file-video",
};

let currentFile;
let beforeCurrentFile;
let newName;
let oldName;
let folder;
let oldSrc;
let newSrc;
let fileToMove;
let nameFileToMove;
let extension;

let counter = 0;

let folderNumber = 0;

if (localStorage.getItem("numFold")) {
  folderNumber = parseInt(localStorage.getItem("numFold"));
} else {
  localStorage.setItem("numFold", folderNumber);
}

btnBack.addEventListener("click", goBackDirectory);
btnHome.addEventListener("click", goHome);
window.addEventListener("load", showFilesRoot);
btnUploadFile.addEventListener("change", uploadFile);
btnNewFolder.addEventListener("click", newFolder);
closeModalDisplayFile.addEventListener("click", closeModalOpenedFile);
searchIcon.addEventListener("click", searchByName);
inputSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") inputSearch.blur();
  searchByName();
});
for (let btn of btnsConfirmDelete) {
  btn.addEventListener("click", confirmDimissDeleteFile);
}

btnMove.addEventListener("click", () => {
  copy = false;
  showPasteIcon();
  moveFiles();
});
btnPaste.addEventListener("click", pasteFiles);
btnCopy.addEventListener("click", () => {
  copy = true;
  showPasteIcon();
  moveFiles();
});

btnRecycleBin.addEventListener("click", showRecycleBin);

function showPasteIcon() {
  if (counter === 0) {
    btnPaste.classList.add("fa-paste-active");
  } else {
    btnPaste.classList.remove("fa-paste-active");

    if (oldSrc === newSrc) {
      let divRename = document.querySelector(".moveFile");
      divRename.classList.remove("moveFile");
    }
  }
}

function uploadFile() {
  path = savedPath.join("/");
  let nameReplacedSpaces = btnUploadFile.files[0].name.replace(/ /g, "_");

  let formData = new FormData();
  formData.append("fileData", btnUploadFile.files[0]);

  formData.set("fileData", btnUploadFile.files[0], nameReplacedSpaces);

  fetch("modules/uploadFile.php" + "?" + "path=" + path, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (typeof data === "object") {
        createElementsToShowFilesRoot(
          data.type,
          data.name,
          data.lastModify,
          data.creationDate,
          data.size,
          data.extension
        );
      } else {
        console.error(data);
      }
    });
}

function showFilesRoot() {
  path = savedPath.join("/");
  fetch("modules/showFiles.php" + "?" + "path=" + path, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      dataSorted = data.sort((a, b) => {
        if (a.type > b.type) return -1;
        if (a.type < b.type) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      });
      dataSorted.forEach((file) => {
        createElementsToShowFilesRoot(
          file.type,
          file.name,
          file.lastModify,
          file.creationDate,
          file.size,
          file.extension
        );
      });
    });
}

function createElementsToShowFilesRoot(
  type,
  name,
  lastModify,
  creationDate,
  size,
  extension
) {
  let sizeTransformed;
  if (type === "dir") {
    sizeTransformed = "";
  } else if (size >= 1000000) {
    sizeTransformed = (size / 1000000).toFixed(2) + " MB";
  } else {
    sizeTransformed = (size / 1000).toFixed(2) + " KB";
  }
  let icon;
  if (type === "dir") {
    icon = iconsFiles.folder;
  } else {
    for (const iconType in iconsFiles) {
      if (iconType === extension) {
        icon = iconsFiles[iconType];
      }
    }
  }
  filesBodyContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="file" data-extension="${extension}">    
            <i class="${icon}"></i>
            <p class="name" data-name=${name}>${name}</p>
            <p>${lastModify}</p>
            <p>${creationDate}</p>
            <p>${sizeTransformed}</p>
            </div>`
  );

  document
    .querySelector(`[data-name="${name}"]`)
    .addEventListener("click", handleFileOrFolder);

  document
    .querySelector(`[data-name="${name}"]`)
    .addEventListener("dblclick", openFile);
}

function newFolder() {
  folderNumber += 1;
  path = savedPath.join("/");

  fetch(
    "modules/create-folder.php" +
      "?" +
      "foldNum=" +
      folderNumber +
      "&" +
      "path=" +
      path,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (typeof data === "object") {
        createElementsToShowFilesRoot(
          data.type,
          data.name,
          data.lastModify,
          data.creationDate,
          data.size,
          data.extension
        );
      } else {
        console.error(data);
      }
    });

  localStorage.setItem("numFold", folderNumber);
}

function startDeleteFile() {
  path = savedPath.join("/");
  fetch(
    "modules/validationDelete.php" +
      "?" +
      "name=" +
      currentFile +
      "&" +
      "path=" +
      path,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data === "ok") {
        textConfirmDelete.textContent = currentFile;
        definitelyDelete.innerText = "DEFINITELY";
        if (path.indexOf("/trash") === -1) {
          definitelyDelete.innerText = "";
        }

        modalConfirmDelete.classList.add("modal-confirm-detele-active");
      }
    });
}

function deleteFile() {
  path = savedPath.join("/");
  let location = "modules/deleteFiles.php";

  if (path.indexOf("/trash") === -1) {
    location = "modules/trash-files.php";
  }

  fetch(location + "?" + "name=" + currentFile + "&" + "path=" + path, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      modaldeleteDone.innerHTML = `<i class="fa-regular fa-circle-check"></i> ${data}`;
      modaldeleteDone.classList.add("modal-delete-done-active");
      setTimeout(() => {
        modaldeleteDone.classList.remove("modal-delete-done-active");
      }, 1700);

      let divToDelete = document.querySelector(
        `[data-name="${currentFile}"]`
      ).parentElement;
      divToDelete.remove();
      modalConfirmDelete.classList.remove("modal-confirm-detele-active");
    });
}

function createInput() {
  oldName = currentFile;

  let divRename = document.querySelector(`[data-name="${currentFile}"]`);
  divRename.innerHTML = `<input id='newName' type='text' name='newName' value=${currentFile}>`;

  let inputNewName = document.getElementById("newName");
  let firstValue = inputNewName.value;
  inputNewName.focus();
  inputNewName.select();
  inputNewName.addEventListener("focusout", obtainName);
  inputNewName.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      obtainName();
    } else if (e.key === "Escape") {
      inputNewName.value = firstValue;
      divRename.textContent = inputNewName.value;
    }
  });
}

function obtainName() {
  const inputNewName = document.getElementById("newName");

  let divRename = document.querySelector(
    `[data-name="${oldName}"]`
  ).parentElement;

  if (inputNewName.value.indexOf("." + divRename.dataset.extension) !== -1) {
    newName = inputNewName.value.replace(/ /g, "_");
  } else if (divRename.dataset.extension !== "") {
    newName =
      inputNewName.value.replace(/ /g, "_") + "." + divRename.dataset.extension;
  } else {
    newName = inputNewName.value.replace(/ /g, "_");
  }

  renameFile();
}

function renameFile() {
  path = savedPath.join("/");
  fetch(
    "modules/rename-files.php" +
      "?" +
      "name=" +
      oldName +
      "&" +
      "newName=" +
      newName +
      "&" +
      "path=" +
      path,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      let divRename = document.querySelector(`[data-name="${oldName}"]`);
      divRename.dataset.name = newName;
      divRename.textContent = newName;

      currentFile = newName;
    });
}

function confirmDimissDeleteFile(e) {
  if (e.target.innerText === "No") {
    modalConfirmDelete.classList.remove("modal-confirm-detele-active");
  } else {
    deleteFile(currentFile);
  }
}

function handleFileOrFolder(e) {
  beforeCurrentFile = currentFile;
  currentFile = e.target.dataset.name;

  if (e.target.id !== "newName" && e.target.id !== "confirmChange") {
    if (beforeCurrentFile !== currentFile) {
      document
        .querySelector(`[data-name="${currentFile}"]`)
        .parentElement.classList.add("selected-file");
      showMenuSection(currentFile);
      if (beforeCurrentFile) {
        document
          .querySelector(`[data-name="${beforeCurrentFile}"]`)
          .parentElement.classList.remove("selected-file");
        showMenuSection(beforeCurrentFile);
      }
    } else {
      document
        .querySelector(`[data-name="${currentFile}"]`)
        .parentElement.classList.toggle("selected-file");
      showMenuSection(currentFile);
    }
  }
  showMenuSection(currentFile);
}

function showMenuSection(fileToSelect) {
  let containerCurrentFile = document.querySelector(
    `[data-name="${fileToSelect}"]`
  ).parentElement;
  if (containerCurrentFile.className === "file") {
    nothingSelectedcontainer.classList.remove("nothing-selected-active");
    btnEdit.removeEventListener("click", createInput);
    trash.removeEventListener("click", startDeleteFile);
  } else {
    nothingSelectedcontainer.classList.add("nothing-selected-active");
    btnEdit.addEventListener("click", createInput);
    trash.addEventListener("click", startDeleteFile);
  }
}

function openFile(e) {
  let name = e.target.innerText;
  let extension = e.target.parentElement.dataset.extension;
  let src = savedPath.join("/") + "/" + name;

  if (extension === "jpg" || extension === "png") {
    displayFileOpened.innerHTML = `<img src=${"." + src} alt="img">`;
  } else if (extension === "mp3") {
    displayFileOpened.innerHTML = `<audio src=${"." + src} autoplay controls>
      Tu navegador no admite el elemento <code>audio</code>.</audio>`;
  } else if (extension === "mp4") {
    displayFileOpened.innerHTML = `<video src=${"." + src} autoplay controls>
      Tu navegador no admite el elemento <code>video</code>.</video>`;
  } else if (extension === "txt") {
    fetch("modules/openTxtFile.php" + "?" + "path=" + src, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        displayFileOpened.innerHTML = data;
      });
  } else if (extension === "csv") {
    fetch("modules/openCsvFile.php" + "?" + "path=" + src, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        displayFileOpened.innerHTML = data.join("");
      });
  } else if (extension !== "") {
    displayFileOpened.innerHTML = `You should open a suitable application to read ${extension.toUpperCase()} files`;
  }

  if (extension !== "") {
    modalDisplayFiles.classList.add("modal-display-file-active");
    document.querySelector("header").classList.add("background-modal-active");
    document.querySelector("main").classList.add("background-modal-active");
  } else {
    moveToDirectory(e);
  }
}

function moveToDirectory(e) {
  if (e.target.parentElement.dataset.extension === "") {
    if (currentFile.substring(0, 1) === "/") {
      currentFile = currentFile.substring(1);
    }
    savedPath.push(currentFile);
    path = savedPath.join("/");
    fetch("modules/showFiles.php" + "?" + "path=" + path, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        folder = currentFile;
        routeSection.innerHTML = `${path}`;

        filesBodyContainer.innerHTML = "";
        data.forEach((file) => {
          createElementsToShowFilesRoot(
            file.type,
            file.name,
            file.lastModify,
            file.creationDate,
            file.size,
            file.extension
          );
        });

        showMenuSection(data[0].name);
      });
  }
}

function goHome() {
  path = "/root";
  savedPath = [path];
  fetch("modules/showFiles.php" + "?" + "path=" + path, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      savedPath = [path];
      routeSection.innerHTML = `${path}`;
      filesBodyContainer.innerHTML = "";
      data.forEach((file) => {
        createElementsToShowFilesRoot(
          file.type,
          file.name,
          file.lastModify,
          file.creationDate,
          file.size,
          file.extension
        );
      });

      showMenuSection(data[0].name);
    });
}

function goBackDirectory() {
  let indexRoute = path.lastIndexOf(folder);
  if (indexRoute !== -1) {
    savedPath.pop();
    path = savedPath.join("/");
    fetch("modules/showFiles.php" + "?" + "path=" + path, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        folder = savedPath[savedPath.length - 2];
        routeSection.innerHTML = `${path}`;
        filesBodyContainer.innerHTML = "";
        data.forEach((file) => {
          createElementsToShowFilesRoot(
            file.type,
            file.name,
            file.lastModify,
            file.creationDate,
            file.size,
            file.extension
          );
        });

        showMenuSection(data[0].name);
      });
  }
}

function closeModalOpenedFile() {
  modalDisplayFiles.classList.remove("modal-display-file-active");
  document.querySelector("header").classList.remove("background-modal-active");
  document.querySelector("main").classList.remove("background-modal-active");
  displayFileOpened.innerHTML = "";
}

function searchByName() {
  const textToSearch = inputSearch.value;
  path = savedPath.join("/");

  fetch(
    "modules/searchByName.php" +
      "?" +
      "path=" +
      path +
      "&" +
      "textToSearch=" +
      textToSearch,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      routeSection.innerHTML = `Results of search into ${path.substring(1)}`;
      if (data.length) {
        filesBodyContainer.innerHTML = "";
        data.forEach((file) => {
          let pathFile = file.path.substring(path.length);
          if (pathFile !== "") {
            pathFile += "/";
          }
          createElementsToShowFilesRoot(
            file.type,
            pathFile + file.name,
            file.lastModify,
            file.creationDate,
            file.size,
            file.extension
          );
        });

        showMenuSection(data[0].name);
      } else {
        filesBodyContainer.innerHTML =
          "<div id='folderEmpty'><p>This folder is empty</p></div>";
      }
    });
}

function moveFiles() {
  path = savedPath.join("/");
  let divRename = document.querySelector(`[data-name="${currentFile}"]`);

  if (counter === 0) {
    divRename.parentElement.classList.add("moveFile");
    extension = divRename.parentElement.dataset.extension;
    fileToMove = divRename.dataset.name;
    nameFileToMove = fileToMove.split(".")[0];
    oldSrc = path;
    counter++;
    return;
  } else {
    divRename.parentElement.classList.remove("moveFile");
    counter = 0;
    oldSrc = null;
    fileToMove = null;
  }
}

function pasteFiles() {
  path = savedPath.join("/");
  newSrc = path;

  showPasteIcon();
  counter = 0;

  fetch(
    "modules/move-files.php" +
      "?" +
      "oldSrc=" +
      oldSrc +
      "&" +
      "newSrc=" +
      newSrc +
      "&" +
      "name=" +
      fileToMove +
      "&" +
      "mode=" +
      copy +
      "&" +
      "onlyName=" +
      nameFileToMove +
      "&" +
      "extension=" +
      extension +
      "&" +
      "path=" +
      path,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (copy !== true && oldSrc === newSrc) {
        let divToDelete = document.querySelector(
          `[data-name="${fileToMove}"]`
        ).parentElement;
        divToDelete.remove();
      }
      if (typeof data === "object") {
        createElementsToShowFilesRoot(
          data.type,
          data.name,
          data.lastModify,
          data.creationDate,
          data.size,
          data.extension
        );
      } else {
        console.error(data);
      }
    });
}

function showRecycleBin() {
  savedPath = ["/trash"];
  path = "/trash";
  fetch("modules/showFiles.php" + "?" + "path=" + path, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      routeSection.innerHTML = `${path}`;
      filesBodyContainer.innerHTML = "";

      data.forEach((file) => {
        createElementsToShowFilesRoot(
          file.type,
          file.name,
          file.lastModify,
          file.creationDate,
          file.size,
          file.extension
        );
      });
    });
}
