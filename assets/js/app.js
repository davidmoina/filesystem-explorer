const btnUploadFile = document.getElementById("btnUploadFile");
const modalShowImg = document.querySelector(".modal-show-img");
const btnNewFolder = document.getElementById("btnNewFolder");

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
      console.log(data);
    });
}

function newFolder() {
    fetch("modules/create-folder.php", {
        method: "POST"
    })
    // .then(res => res)
}


