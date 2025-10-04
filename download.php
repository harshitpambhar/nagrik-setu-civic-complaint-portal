<?php
include 'db.php';

if (!isset($_GET['id']) || !isset($_GET['type'])) {
    die("Invalid request.");
}

$id = intval($_GET['id']);
$type = $_GET['type'];

$sql = "SELECT * FROM complaints WHERE complaint_id = $id";
$result = $conn->query($sql);

if ($result === false) {
    die("Database query failed: " . $conn->error);
}

if ($result->num_rows == 0) {
    die("Complaint not found.");
}

$row = $result->fetch_assoc();

// Prepare common complaint text
$content = "Complaint ID: {$row['complaint_id']}\n";
$content .= "Title: {$row['title']}\n";
$content .= "Description: {$row['description']}\n";
$content .= "Category: {$row['category']}\n";
$content .= "Location: {$row['location']}\n";
$content .= "Date Noticed: {$row['date_noticed']}\n";
$content .= "Citizen: {$row['citizen_name']} ({$row['phone']})\n";

if (!empty($row['image'])) {
    $content .= "Image: {$row['image']}\n";
}

switch($type) {
    case "txt":
        header("Content-Type: text/plain");
        header("Content-Disposition: attachment; filename=complaint_{$row['complaint_id']}.txt");
        echo $content;
        break;

    case "csv":
        header("Content-Type: text/csv");
        header("Content-Disposition: attachment; filename=complaint_{$row['complaint_id']}.csv");
        echo "Complaint ID,Title,Description,Category,Location,Date Noticed,Citizen,Phone,Image\n";
        echo "{$row['complaint_id']},{$row['title']},{$row['description']},{$row['category']},{$row['location']},{$row['date_noticed']},{$row['citizen_name']},{$row['phone']},{$row['image']}\n";
        break;

    case "pdf":
        $fpdfPath = __DIR__ . "/fpdf.php";
        if (!file_exists($fpdfPath)) {
            die("FPDF library not found. Please ensure fpdf.php is present in " . __DIR__);
        }
        require_once($fpdfPath);
        // Check for correct class name and case sensitivity
        if (!class_exists('FPDF')) {
            die("FPDF class not loaded. Check fpdf.php for errors and ensure the class name is 'FPDF'.");
        }
        $pdf = new FPDF();
        $pdf->AddPage();
        // SetFont method must be called after AddPage and with correct parameters
        $pdf->SetFont("Arial", "B", 16);
        $pdf->Cell(0, 10, "Complaint Details", 0, 1, "C");
        $pdf->SetFont("Arial", "", 12);
        foreach (explode("\n", $content) as $line) {
            $pdf->MultiCell(0, 8, $line);
        }
        $pdf->Output("D", "complaint_{$row['complaint_id']}.pdf");
        break;

    default:
        echo "Invalid file type.";
}
?>
