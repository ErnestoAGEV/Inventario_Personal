<?php
require_once '../config/db.php';

session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'No autorizado']);
    exit;
}

$user_id = $_SESSION['user_id'];
$rol = $_SESSION['rol'];

// Obtener inventario
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($rol === 'supervisor') {
        $stmt = $conn->query("SELECT * FROM inventario");
    } else {
        $stmt = $conn->prepare("SELECT * FROM inventario WHERE usuario_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
    }
    $stmt->execute();
    $inventario = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($inventario);
}

// Agregar ítem
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $item = $data['item'];
    $cantidad = $data['cantidad'];

    $stmt = $conn->prepare("INSERT INTO inventario (usuario_id, item, cantidad) VALUES (:user_id, :item, :cantidad)");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':item', $item);
    $stmt->bindParam(':cantidad', $cantidad);
    $stmt->execute();
    echo json_encode(['status' => 'success']);
}

// Eliminar ítem
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM inventario WHERE id = :id AND usuario_id = :user_id");
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    echo json_encode(['status' => 'success']);
}
?>