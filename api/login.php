<?php
require_once 'config.php';

$conn = getDBConnection();

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password are required']);
    exit();
}

// Query admin user
$stmt = $conn->prepare("SELECT id, username FROM admin_users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode([
        'success' => true,
        'user' => $user
    ]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}

$stmt->close();
$conn->close();
?>
