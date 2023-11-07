<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Share Files</title>
    <link rel="stylesheet" href="Styles/style.css">
    <script src="js/Script.js"></script>

</head>

<body>

    <nav>
        <h1>Share Files</h1>
        <ul>
            <li>
                <a href="Download.php">Download</a>
            </li>
            <li>
                <a href="uploadfiles.php">Uploades</a>
            </li>
        </ul>
    </nav>
    <div class="container">
        <div class="Download-Container">
            <form id="upload-form" enctype="multipart/form-data">
                <h2>Upload File</h2>
                <label For="file" class="custom-file-upload">
                    <img src="https://static.vecteezy.com/system/resources/previews/004/968/608/original/upload-or-add-a-file-concept-illustration-flat-design-eps10-simple-and-modern-graphic-element-for-landing-page-empty-state-ui-infographic-button-icon-vector.jpg" width="100px" alt="">
                </label>
                <input type="file" name="file" id="file" class="hidden-file-input" hidden>
                <div id="file-preview-container">
                    <img id="file-preview" src="#" alt="File Preview" style="display: none;">
                </div>
                <button type="submit" name="submit" id="upload-button">Upload</button>
                <p id="error" style="color: red; display: none;">No file selected.</p>

                <a href="Download.php">Download Files</a>
            </form>
            <div id="file-info" style="display: none;">
                <p>File Name: <span id="file-name"></span></p>
                <p>File Size: <span id="file-size"></span></p>
                <progress id="upload-progress" value="0" max="100" style="display: none;"></progress>
                <div id="upload-status"></div>
            </div>
        </div>
        <div class="share">
            <h2>
                Share
            </h2>
            <p>Connect to the same network and enjoy!</p>
            <?php
            // Fetch ipv4 
            $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
            // echo "<h3>Hostname: $hostname</h3>";
            echo "<h4>" . $_SERVER['REMOTE_ADDR'] . " | " .  gethostbyname($hostname) . "</h4>";
            ?>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://<?php echo $_SERVER['REMOTE_ADDR'] ?>" alt="QrCode">
        </div>
    </div>
</body>

</html>