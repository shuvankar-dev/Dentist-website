<?php
require_once 'config.php';

$conn = getDBConnection();

// Handle POST request - Change password
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $doctorId = $data['doctor_id'] ?? null;
    $currentPassword = $data['current_password'] ?? '';
    $newPassword = $data['new_password'] ?? '';
    
    if (!$doctorId || empty($currentPassword) || empty($newPassword)) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
        exit();
    }
    
    // Verify current password
    $stmt = $conn->prepare("SELECT id FROM doctors WHERE id = ? AND password = ?");
    $stmt->bind_param("is", $doctorId, $currentPassword);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Current password is incorrect']);
        exit();
    }
    $stmt->close();
    
    // Update password
    $updateStmt = $conn->prepare("UPDATE doctors SET password = ? WHERE id = ?");
    $updateStmt->bind_param("si", $newPassword, $doctorId);
    
    if ($updateStmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Password changed successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to change password']);
    }
    
    $updateStmt->close();
}

$conn->close();
?>
