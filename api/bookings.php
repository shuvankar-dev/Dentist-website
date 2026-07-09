<?php
require_once 'config.php';

$conn = getDBConnection();

// Handle GET request - Fetch all bookings or doctor-specific bookings
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $doctorId = $_GET['doctor_id'] ?? null;
    
    if ($doctorId) {
        // Fetch bookings for a specific doctor
        $stmt = $conn->prepare("
            SELECT b.*, d.full_name as doctor_name 
            FROM bookings b 
            LEFT JOIN doctors d ON b.doctor_id = d.id 
            WHERE b.doctor_id = ? 
            ORDER BY b.created_at DESC
        ");
        $stmt->bind_param("i", $doctorId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }
        
        echo json_encode($bookings);
        $stmt->close();
    } else {
        // Fetch all bookings with doctor details
        $query = "
            SELECT b.*, d.full_name as doctor_name, d.specialization 
            FROM bookings b 
            LEFT JOIN doctors d ON b.doctor_id = d.id 
            ORDER BY b.created_at DESC
        ";
        $result = $conn->query($query);
        
        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }
        
        echo json_encode($bookings);
    }
}

// Handle POST request - Create new booking
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $doctor_id = $data['doctor_id'] ?? null;
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $treatment = $data['treatment'] ?? '';
    $preferred_date = $data['preferredDate'] ?? '';
    $preferred_time = $data['preferredTime'] ?? '';
    $message = $data['message'] ?? '';
    
    // Validate required fields
    if (empty($doctor_id) || empty($name) || empty($email) || empty($phone) || empty($treatment) || empty($preferred_date) || empty($preferred_time)) {
        http_response_code(400);
        echo json_encode(['error' => 'All required fields must be filled']);
        exit();
    }
    
    // Insert booking
    $stmt = $conn->prepare("INSERT INTO bookings (doctor_id, name, email, phone, treatment, preferred_date, preferred_time, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssssss", $doctor_id, $name, $email, $phone, $treatment, $preferred_date, $preferred_time, $message);
    
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
