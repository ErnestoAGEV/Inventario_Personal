<?php
header("Content-Type: application/json");
$host = 'localhost';
$dbname = 'gestion_inventario';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $e->getMessage()]));
}
?>