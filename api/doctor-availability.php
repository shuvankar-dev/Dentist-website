<?php
require_once 'config.php';

$conn = getDBConnection();

// GET - Fetch doctor's availability
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $doctorId = $_GET['doctor_id'] ?? null;
    
    if (!$doctorId) {
        http_response_code(400);
        echo json_encode(['error' => 'Doctor ID is required']);
        exit();
    }
    
    $stmt = $conn->prepare("
        SELECT id, day_of_week, start_time, end_time, is_active 
        FROM doctor_availability 
        WHERE doctor_id = ?
        ORDER BY FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
    ");
    $stmt->bind_param("i", $doctorId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $availability = [];
    while ($row = $result->fetch_assoc()) {
        $availability[] = $row;
    }
    
    echo json_encode($availability);
    $stmt->close();
}

// POST - Add availability slot
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $doctorId = $data['doctor_id'] ?? null;
    $dayOfWeek = $data['day_of_week'] ?? null;
    $startTime = $data['start_time'] ?? null;
    $endTime = $data['end_time'] ?? null;
    
    if (!$doctorId || !$dayOfWeek || !$startTime || !$endTime) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
        exit();
    }
    
    $stmt = $conn->prepare("
        INSERT INTO doctor_availability (doctor_id, day_of_week, start_time, end_time) 
        VALUES (?, ?, ?, ?)
    ");
    $stmt->bind_param("isss", $doctorId, $dayOfWeek, $startTime, $endTime);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'id' => $conn->insert_id,
            'message' => 'Availability added successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to add availability']);
    }
    
    $stmt->close();
}

// PUT - Update availability
elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $id = $data['id'] ?? null;
    $isActive = isset($data['is_active']) ? $data['is_active'] : null;
    
    if (!$id || $isActive === null) {
        http_response_code(400);
        echo json_encode(['error' => 'ID and is_active status are required']);
        exit();
    }
    
    $stmt = $conn->prepare("UPDATE doctor_availability SET is_active = ? WHERE id = ?");
    $stmt->bind_param("ii", $isActive, $id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Availability updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update availability']);
    }
    
    $stmt->close();
}

// DELETE - Remove availability slot
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Availability ID is required']);
        exit();
    }
    
    $stmt = $conn->prepare("DELETE FROM doctor_availability WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Availability deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete availability']);
    }
    
    $stmt->close();
}

$conn->close();
?>
