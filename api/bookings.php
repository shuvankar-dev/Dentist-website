<?php
require_once 'config.php';

$conn = getDBConnection();

// Handle GET request - Fetch all bookings
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM bookings ORDER BY created_at DESC";
    $result = $conn->query($query);
    
    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
    
    echo json_encode($bookings);
}

// Handle POST request - Create new booking
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $treatment = $data['treatment'] ?? '';
    $preferred_date = $data['preferredDate'] ?? '';
    $preferred_time = $data['preferredTime'] ?? '';
    $message = $data['message'] ?? '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($treatment) || empty($preferred_date) || empty($preferred_time)) {
        http_response_code(400);
        echo json_encode(['error' => 'All required fields must be filled']);
        exit();
    }
    
    // Insert booking
    $stmt = $conn->prepare("INSERT INTO bookings (name, email, phone, treatment, preferred_date, preferred_time, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $name, $email, $phone, $treatment, $preferred_date, $preferred_time, $message);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'id' => $conn->insert_id,
            'message' => 'Booking created successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create booking']);
    }
    
    $stmt->close();
}

$conn->close();
?>
