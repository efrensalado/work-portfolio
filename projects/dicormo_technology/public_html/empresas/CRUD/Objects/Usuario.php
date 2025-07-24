<?php
    class Usuario{

        // database connection and table name
        private $conn;
        private $table1_name = "usuarios";

        //object propieties Empresa
        public $idUsuario;
        public $nombreCompleto;
        public $empresa;
        public $telefono;
        public $email;
        public $password;
        public $fechaRegistro;

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
                        idUsuario = NULL, nombreCompleto=:nombreCompleto, empresa=:empresa,
                         telefono=:telefono, email=:email, password=MD5(:password), fechaRegistro=:fechaRegistro";

            // prepare query
            $stmt = $this->conn->prepare($query);
            
            
            // bind values
            $stmt->bindParam(":nombreCompleto", $this->nombreCompleto);
            $stmt->bindParam(":empresa", $this->empresa);
            $stmt->bindParam(":telefono", $this->telefono);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", $this->password);
            $stmt->bindParam(":fechaRegistro", $this->fechaRegistro);

                    
            
            if ($stmt->execute()) {
                $this->conn->commit();
                return true;
            }else{
                $error = $stmt->errorInfo();
                if (strrpos($error[2], 'email')) {
                    $this->capturaError = "email";
                }else{
                    print_r($error);
                }
                $this->conn->rollBack();
                return false;    
            }
            
        }

        function login(){
            // select all query
            $query = "SELECT usuarios.idUsuario, usuarios.nombreCompleto, usuarios.password  
                FROM ".$this->table1_name." 
                    WHERE usuarios.email = ?";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(1, $this->email);

            // execute query
            $stmt->execute();

            
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->idUsuario = $row['idUsuario'];
            $this->nombreCompleto = $row['nombreCompleto'];
            $this->password = $row['password'];
            if ($this->idUsuario == null) {
                return false;
            }else{
                return true;
            }
        }

        function selectIdUsuario(){
            // select all query
            $query = "SELECT usuarios.idUsuario, usuarios.nombreCompleto, usuarios.empresa, 
             usuarios.telefono, usuarios.email  
                FROM ".$this->table1_name." 
                    WHERE usuarios.idUsuario = ?";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(1, $this->idUsuario);

            // execute query
            $stmt->execute();

            
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->idUsuario = $row['idUsuario'];
            $this->nombreCompleto = $row['nombreCompleto'];
            $this->empresa = $row['empresa'];
            $this->telefono = $row['telefono'];
            $this->email = $row['email'];

            if ($this->nombreCompleto == null) {
                return false;
            }else{
                return true;
            }
        }
    }
?>
