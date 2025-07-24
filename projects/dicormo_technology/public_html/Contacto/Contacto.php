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

     include_once "sendMail.php";

     $data = json_decode(file_get_contents("php://input"));
     if(!empty($data->name) && !empty($data->phone) && !empty($data->email) && !empty($data->message)){
        sendMailAdmin($data->name, $data->phone, $data->email, $data->message);
        echo json_encode(array('message'=> 'holis'));
        http_response_code(200);
     }else{
        //http_response_code(404);
        //echo json_encode(array("message" => "Acceso denegado"));
     }
?>