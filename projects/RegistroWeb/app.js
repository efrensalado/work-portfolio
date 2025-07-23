var especialidades;

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "500",
    "hideDuration": "3000",
    "timeOut": "10000",
    "extendedTimeOut": "3000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var getParams = function(url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

var paramsURL = getParams(window.location.href);

$('document').ready(function() {
    $("#registro").click(function() {
        event.preventDefault();
    });
    getEspecialidades();
});

$("#registro").click(function() {
    var nombre = $("#nombre").val();
    var paterno = $("#paterno").val();
    var materno = $("#materno").val();
    var fechaNacimiento = $("#nacimiento").val();
    var genero = $("#genero").val();
    var rol = $("#empleado option:selected").val();
    var especialidad = $("#especialidad").val();
    var cedula = $("#noCedula").val();
    var telefono = $("#telefono").val();
    var correo = $("#correo").val();
    var pass = $("#contraseña").val();
    var pass2 = $("#confirmaPass").val();
    var noVendedor = $("#noVendedor").val();
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if (regex.test(correo)) {
        if (nombre == "" || nombre == undefined) {
        toastr.error("El campo nombre es requerido.");
        } else if (paterno == "" || paterno == undefined) {
            toastr.error("El campo apellido paterno es requerido.");
        } else if (materno == "" || materno == undefined) {
            toastr.error("El campo apellido materno es requerido.");
        } else if (rol == "" || rol == undefined) {
            toastr.error("Es necesario elegir un tipo de usuario.");
        } else if (fechaNacimiento == "" || fechaNacimiento == undefined) {
            toastr.error("Seleccione una fecha de nacimiento.");
        } else if (genero == "" || genero == undefined) {
            toastr.error("Es necesario seleccionar género.");
        } else if (especialidad == "" || especialidad == undefined) {
            toastr.error("Es necesario seleccionar una especialidad.");
        } else if (telefono == "" || telefono == undefined) {
            toastr.error("Es necesario ingresar el número de télefono.");
        } else if (correo == "" || correo == undefined) {
            toastr.error("Es necesario ingresar un correo.");
        } else if (pass == "" || pass == undefined) {
            toastr.error("Es necesario escribir una contraseña.");
        }
    } else {
        toastr.error("El correo ingresado no contiene el formato de correo, revise que se encuentre escrito correctamente. \nEjemplo: demo@demo.com");
    }

    formData = {
        nombres: nombre,
        paterno: paterno,
        materno: materno,
        fechaNacimiento: fechaNacimiento,
        genero: genero,
        rol: rol,
        idTipoEspecialidad: especialidad,
        cedula: cedula,
        telefono: telefono,
        email: correo,
        pass: pass,
        numeroVendedor: noVendedor,
        nombreCompleto: (nombre + " " + paterno + " " + materno).toUpperCase()
    };

    if (pass == pass2) {
        //console.log(formData);
        registro(formData);
    } else {
        toastr.error("Las contraseñas no coinciden.");
    }

});

function clearForm() {
    $("#nombre").val("");
    $("#paterno").val("");
    $("#materno").val("");
    $("#nacimiento").val("");
    $("#genero").val();
    $("#empleado option:selected").val("");
    $("#especialidad").val("");
    $("#noCedula").val("");
    $("#telefono").val("");
    $("#correo").val("");
    $("#contraseña").val("");
    $("#confirmaPass").val("");
    $("#noVendedor").val("");
}

function registro(data) {
    $.ajax({
        type: "POST",
        url: "https://we-care.com.mx/ApiWeCare/CRUD/Empleados/create.php",
        data: JSON.stringify(data),
        dataType: "JSON",
        contentType: "application/json",
        success: function(response) {
            toastr.success("Registro exitoso.", "Verifique su correo electrónico (incluyendo correo no deseado), para validar su cuenta.");
            clearForm();
            console.log(response);
            if (paramsURL.prod_stat != "false") {
                setTimeout(window.location.href = "https://we-care.com.mx/ApiWeCare/Paginas/Pagos/index.html?idUsuario=" + response.idUsuario + "&idRol=" + response.idRol, 5000);
            } else {
                setTimeout(window.location.href = "https://we-care.com.mx/ApiWeCare/Paginas/RegistroWeb/success.html", 5000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR);
            //console.log(textStatus);
            //console.log(errorThrown);
            if (jqXHR.status == 400) {
                toastr.error("No se pudo realizar el registro.", "Los datos estan incompletos.");
            } else if (jqXHR.status == 503) {
                if (jqXHR.responseJSON.error == "cedula") {
                    toastr.error("No se pudo realizar el registro.", "La cedula ya se encuentra registrada.");
                } else if (jqXHR.responseJSON.error == "telefono") {
                    toastr.error("No se pudo realizar el registro.", "El número de teléfono ya se encuentra registrado");
                } else if (jqXHR.responseJSON.error == "email") {
                    toastr.error("No se pudo realizar el registro.", "El correo electrónico ya se encuentra registrado.");
                } else if (jqXHR.responseJSON.error == "datosEmpleado") {
                    toastr.error("No se pudo realizar el registro.", "Intente de nuevo.");
                }
            }
        }
    });
}

function getEspecialidades() {
    $.ajax({
        type: "GET",
        url: "https://we-care.com.mx/ApiWeCare/CRUD/Especialidad/selectAll.php",
        data: "",
        dataType: "JSON",
        success: function(response) {
            //especialidades = response;
            console.log(response);
            fillEspecialidades(response);
        }
    });
}

function fillEspecialidades(data) {
    let dropdown = $('#especialidad');

    dropdown.empty();

    for (let index = 0; index < data.length; index++) {
        var valor = index + 1;
        dropdown.append($('<option></option>').attr('value', valor).text(data[index].especialidad));
    }
}