<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../Objects/Tiket.php';

 
$database = new Database();
$db = $database->getConnection();
 
$tiket = new Tiket($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

if(
    !empty($_POST['nombreProyecto']) && !empty($_POST['asunto']) && 
    !empty($_POST['prioridad']) && !empty($_POST['comentarios']) && 
    !empty($_POST['idUsuario'])
)
{
    //$direccion = "../../Docs/".$_POST['idUsuario']."/";
    //data tiket
    $tiket->fechaTiket = date("Y")."/".date("m")."/".date("d");
    $tiket->nombreProyecto = $data->nombreProyecto;
    $tiket->asunto = $data->asunto;
    $tiket->prioridad = $data->prioridad;
    $tiket->comentarios = $data->comentarios;
    $tiket->idUsuario = $data->idUsuario;

    if($tiket->create()){
        // set response code - 201 created
        http_response_code(201);
    
        // tell the user
        echo json_encode(array("message" => "tiket resgistrado."));
    }else{
    
        // set response code - 503 service unavailable
        http_response_code(503);
    
        // tell the user
        echo json_encode(array("message" => "No se pudo realizar el registro del tiket.","error"=>$tiket->capturaError));
    }

    
} else {
    // set response code - 400 bad request
    //echo $data->nombres;
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "No se puede realizar el registro, verifique que los datos esten completos."));
}


?>