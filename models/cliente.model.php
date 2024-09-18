<?php
require_once('../config/conexion.php');

class Cliente {
    // Obtener todos los clientes
    public function todos() {
        $con = new Conexion();
        $sql = "SELECT * FROM clientes";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Buscar un cliente por ID
    public function buscar($cliente_id) {
        $con = new Conexion();
        $sql = "SELECT * FROM clientes WHERE cliente_id = $cliente_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Obtener un cliente específico
    public function uno($cliente_id) {
        $con = new Conexion();
        $sql = "SELECT * FROM clientes WHERE cliente_id = $cliente_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Insertar un nuevo cliente
    public function insertar($nombre, $apellido, $email, $telefono) {
        $con = new Conexion();
        $sql = "INSERT INTO clientes (nombre, apellido, email, telefono) VALUES ('$nombre', '$apellido', '$email', '$telefono')";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Actualizar un cliente
    public function actualizar($cliente_id, $nombre, $apellido, $email, $telefono) {
        $con = new Conexion();
        $sql = "UPDATE clientes SET nombre = '$nombre', apellido = '$apellido', email = '$email', telefono = '$telefono' WHERE cliente_id = $cliente_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }

    // Eliminar un cliente
    public function eliminar($cliente_id) {
        $con = new Conexion();
        $sql = "DELETE FROM clientes WHERE cliente_id = $cliente_id";
        $query = $con->conectar()->query($sql);
        return $query;
    }
}
?>
