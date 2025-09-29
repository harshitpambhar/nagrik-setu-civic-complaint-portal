<?php
$host = "localhost";
$user = "root";   // change if needed
$pass = "";       // add password if any
$dbname = "nagriksetu";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}
?>
