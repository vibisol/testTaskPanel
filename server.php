<?php
$_POST = json_decode( file_get_contents("php://input"), true );
echo var_dump($_POST);

ini_set('display_errors', 1);
error_reporting(E_ALL);


header('Content-Type: application/json');


$content = trim(file_get_contents("php://input"));


$decoded = json_decode($content, true);

if (is_array($decoded)) {

    $dbFile = 'db.json';
    
    $dbJsonData = file_exists($dbFile) ? json_decode(file_get_contents($dbFile), true) : [];
    if ($dbJsonData === null) {
        $dbJsonData = []; 
    }

    $requestData = [
        'name' => $decoded['name'],
        'email' => $decoded['email']
    ];
    $dbJsonData['requests'][] = $requestData;

    if (file_put_contents($dbFile, json_encode($dbJsonData, JSON_UNESCAPED_UNICODE))) {
        echo json_encode(["status" => "success", "message" => "Data added to db.json"]);
    } else {

        echo json_encode(["status" => "error", "message" => "Could not write to db.json"]);
    }
} else {

    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
}

 ?>