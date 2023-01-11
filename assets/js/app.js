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
      createElementsToShowFilesRoot(
        data.type,
        data.name,
        data.lastModify,
        data.creationDate,
        data.size
      );
    });
}

function showFilesRoot() {
  let path = "/root";
  fetch("modules/showFiles.php" + "?" + "path=" + path, {
    method: "GET",
  })
    .then((resp) => resp.json())
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
      <p class="name">
        <i class="${type}"></i> ${name}
      </p>
      <p>${lastModify}</p>
      <p>${creationDate}</p>
      <p>${size}</p>
    </div>`
  );
}

function newFolder() {
  fetch("modules/create-folder.php", {
    method: "POST",
  });
  // .then(res => res)
}
