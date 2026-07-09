<?php
require_once 'config.php';

// Create uploads directory if it doesn't exist
$uploadDir = '../uploads/doctors/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Handle POST request - Upload image
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'No image uploaded or upload error']);
        exit();
    }
    
    $file = $_FILES['image'];
    $fileSize = $file['size'];
    $fileTmpName = $file['tmp_name'];
    $fileType = $file['type'];
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // Validate file type
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if (!in_array($fileExtension, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.']);
        exit();
    }
    
    // Validate file size (5MB max)
    if ($fileSize > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'File size too large. Maximum 5MB allowed.']);
        exit();
    }
    
    // Generate unique filename
    $newFileName = 'doctor_' . uniqid() . '_' . time() . '.' . $fileExtension;
    $uploadPath = $uploadDir . $newFileName;
    
    // Move uploaded file
    if (move_uploaded_file($fileTmpName, $uploadPath)) {
        $imageUrl = 'http://localhost/dental-care/uploads/doctors/' . $newFileName;
        echo json_encode([
            'success' => true,
            'image_url' => $imageUrl,
            'filename' => $newFileName
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to upload image']);
    }
}
?>
