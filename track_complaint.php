<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $complaint_id = trim($_POST['complaint_id']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);

    // Base query
    $sql = "SELECT * FROM complaints WHERE complaint_id = '$complaint_id'";

    if (!empty($email)) {
        $sql .= " AND email = '$email'";
    }
    if (!empty($phone)) {
        $sql .= " AND phone = '$phone'";
    }

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $complaint = $result->fetch_assoc();

        echo "<div class='success-card'>";
        echo "<h3>Status: <span style='color: green;'>" . $complaint['status'] . "</span></h3>";
        echo "<p><strong>Complaint:</strong> " . $complaint['title'] . "</p>";
        echo "<p><strong>Location:</strong> " . $complaint['location'] . "</p>";
        echo "<p><strong>Filed On:</strong> " . $complaint['created_at'] . "</p>";
        echo "<p><strong>Citizen:</strong> " . $complaint['citizen_name'] . " (" . $complaint['phone'] . ")</p>";
        if (!empty($complaint['image'])) {
            echo "<p><img src='" . $complaint['image'] . "' width='250'></p>";
        }
        echo "</div>";
    } else {
        echo "<div class='success-card' style='border-left-color: #dc3545; color: #721c24;'>";
        echo "<h3>Status: <span style='color: #dc3545;'>Not Found</span></h3>";
        echo "<p>No complaint found for ID <strong>$complaint_id</strong>.</p>";
        echo "<p>Please ensure you entered the correct Complaint ID.</p>";
        echo "</div>";
    }
}
?>
