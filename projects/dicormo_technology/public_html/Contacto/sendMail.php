<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'PHPMailer/Exception.php';
	require 'PHPMailer/PHPMailer.php';
	require 'PHPMailer/SMTP.php';
	
	// Instantiation and passing `true` enables exceptions
	 //$mail = new PHPMailer(true);
	function curl2_get_file_contents($URL){
	    $c = curl_init();
	    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($c, CURLOPT_URL, $URL);
	    $contents = curl_exec($c);
	    curl_close($c);

	    if ($contents) return $contents;
	    else return FALSE;
	}


		function sendMailAdmin($name, $phone, $email, $message){
		
		try {
			$mail = new PHPMailer(true);
		    //Server settings
		    $mail->SMTPDebug = 0;                      // Enable verbose debug output
		    $mail->isSMTP();                                            // Send using SMTP
		    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
		    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
		    $mail->Username   = 'dicormotechnology@gmail.com';                     // SMTP username
		    $mail->Password   = 'DicormoT.2020';                               // SMTP password
		    $mail->SMTPSecure = 'TLS';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
		    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

		    //Recipients
		    $mail->setFrom('dicormotechnology@gmail.com', 'Dicormo Technology');
		    $mail->addAddress('direccion@dicormo.com', 'Dicormo');     // Add a recipient
		    $mail->addAddress('vicdrac18@gmail.com', 'Dicormo');     // Add a recipient
		    


		    // Content
		    $mail->isHTML(true);
		    $mail->CharSet = 'UTF-8';                                  // Set email format to HTML
		    $mail->Subject = '¡Alguien quiere contactarnos!';
			$mail->Body    = 'Se han puesto en contacto con nosotros para solicitar información adicional. 
								<br>Los datos del contacto son los siguientes:
		    					<br>Nombre: '.$name.'
		    					<br>Teléfono: '.$phone.'
		    					<br>E-mail: '.$email.'
		    					<br>Message: '.$message;

		    $mail->send();
		    $mail->clearAllRecipients();

		} catch (Exception $e) {
		    echo "Admin. Ubo un error: {$mail->ErrorInfo}";
		}
	}

		
?>