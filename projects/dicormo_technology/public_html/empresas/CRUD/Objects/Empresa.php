<?php
    class Empresa{

        // database connection and table name
        private $conn;
        private $table1_name = "empresas";

        //object propieties Empresa
        public $idEmpresa;
        public $folio;
        public $nombres;
        public $paterno;
        public $materno;
        public $fechaRegistro;
        public $telefono;
        public $email;
        public $empresa;
        public $problemas;
        public $cargo;
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
                        idEmpresa = NULL, folio=:folio, nombre=:nombre, apellidoP=:paterno,
                         apellidoM=:materno, telefono =:telefono, correo=:correo, empresa=:empresa, cargo=:cargo,
                          problemas=:problemas, fechaRegistro=:fechaRegistro";

            // prepare query
            $stmt = $this->conn->prepare($query);
            
            
            // bind values
            $stmt->bindParam(":folio", $this->folio);
            $stmt->bindParam(":nombre", $this->nombres);
            $stmt->bindParam(":paterno", $this->paterno);
            $stmt->bindParam(":materno", $this->materno);
            $stmt->bindParam(":telefono", $this->telefono);
            $stmt->bindParam(":correo", $this->email);
            $stmt->bindParam(":empresa", $this->empresa);
            $stmt->bindParam(":cargo", $this->cargo);
            $stmt->bindParam(":problemas", $this->problemas);
            $stmt->bindParam(":fechaRegistro", $this->fechaRegistro);

                    
            
            if ($stmt->execute()) {
                $this->conn->commit();
                return true;
            }else{
                $error = $stmt->errorInfo();
                if (strrpos($error[2], 'folio')) {
                    $this->capturaError = "folio";
                }else{
                    print_r($error);
                }
                $this->conn->rollBack();
                return false;    
            }
            
        }
    }
?>
