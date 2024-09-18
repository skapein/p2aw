<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/cliente.model.php');
error_reporting(0);
$clientes = new Cliente;

switch ($_GET["op"]) {
    case 'buscar': // Buscar un cliente específico
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Client ID not specified."]);
            exit();
        }
        $texto = intval($_POST["texto"]);
        $datos = array();
        $datos = $clientes->buscar($texto);
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todos': // Cargar todos los clientes
        $datos = array();
        $datos = $clientes->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Obtener un cliente específico
        if (!isset($_POST["idCliente"])) {
            echo json_encode(["error" => "Client ID not specified."]);
            exit();
        }
        $idCliente = intval($_POST["idCliente"]);
        $datos = array();
        $datos = $clientes->uno($idCliente);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Insertar un cliente
        if (!isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["email"]) || !isset($_POST["telefono"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];

        $datos = array();
        $datos = $clientes->insertar($nombre, $apellido, $email, $telefono);
        echo json_encode($datos);
        break;

    case 'actualizar': // Actualizar un cliente
        if (!isset($_POST["idCliente"]) || !isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["email"]) || !isset($_POST["telefono"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idCliente = intval($_POST["idCliente"]);
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];

        $datos = array();
        $datos = $clientes->actualizar($idCliente, $nombre, $apellido, $email, $telefono);
        echo json_encode($datos);
        break;

    case 'eliminar': // Eliminar un cliente
        if (!isset($_POST["idCliente"])) {
            echo json_encode(["error" => "Client ID not specified."]);
            exit();
        }
        $idCliente = intval($_POST["idCliente"]);
        $datos = array();
        $datos = $clientes->eliminar($idCliente);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
?>
