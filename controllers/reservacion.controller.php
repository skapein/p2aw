<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/reservacion.model.php');
error_reporting(0);
$reservaciones = new Reservacion;

switch ($_GET["op"]) {
    case 'buscar': // Buscar una reservación específica
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Reservation ID not specified."]);
            exit();
        }
        $texto = intval($_POST["texto"]);
        $datos = array();
        $datos = $reservaciones->buscar($texto);
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todas': // Cargar todas las reservaciones
        $datos = array();
        $datos = $reservaciones->todas();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todas[] = $row;
        }
        echo json_encode($todas);
        break;

    case 'una': // Obtener una reservación específica
        if (!isset($_POST["idReservacion"])) {
            echo json_encode(["error" => "Reservation ID not specified."]);
            exit();
        }
        $idReservacion = intval($_POST["idReservacion"]);
        $datos = array();
        $datos = $reservaciones->una($idReservacion);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Insertar una nueva reservación
        if (!isset($_POST["evento_id"]) || !isset($_POST["cliente_id"]) || !isset($_POST["fecha_reservacion"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $evento_id = $_POST["evento_id"];
        $cliente_id = $_POST["cliente_id"];
        $fecha_reservacion = $_POST["fecha_reservacion"];

        $datos = array();
        $datos = $reservaciones->insertar($evento_id, $cliente_id, $fecha_reservacion);
        echo json_encode($datos);
        break;

    case 'actualizar': // Actualizar una reservación
        if (!isset($_POST["idReservacion"]) || !isset($_POST["evento_id"]) || !isset($_POST["cliente_id"]) || !isset($_POST["fecha_reservacion"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idReservacion = intval($_POST["idReservacion"]);
        $evento_id = $_POST["evento_id"];
        $cliente_id = $_POST["cliente_id"];
        $fecha_reservacion = $_POST["fecha_reservacion"];

        $datos = array();
        $datos = $reservaciones->actualizar($idReservacion, $evento_id, $cliente_id, $fecha_reservacion);
        echo json_encode($datos);
        break;

    case 'eliminar': // Eliminar una reservación
        if (!isset($_POST["idReservacion"])) {
            echo json_encode(["error" => "Reservation ID not specified."]);
            exit();
        }
        $idReservacion = intval($_POST["idReservacion"]);
        $datos = array();
        $datos = $reservaciones->eliminar($idReservacion);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
?>
