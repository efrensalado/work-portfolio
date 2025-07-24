<?php
    class Tiket{

        // database connection and table name
        private $conn;
        private $table1_name = "tikets";

        //object propieties Empresa
        public $idTiket;
        public $nombreProyecto;
        public $asunto;
        public $prioridad;
        public $comentarios;
        public $archivo = NULL;
        public $fechaTiket;
        public $estatus;
        public $idUsuario;

        public $capturaError;

        // constructor with $db as database connection
        public function __construct($db){
            $this->conn = $db;
        }


        // create product
        function create(){
            $this->conn->beginTransaction();

            $query = "INSERT INTO
                        " . $this->table1_name . "
                    SET
                        idTiket = NULL, nombreProyecto=:nombreProyecto, asunto=:asunto, prioridad=:prioridad,
                         comentarios=:comentarios, archivo=:archivo, fechaTiket=:fechaTiket,
                          idUsuario=:idUsuario";

            // prepare query
            $stmt = $this->conn->prepare($query);
            
            
            // bind values
            $stmt->bindParam(":nombreProyecto", $this->nombreProyecto);
            $stmt->bindParam(":asunto", $this->asunto);
            $stmt->bindParam(":prioridad", $this->prioridad);
            $stmt->bindParam(":comentarios", $this->comentarios);
            $stmt->bindParam(":archivo", $this->archivo);
            $stmt->bindParam(":fechaTiket", $this->fechaTiket);
            $stmt->bindParam(":idUsuario", $this->idUsuario);

                    
            
            if ($stmt->execute()) {
                $this->conn->commit();
                return true;
            }else{
                $error = $stmt->errorInfo();
                if (strrpos($error[2], 'data')) {
                    $this->capturaError = "data";
                }else{
                    print_r($error);
                }
                $this->conn->rollBack();
                return false;    
            }
            
        }

        function selectTikets(){
            // select all query
            $query = "SELECT tikets.idTiket, tikets.nombreProyecto, tikets.asunto,
             tikets.prioridad, tikets.comentarios, tikets.archivo, tikets.estatus 
                FROM ".$this->table1_name." 
                    WHERE tikets.idUsuario = ? 
                    ORDER BY tikets.idTiket DESC";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(1, $this->idUsuario);

            // execute query
            $stmt->execute();
            $datos = $stmt->fetchAll();

            return $datos;
        }

        function updateEstatus(){
            $this->conn->beginTransaction();

          $query = "UPDATE ".$this->table1_name." SET estatus=:estatus WHERE idTiket=:idTiket ";

          $stmt = $this->conn->prepare($query);

          $stmt->bindParam(":estatus", $this->estatus);
          $stmt->bindParam(":idTiket", $this->idTiket);

          $stmt->execute();
          $value = $stmt->errorInfo();
              
          if(strlen($value[1]) <= 0) {
              $this->conn->commit();
              return true;
          }else{
              $this->conn->rollBack();
              return false;
          }
        }
    }
?>
