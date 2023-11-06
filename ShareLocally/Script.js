document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("upload-form");
    const fileInput = document.getElementById("file");
    const uploadButton = document.getElementById("upload-button");
    const uploadStatus = document.getElementById("upload-status");
    const filePreview = document.getElementById("file-preview");
    const fileInfo = document.getElementById("file-info");
    const fileName = document.getElementById("file-name");
    const fileSize = document.getElementById("file-size");
    const uploadProgress = document.getElementById("upload-progress");

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            // Display file attributes
            fileName.textContent = file.name;
            fileSize.textContent = file.size;

            // Preview the file (if it's an image)
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    filePreview.src = e.target.result;
                    filePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            } else {
                filePreview.style.display = "none";
            }
        } else {
            fileName.textContent = "";
            fileSize.textContent = "";
            filePreview.style.display = "none";
        }
    });

    uploadForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission
        const file = fileInput.files[0];
        if (file) {
            uploadButton.disabled = true; // Disable the button during upload
            uploadButton.textContent = "Uploading...";
            const formData = new FormData();
            formData.append("file", file);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "uploadScript.php", true);

            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    uploadProgress.value = percentComplete; // Update the progress bar
                    uploadStatus.textContent = `Uploading: ${percentComplete.toFixed(2)}%`;
                }
            };

            xhr.onload = function () {
                if (xhr.status === 200) {
                    uploadStatus.textContent = xhr.responseText; // Set the upload status
                } else {
                    uploadStatus.textContent = "Error uploading file.";
                }
                uploadButton.disabled = false; // Re-enable the button
                uploadButton.textContent = "Upload";
            };

            xhr.send(formData);
        } else {
            uploadStatus.textContent = "Please select a file.";
        }
    });
});
