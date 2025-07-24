<?php
// required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Content-Type: application/x-www-form-urlencoded; charset=UTF-8");
    header("Content-Type: multipart/form-data; charset=UTF-8");
    header("Content-Type: text/plain; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, GET");
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
//$data = json_decode(file_get_contents("php://input"));


if(!empty($_GET['idUsuario']))
{
    $tiket->idUsuario = $_GET['idUsuario'];   
    $log = $tiket->selectTikets();
    http_response_code(200);  
    echo json_encode($log);
         
}else{
    http_response_code(400);
    echo json_encode(array("message" => "Acceso denegado"));
}
?>