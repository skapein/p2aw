<?php
require_once('../config/conexion.php');

class Evento {
    // Obtener todos los eventos
    public function todos() {
        $con = new Conexion();
        $sql = "SELECT * FROM eventos";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Buscar un evento por ID
    public function buscar($evento_id) {
        $con = new Conexion();
        $sql = "SELECT * FROM eventos WHERE evento_id = $evento_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Obtener un evento específico
    public function uno($evento_id) {
        $con = new Conexion();
        $sql = "SELECT * FROM eventos WHERE evento_id = $evento_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Insertar un nuevo evento
    public function insertar($nombre, $descripcion, $fecha, $ubicacion) {
        $con = new Conexion();
        $sql = "INSERT INTO eventos (nombre, descripcion, fecha, ubicacion) VALUES ('$nombre', '$descripcion', '$fecha', '$ubicacion')";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Actualizar un evento
    public function actualizar($evento_id, $nombre, $descripcion, $fecha, $ubicacion) {
        $con = new Conexion();
        $sql = "UPDATE eventos SET nombre = '$nombre', descripcion = '$descripcion', fecha = '$fecha', ubicacion = '$ubicacion' WHERE evento_id = $evento_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Eliminar un evento
    public function eliminar($evento_id) {
        $con = new Conexion();
        $sql = "DELETE FROM eventos WHERE evento_id = $evento_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }
}
?>
