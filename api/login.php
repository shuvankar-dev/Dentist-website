<?php
require_once 'config.php';

$conn = getDBConnection();

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$userType = $data['user_type'] ?? 'admin'; // 'admin' or 'doctor'

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password are required']);
    exit();
}

if ($userType === 'doctor') {
    // Query doctor user
    $stmt = $conn->prepare("
        SELECT id, username, full_name, email, specialization, profile_image, is_available 
        FROM doctors 
        WHERE username = ? AND password = ?
    ");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $doctor = $result->fetch_assoc();
        
        if (!$doctor['is_available']) {
            http_response_code(403);
            echo json_encode(['error' => 'Your account has been deactivated. Please contact admin.']);
            exit();
        }
        
        echo json_encode([
            'success' => true,
            'user_type' => 'doctor',
            'user' => $doctor
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
} else {
    // Query admin user
    $stmt = $conn->prepare("SELECT id, username FROM admin_users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode([
            'success' => true,
            'user_type' => 'admin',
            'user' => $user
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}

$stmt->close();
$conn->close();
?>
