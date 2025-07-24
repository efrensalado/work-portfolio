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
include_once '../Objects/Empresa.php';

 
$database = new Database();
$db = $database->getConnection();
 
$empresa = new Empresa($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->nombres) && !empty($data->paterno) && 
    !empty($data->materno) && !empty($data->telefono) && 
    !empty($data->email) && !empty($data->empresa) && 
    !empty($data->problemas) && !empty($data->cargo)
)
{
    //data empresa
    $empresa->folio = date("Y").date("m").date("d").date("H").date("i").date("s");
    $empresa->fechaRegistro = date("Y")."/".date("m")."/".date("d");
    $empresa->nombres = $data->nombres;
    $empresa->paterno = $data->paterno;
    $empresa->materno = $data->materno;
    $empresa->email = $data->email;
    $empresa->telefono = $data->telefono;
    $empresa->empresa = $data->empresa;
    $empresa->problemas = $data->problemas;
    $empresa->cargo = $data->cargo;

    if($empresa->create()){
        // set response code - 201 created
        http_response_code(201);
    
        // tell the user
        echo json_encode(array("message" => "empresa resgistrado."));
    }else{
    
        // set response code - 503 service unavailable
        http_response_code(503);
    
        // tell the user
        echo json_encode(array("message" => "No se pudo realizar el registro del empresa.","error"=>$empresa->capturaError));
    }

    
} else {
    // set response code - 400 bad request
    //echo $data->nombres;
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "No se puede realizar el registro, verifique que los datos esten completos."));
}


?>