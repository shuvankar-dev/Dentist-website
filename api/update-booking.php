<?php
require_once 'config.php';

$conn = getDBConnection();

// Handle PUT request - Update booking status
if ($_SERVER['REQUEST_METHOD'] === 'PUT' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $id = $data['id'] ?? '';
    $status = $data['status'] ?? '';
    
    // Validate required fields
    if (empty($id) || empty($status)) {
        http_response_code(400);
        echo json_encode(['error' => 'ID and status are required']);
        exit();
    }
    
    // Validate status value
    if (!in_array($status, ['pending', 'confirmed', 'cancelled'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid status value']);
        exit();
    }
    
    // Update booking status
    $stmt = $conn->prepare("UPDATE bookings SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Booking status updated successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update booking status']);
    }
    
    $stmt->close();
}

$conn->close();
?>
