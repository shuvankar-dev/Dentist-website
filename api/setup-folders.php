<?php
// Script to create necessary folders for the application

$folders = [
    '../uploads',
    '../uploads/doctors'
];

foreach ($folders as $folder) {
    if (!file_exists($folder)) {
        if (mkdir($folder, 0777, true)) {
            echo "Created folder: $folder\n";
        } else {
            echo "Failed to create folder: $folder\n";
        }
    } else {
        echo "Folder already exists: $folder\n";
    }
}

echo "\nSetup complete!";
?>
