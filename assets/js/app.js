const btnUploadFile = document.getElementById("btnUploadFile");
const modalShowImg = document.querySelector(".modal-show-img");

btnUploadFile.addEventListener("change", uploadFile);

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
