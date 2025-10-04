<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize inputs
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $complaint = htmlspecialchars($_POST['complaint']);
    $location = htmlspecialchars($_POST['location']);

    // Generate unique complaint ID and time
    $complaintId = uniqid("CMP_");
    $timestamp = date("Y-m-d H:i:s");

    // Prepare data (CSV format)
    $data = [$complaintId, $name, $phone, $complaint, $location, $timestamp];
    $csvLine = implode(",", $data) . "\n";

    // Save complaint in a master file (records.csv)
    file_put_contents("records.csv", $csvLine, FILE_APPEND);

    // Also create a downloadable text file for this complaint
    $fileName = "complaint_" . $complaintId . ".txt";
    $content = "Complaint ID: $complaintId\n";
    $content .= "Name: $name\n";
    $content .= "Phone: $phone\n";
    $content .= "Complaint: $complaint\n";
    $content .= "Location: $location\n";
    $content .= "Filed On: $timestamp\n";

    file_put_contents($fileName, $content);

    echo "<h3>Complaint Registered Successfully!</h3>";
    echo "<p>Your Complaint ID is: <b>$complaintId</b></p>";
    echo "<a href='$fileName' download>Download Complaint Details</a>";
}
?>
