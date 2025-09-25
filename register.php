<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Sanitize inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $phone = preg_replace('/[^0-9]/', '', $_POST['phone']); // keep digits only
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = htmlspecialchars(trim($_POST['password']));
    $area = htmlspecialchars(trim($_POST['area']));

    // 2. Validate inputs
    if (!preg_match("/^[a-zA-Z\s]+$/", $name)) {
        die("❌ Invalid name format.");
    }
    if (!preg_match("/^[0-9]{10}$/", $phone)) {
        die("❌ Phone number must be 10 digits.");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("❌ Invalid email format.");
    }
    if (strlen($password) < 8) {
        die("❌ Password must be at least 8 characters.");
    }

    // 3. Hash password (never store plain text!)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // 4. Store in a text file (later replace with MySQL)
    $data = $name . " | " . $phone . " | " . $email . " | " . $hashedPassword . " | " . $area . "\n";
    file_put_contents("citizens.txt", $data, FILE_APPEND);

    // 5. Confirm success
    echo "<h2>✅ Registration Successful</h2>";
    echo "<p>Name: $name</p>";
    echo "<p>Phone: $phone</p>";
    echo "<p>Email: $email</p>";
    echo "<p>Area: $area</p>";
    echo "<p>Your account has been created securely.</p>";
} else {
    echo "❌ Invalid Request Method.";
}
?>
