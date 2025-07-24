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
include_once '../Objects/Usuario.php';

 
$database = new Database();
$db = $database->getConnection();
 
$usuario = new Usuario($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->nombreCompleto) && !empty($data->empresa) && 
    !empty($data->telefono) && !empty($data->email) && 
    !empty($data->password)
)
{
    //data usuario
    $usuario->fechaRegistro = date("Y")."/".date("m")."/".date("d");
    $usuario->nombreCompleto = $data->nombreCompleto;
    $usuario->empresa = $data->empresa;
    $usuario->telefono = $data->telefono;
    $usuario->email = $data->email;
    $usuario->password = $data->password;

    if($usuario->create()){
        // set response code - 201 created
        http_response_code(201);
    
        // tell the user
        echo json_encode(array("message" => "usuario resgistrado."));
    }else{
    
        // set response code - 503 service unavailable
        http_response_code(503);
    
        // tell the user
        echo json_encode(array("message" => "No se pudo realizar el registro del usuario.","error"=>$usuario->capturaError));
    }

    
} else {
    // set response code - 400 bad request
    //echo $data->nombres;
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "No se puede realizar el registro, verifique que los datos esten completos."));
}


?>