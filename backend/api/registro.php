<?php
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar que el rol no sea "supervisor"
    if (isset($data['rol']) && $data['rol'] === 'supervisor') {
        echo json_encode(['status' => 'error', 'message' => 'No puedes crear supervisores desde aquí']);
        exit;
    }

    // Hashear contraseña
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("
        INSERT INTO usuarios (nombre, email, password, rol) 
        VALUES (:nombre, :email, :password, 'empleado')
    ");
    $stmt->bindParam(':nombre', $data['nombre']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':password', $hashedPassword);
    
    try {
        $stmt->execute();
        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al registrar: ' . $e->getMessage()]);
    }
}
?>