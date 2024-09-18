<?php
include 'config/conexion.php';

class EventosController {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Crear un nuevo evento
    public function crearEvento($nombre, $descripcion, $fecha, $ubicacion) {
        $sql = "INSERT INTO Eventos (nombre, descripcion, fecha, ubicacion) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$nombre, $descripcion, $fecha, $ubicacion]);
        return $this->conn->lastInsertId();
    }

    // Obtener todos los eventos
    public function obtenerEventos() {
        $sql = "SELECT * FROM Eventos";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Actualizar un evento
    public function actualizarEvento($evento_id, $nombre, $descripcion, $fecha, $ubicacion) {
        $sql = "UPDATE Eventos SET nombre = ?, descripcion = ?, fecha = ?, ubicacion = ? WHERE evento_id = ?";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([$nombre, $descripcion, $fecha, $ubicacion, $evento_id]);
    }

    // Eliminar un evento
    public function eliminarEvento($evento_id) {
        $sql = "DELETE FROM Eventos WHERE evento_id = ?";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([$evento_id]);
    }
}
?>
