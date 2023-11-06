<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Downloads</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        h1 {
            text-align: center;
        }

        ul {
            list-style-type: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        li {
            padding: 10px 20px;
            margin: 10px;
            flex-basis: calc(25% - 20px);
            /* 3 columns per row */
            max-width: calc(25% - 20px);
            min-width: calc(25% - 20px);
            box-sizing: border-box;
            text-align: center;
            background-color: #f9f9f9;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            word-wrap: break-word;
            border-radius: 12px;

        }

        a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
            background-color: orangered;
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;


        }
    </style>
</head>

<body>
    <h1>Files Available for Download</h1>
    <ul>
        <?php
        $folderPath = "Files"; // Replace with the path to your "Files" folder
  

        // Check if the folder exists and is a directory
        if (is_dir($folderPath)) {
            
            // Open the directory
            if ($dh = opendir($folderPath)) {
                while (($file = readdir($dh)) !== false) {
                    // Skip "." and ".." entries
                    if ($file != "." && $file != "..") {
                        $filePath = $folderPath . "/" . $file;
                        $fileSize = filesize($filePath);
                        $fileType = mime_content_type($filePath);
        ?>

                        <li>
                            <h3>
                                <?php echo $file; ?>
                            </h3>
                            <p><?php echo $fileSize; ?> bytes | <?php echo $fileType; ?></p>
                            <a href="<?php echo $filePath; ?>" class="download">Download</a>
                        </li>

        <?php
                    }
                }
                closedir($dh);
            }
        } else {
            echo "<p>The 'Files' folder does not exist or is not a directory.</p>";
        }
        ?>
    </ul>
</body>

</html>
