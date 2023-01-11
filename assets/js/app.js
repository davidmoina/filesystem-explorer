const btnUploadFile = document.getElementById("btnUploadFile");
const modalShowImg = document.querySelector(".modal-show-img");
const btnNewFolder = document.getElementById("btnNewFolder");
const filesBodyContainer = document.querySelector(".files-body");

window.addEventListener("load", showFilesRoot);
btnUploadFile.addEventListener("change", uploadFile);

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
            <p class="name" data-name=${name}>
            <i class="${type}"></i> ${name}
            </p>
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

function handleFileOrFolder(e) {
  let elToDelete = e.target.dataset.name;

  fetch("modules/deleteFiles.php" + "?" + "name=" + elToDelete, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let divToDelete = document.querySelector(
        `[data-name="${elToDelete}"]`
      ).parentElement;
      divToDelete.remove();
    });
}
