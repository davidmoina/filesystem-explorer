const btnUploadFile = document.getElementById("btnUploadFile");
const modalShowImg = document.querySelector(".modal-show-img");
const btnNewFolder = document.getElementById("btnNewFolder");
const filesBodyContainer = document.querySelector(".files-body");
const trash = document.querySelector(".fa-trash-can");
const btnEdit = document.getElementById("btnEdit");
const modalConfirmDelete = document.querySelector(".modal-confirm-delete");
const textConfirmDelete = document.querySelector(".modal-confirm-delete span");
const btnsConfirmDelete = document.querySelectorAll(
  ".modal-confirm-delete button"
);

const iconsFiles = {
  folder: "fa-solid fa-folder",
  openedFolder: "fa-solid fa-folder-open",
  doc: "fa-solid fa-file-word",
  csv: "fa-solid fa-file-csv",
  jpg: "fa-solid fa-file-image",
  png: "fa-light fa-file-image",
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

btnEdit.addEventListener("click", createInput);
window.addEventListener("load", showFilesRoot);
btnUploadFile.addEventListener("change", uploadFile);
trash.addEventListener("click", startDeleteFile);
btnNewFolder.addEventListener("click", newFolder);
for (let btn of btnsConfirmDelete) {
  btn.addEventListener("click", confirmDimissDeleteFile);
}
function uploadFile() {
  let formData = new FormData();
  formData.append("fileData", btnUploadFile.files[0]);

  fetch("modules/uploadFile.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
        console.log(data);
      }
    });
}

function showFilesRoot() {
  let path = "/root";
  fetch("modules/showFiles.php" + "?" + "path=" + path, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) =>
      data.forEach((file) => {
        createElementsToShowFilesRoot(
          file.type,
          file.name,
          file.lastModify,
          file.creationDate,
          file.size,
          file.extension
        );
      })
    );
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
    `<div class="file" data-extension=${extension}>    
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
}

function newFolder() {
  fetch("modules/create-folder.php", {
    method: "POST",
  });
  // .then(res => res)
}

function startDeleteFile() {
  fetch("modules/validationDelete.php" + "?" + "name=" + currentFile, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data === "ok") {
        textConfirmDelete.textContent = currentFile;
        modalConfirmDelete.classList.add("modal-confirm-detele-active");
      }
    });
}

function deleteFile(currentFile) {
  fetch("modules/deleteFiles.php" + "?" + "name=" + currentFile, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
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
  divRename.innerHTML = `<input id='newName' type='text' name='newName' value=${currentFile}><button id='confirmChange'>OK</button>`;

  const btnConfirmChange = document.getElementById("confirmChange");
  btnConfirmChange.addEventListener("click", obtainName);
}

function obtainName() {
  const inputNewName = document.getElementById("newName");

  let divRename = document.querySelector(
    `[data-name="${oldName}"]`
  ).parentElement;

  if (inputNewName.value.indexOf("." + divRename.dataset.extension) !== -1) {
    newName = inputNewName.value;
  } else {
    newName = inputNewName.value + "." + divRename.dataset.extension;
  }

  renameFile();
}

function renameFile() {
  console.log(currentFile);
  fetch(
    "modules/rename-files.php" +
      "?" +
      "name=" +
      oldName +
      "&" +
      "newName=" +
      newName,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

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
      if (beforeCurrentFile) {
        document
          .querySelector(`[data-name="${beforeCurrentFile}"]`)
          .parentElement.classList.remove("selected-file");
      }
    } else {
      document
        .querySelector(`[data-name="${currentFile}"]`)
        .parentElement.classList.toggle("selected-file");
    }
    console.log(currentFile, beforeCurrentFile);
  }
}
