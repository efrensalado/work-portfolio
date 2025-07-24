var datosContacto = {
	name: null,
	phone: null,
	email: null,
	message: null
};



$('#send').click(function(){
	datosContacto.name = $('#name').val();
	datosContacto.phone = $('#phone').val();
	datosContacto.email = $('#email').val();
	datosContacto.message = $('#message').val();
	console.log(datosContacto);
	if ((datosContacto.name != "") && (datosContacto.phone != "") && (datosContacto.email != "") && (datosContacto.message != "")){
		sendData(datosContacto);
	}else{
		alert("Favor de llenar correctamente todos los datos del formulario");
	}
});

function sendData(data){
    console.log(JSON.stringify(data));
	$.ajax({
		url:'http://dicormotechnology.com/Contacto/Contacto.php',
		type:'post',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(response){
		    console.log(response);
			alert("Correo enviado correctamente");
			clearForm();
		},
		error:function(response){
		    //console.log(response);
			//alert("Error al momento de procesar la solicitud");
			alert("Alguien de nuestro equipo se contactará con usted pronto :)");
			clearForm();
		}
	});
}

function clearForm(){
	$('#name').val("");
	$('#phone').val("");
	$('#email').val("");
	$('#message').val("");
}