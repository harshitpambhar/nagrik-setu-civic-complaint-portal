<?php
include 'db.php';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $location = $_POST['location'];
    $category = $_POST['category'];
    $date_noticed = $_POST['date_noticed'];
    $citizen_name = $_POST['citizen_name'];
    $phone = $_POST['phone'];

    // Handle image upload
    $image_path = NULL;
    if (!empty($_FILES['image']['name'])) {
        $target_dir = "uploads/";
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        $image_path = $target_dir . time() . "_" . basename($_FILES["image"]["name"]);
        move_uploaded_file($_FILES["image"]["tmp_name"], $image_path);
    }

    // Insert complaint into database
    $sql = "INSERT INTO complaints (title, description, location, category, image, date_noticed, citizen_name, phone)
            VALUES ('$title', '$description', '$location', '$category', '$image_path', '$date_noticed', '$citizen_name', '$phone')";

    if ($conn->query($sql) === TRUE) {
    $complaint_id = $conn->insert_id;
    // Redirect to details page with complaint ID
    header("Location: complaint_details.php?id=" . $complaint_id);
    exit();
} else {
    echo "❌ Error: " . $conn->error;
}

}
?>
