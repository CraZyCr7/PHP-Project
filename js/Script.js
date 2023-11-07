document.addEventListener("DOMContentLoaded", function() {
    const uploadForm = document.getElementById("upload-form");
    const fileInput = document.getElementById("file");
    const uploadButton = document.getElementById("upload-button");
    const uploadStatus = document.getElementById("upload-status");
    const filePreview = document.getElementById("file-preview");
    const fileInfo = document.getElementById("file-info");
    const fileName = document.getElementById("file-name");
    const fileSize = document.getElementById("file-size");
    const uploadProgress = document.getElementById("upload-progress");
    const errorElement = document.getElementById("error");

    // Function to format file size
    function formatFileSize(bytes) {
        if (bytes < 1024) {
            return bytes + " B";
        } else if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(2) + " KB";
        } else if (bytes < 1024 * 1024 * 1024) {
            return (bytes / (1024 * 1024)).toFixed(2) + " MB";
        } else {
            return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
        }
    }

    fileInput.addEventListener("change", function() {
        const file = fileInput.files[0];
        if (file) {
            // Display file attributes
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size); // Format the file size

            // Show the progress bar and file info
            uploadProgress.style.display = "block";
            fileInfo.style.display = "block";
            errorElement.style.display = "none"; // Hide the error message

            // Preview the file (if it's an image)
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function(e) {
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
            uploadProgress.style.display = "none";
            fileInfo.style.display = "none";
        }
    });

    uploadForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent the default form submission
        const file = fileInput.files[0];
        if (file) {
            uploadButton.disabled = true; // Disable the button during upload

            const formData = new FormData();
            formData.append("file", file);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "uploadScript.php", true);

            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    uploadProgress.value = percentComplete; // Update the progress bar
                    uploadStatus.textContent = `Uploading: ${percentComplete.toFixed(2)}%`;
                    uploadButton.textContent = `Uploading... ${percentComplete.toFixed(2)}%`;
                }
            };

            xhr.onload = function() {
                if (xhr.status === 200) {
                    uploadStatus.textContent = xhr.responseText; // Set the upload status
                } else {
                    uploadStatus.textContent = "Error uploading file." + xhr.statusText;
                }
                uploadButton.disabled = false; // Re-enable the button
                uploadButton.textContent = "Upload";
            };

            xhr.send(formData);
        } else {
            errorElement.textContent = "Please select a file.";
            errorElement.style.display = "block"; // Show the error message
        }
    });
});
