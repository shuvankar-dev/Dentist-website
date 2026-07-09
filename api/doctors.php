<?php
require_once 'config.php';

$conn = getDBConnection();

// Handle GET request - Fetch all doctors or specific doctor
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $doctorId = $_GET['id'] ?? null;
    
    if ($doctorId) {
        // Fetch specific doctor with availability
        $stmt = $conn->prepare("
            SELECT d.*, 
                   GROUP_CONCAT(
                       CONCAT(da.day_of_week, ':', da.start_time, '-', da.end_time, ':', da.is_active)
                       SEPARATOR '|'
                   ) as availability
            FROM doctors d
            LEFT JOIN doctor_availability da ON d.id = da.doctor_id
            WHERE d.id = ?
            GROUP BY d.id
        ");
        $stmt->bind_param("i", $doctorId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $doctor = $result->fetch_assoc();
            
            // Parse availability
            $availabilityArray = [];
            if ($doctor['availability']) {
                foreach (explode('|', $doctor['availability']) as $slot) {
                    list($day, $time, $active) = explode(':', $slot);
                    list($start, $end) = explode('-', $time);
                    $availabilityArray[] = [
                        'day' => $day,
                        'start_time' => $start,
                        'end_time' => $end,
                        'is_active' => (bool)$active
                    ];
                }
            }
            $doctor['availability_schedule'] = $availabilityArray;
            unset($doctor['availability']);
            unset($doctor['password']); // Never send password to frontend
            
            echo json_encode($doctor);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Doctor not found']);
        }
        $stmt->close();
    } else {
        // Fetch all doctors
        $query = "SELECT id, full_name, email, phone, specialization, qualifications, 
                         experience_years, profile_image, bio, is_available, created_at
                  FROM doctors 
                  ORDER BY full_name ASC";
        $result = $conn->query($query);
        
        $doctors = [];
        while ($row = $result->fetch_assoc()) {
            $doctors[] = $row;
        }
        
        echo json_encode($doctors);
    }
}

// Handle POST request - Create new doctor (Admin only)
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $full_name = $data['full_name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $specialization = $data['specialization'] ?? '';
    $qualifications = $data['qualifications'] ?? '';
    $experience_years = $data['experience_years'] ?? 0;
    $profile_image = $data['profile_image'] ?? '';
    $bio = $data['bio'] ?? '';
    
    // Auto-generate password (8 characters: letters and numbers)
    $password = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 8);
    
    // Validate required fields
    if (empty($username) || empty($full_name) || empty($email)) {
        http_response_code(400);
        echo json_encode(['error' => 'Username, full name, and email are required']);
        exit();
    }
    
    // Check if username or email already exists
    $checkStmt = $conn->prepare("SELECT id FROM doctors WHERE username = ? OR email = ?");
    $checkStmt->bind_param("ss", $username, $email);
    $checkStmt->execute();
    if ($checkStmt->get_result()->num_rows > 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Username or email already exists']);
        exit();
    }
    $checkStmt->close();
    
    // Insert doctor
    $stmt = $conn->prepare("
        INSERT INTO doctors (username, password, full_name, email, phone, specialization, 
                           qualifications, experience_years, profile_image, bio) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("sssssssiss", $username, $password, $full_name, $email, $phone, 
                      $specialization, $qualifications, $experience_years, $profile_image, $bio);
    
    if ($stmt->execute()) {
        $newDoctorId = $conn->insert_id;
        echo json_encode([
            'success' => true,
            'id' => $newDoctorId,
            'username' => $username,
            'password' => $password, // Return generated password to admin
            'message' => 'Doctor added successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to add doctor: ' . $stmt->error]);
    }
    
    $stmt->close();
}

// Handle PUT request - Update doctor
elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $id = $data['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Doctor ID is required']);
        exit();
    }
    
    $fields = [];
    $types = '';
    $values = [];
    
    // Build dynamic update query
    $allowedFields = ['username', 'password', 'full_name', 'email', 'phone', 'specialization', 
                      'qualifications', 'experience_years', 'profile_image', 'bio', 'is_available'];
    
    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            $fields[] = "$field = ?";
            if ($field === 'experience_years' || $field === 'is_available') {
                $types .= 'i';
            } else {
                $types .= 's';
            }
            $values[] = $data[$field];
        }
    }
    
    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(['error' => 'No fields to update']);
        exit();
    }
    
    $types .= 'i';
    $values[] = $id;
    
    $sql = "UPDATE doctors SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$values);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Doctor updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update doctor']);
    }
    
    $stmt->close();
}

// Handle DELETE request - Delete doctor
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Doctor ID is required']);
        exit();
    }
    
    $stmt = $conn->prepare("DELETE FROM doctors WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Doctor deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Doctor not found']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete doctor']);
    }
    
    $stmt->close();
}

$conn->close();
?>
