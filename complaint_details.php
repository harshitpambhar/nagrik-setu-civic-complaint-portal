<?php
include 'db.php';

if (!isset($_GET['id'])) {
    die("Complaint ID not provided.");
}

$id = intval($_GET['id']);
$sql = "SELECT * FROM complaints WHERE complaint_id = $id";
$result = $conn->query($sql);

if (!$result) {
    die("Database query failed: " . $conn->error);
}
if ($result->num_rows == 0) {
    die("Complaint not found.");
}

$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Complaint Details – Nagrik Setu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f7fa;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 70%;
            margin: 40px auto;
            background: #fff;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
        }
        h2 {
            color: #0275d8;
            text-align: center;
        }
        .complaint-details p {
            font-size: 1.1rem;
            margin: 8px 0;
            line-height: 1.5;
        }
        .complaint-details span {
            font-weight: bold;
            color: #333;
        }
        .download-buttons {
            margin-top: 20px;
            text-align: center;
        }
        .download-buttons a {
            display: inline-block;
            margin: 8px;
            padding: 10px 18px;
            background: #0275d8;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            transition: 0.2s;
        }
        .download-buttons a:hover {
            background: #025aa5;
        }
        img {
            margin-top: 15px;
            max-width: 200px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Complaint Details</h2>
        <div class="complaint-details">
            <p><span>Complaint ID:</span> <?= $row['complaint_id'] ?></p>
            <p><span>Title:</span> <?= htmlspecialchars($row['title']) ?></p>
            <p><span>Description:</span> <?= htmlspecialchars($row['description']) ?></p>
            <p><span>Category:</span> <?= htmlspecialchars($row['category']) ?></p>
            <p><span>Location:</span> <?= htmlspecialchars($row['location']) ?></p>
            <p><span>Date Noticed:</span> <?= $row['date_noticed'] ?></p>
            <p><span>Citizen:</span> <?= htmlspecialchars($row['citizen_name']) ?> (<?= htmlspecialchars($row['phone']) ?>)</p>
            <?php if ($row['image']) { ?>
                <p><span>Uploaded Image:</span><br><img src="<?= $row['image'] ?>" alt="Complaint Image"></p>
            <?php } ?>
        </div>

        <div class="download-buttons">
            <a href="download.php?id=<?= $row['complaint_id'] ?>&type=txt">Download TXT</a>
            <a href="download.php?id=<?= $row['complaint_id'] ?>&type=csv">Download CSV</a>
            <a href="download.php?id=<?= $row['complaint_id'] ?>&type=pdf">Download PDF</a>
        </div>
    </div>
</body>
</html>
