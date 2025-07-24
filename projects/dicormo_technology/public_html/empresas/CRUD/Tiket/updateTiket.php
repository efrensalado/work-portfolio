<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600"); 
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    date_default_timezone_set('America/Mexico_City');
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
        !empty($data->idTiket) && !empty($data->estatus)
    )
    {
        $tiket->idTiket = $data->idTiket;
        $tiket->estatus = $data->estatus;
         
        if ($tiket->updateEstatus()) {
            
            http_response_code(200);

            // tell the user
            echo json_encode(array("message" => "Se realizo el cambio con exito."));    
        }else{
            http_response_code(404);
    
            // tell the user
            echo json_encode(array("message" => "No se puede realizar el cambio."));    
        }        
    }else{
        // set response code - 400 bad request
        //echo $data->nombres;
        http_response_code(400);
    
        // tell the user
        echo json_encode(array("message" => "No se puede realizar el cambio, verifique que los datos esten completos."));
    }


    ?>