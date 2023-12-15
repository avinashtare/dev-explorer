<?php

date_default_timezone_set('Asia/Kolkata'); // Set the timezone to Indian Standard Time

// check is post request 
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"><html><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><hr><address>Apache/2.4.58 (Win64) OpenSSL/3.1.3 PHP/8.2.12 Server at localhost Port 80 ok</address></body></html>';
    exit;
}

// check screenshort
if (isset($_FILES["screenshot"]) && $_FILES["screenshot"]["error"] == 0 && $_POST["SystemName"]) {

    $SystemName = $_POST["SystemName"];
    $currentDateTime = date('s-i-H-d-m-Y');


    $targetDir = realpath(getcwd()) . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR  . $SystemName . DIRECTORY_SEPARATOR;

    // Create the directory if it doesn't exist
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0755, true); // 0755 is a common permission setting
    }

    $targetFile = $targetDir . $currentDateTime . "--" . rand(0, 500) . ".png";
    if (move_uploaded_file($_FILES["screenshot"]["tmp_name"], $targetFile)) {
        echo "The file has been uploaded successfully.";
        echo "File path: " . $targetFile;
    } else {
        print_r($_FILES["screenshot"]["tmp_name"], $targetFile);
    }
}

?>