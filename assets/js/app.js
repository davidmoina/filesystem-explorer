const btnUploadFile = document.getElementById("btnUploadFile");
const modalShowImg = document.querySelector(".modal-show-img");
const btnNewFolder = document.getElementById("btnNewFolder");
const filesBodyContainer = document.querySelector(".files-body");
const trash = document.querySelector(".fa-trash-can");
const btnEdit = document.getElementById("btnEdit");

let currentFile;
let beforeCurrentFile;
let newName;
let oldName;

btnEdit.addEventListener("click", createInput)

window.addEventListener("load", showFilesRoot);
btnUploadFile.addEventListener("change", uploadFile);
trash.addEventListener("click", startDeleteFile);
btnNewFolder.addEventListener("click", newFolder);

function uploadFile() {
  let formData = new FormData();
  formData.append("fileData", btnUploadFile.files[0]);

  fetch("modules/uploadFile.php", {
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
          data.size
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
          file.size
        );
      })
    );
}

function createElementsToShowFilesRoot(
  type,
  name,
  lastModify,
  creationDate,
  size
) {
  filesBodyContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="file">    
            <i class="${type}"></i>
            <p class="name" data-name=${name}>${name}</p>
            <p>${lastModify}</p>
            <p>${creationDate}</p>
            <p>${size}</p>
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
  deleteFile(currentFile);
}

function deleteFile(currentFile) {
  fetch("modules/deleteFiles.php" + "?" + "name=" + currentFile, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let divToDelete = document.querySelector(
        `[data-name="${currentFile}"]`
      ).parentElement;
      divToDelete.remove();
    });
}

function createInput() {
  oldName = currentFile;

  let divRename = document.querySelector(`[data-name="${currentFile}"]`);
  divRename.innerHTML = "<input id='newName' type='text' name='newName'><button id='confirmChange'>OK</button>";
  
  const btnConfirmChange = document.getElementById("confirmChange");

  btnConfirmChange.addEventListener("click", obtainName);
}

function obtainName() {
  const inputNewName = document.getElementById("newName");
    
  newName = inputNewName.value;
  console.log(newName);

  renameFile();
}

function renameFile() {
  console.log(currentFile);
  fetch("modules/rename-files.php" + "?" + "name=" + oldName + "&" + "newName=" + newName, {
    method: "GET"
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    let divRename = document.querySelector(`[data-name="${oldName}"]`);
    divRename.dataset.name = newName;
    divRename.textContent = newName;
  })

}

function handleFileOrFolder(e) {
  beforeCurrentFile = currentFile;
  currentFile = e.target.dataset.name;
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
