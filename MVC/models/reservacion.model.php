<?php
require_once('../config/conexion.php');

class Reservacion {
    // Obtener todas las reservaciones
    public function todas() {
        $con = new Conexion();
        $sql = "SELECT * FROM reservaciones";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Buscar una reservación por ID
    public function buscar($reservacion_id) {
        $con = new Conexion();
        $sql = "SELECT * FROM reservaciones WHERE reservacion_id = $reservacion_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Obtener una reservación específica
    public function una($reservacion_id) {
        $con = new Conexion();
        $sql = "SELECT * FROM reservaciones WHERE reservacion_id = $reservacion_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Insertar una nueva reservación
    public function insertar($evento_id, $cliente_id, $fecha_reservacion) {
        $con = new Conexion();
        $sql = "INSERT INTO reservaciones (evento_id, cliente_id, fecha_reservacion) VALUES ('$evento_id', '$cliente_id', '$fecha_reservacion')";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Actualizar una reservación
    public function actualizar($reservacion_id, $evento_id, $cliente_id, $fecha_reservacion) {
        $con = new Conexion();
        $sql = "UPDATE reservaciones SET evento_id = '$evento_id', cliente_id = '$cliente_id', fecha_reservacion = '$fecha_reservacion' WHERE reservacion_id = $reservacion_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Eliminar una reservación
    public function eliminar($reservacion_id) {
        $con = new Conexion();
        $sql = "DELETE FROM reservaciones WHERE reservacion_id = $reservacion_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }
}
?>
