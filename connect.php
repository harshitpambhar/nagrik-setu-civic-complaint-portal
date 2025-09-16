<?php
header('Content-Type: application/json');

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$area = $_POST['area'];

// Connect to database
$conn = new mysqli('localhost', 'root', '', 'register');
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO citizenregistration (name, phone, email, password, area) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sisss", $name, $phone, $email, $password, $area);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "name" => $name,
        "phone" => $phone,
        "email" => $email,
        "area" => $area
    ]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
