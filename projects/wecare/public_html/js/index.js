$(document).ready(function() {
    $("#modalBanner").modal('show');
});

/*$("#registro").click(function() {
    $("#contenedor-img").empty();
    $("#form").removeClass('d-none');
    $("#registro").addClass('d-none');
    $("#guardarRegistro").removeClass('d-none');
    $("#titulo-registro").removeClass('d-none');
});*/

$("#guardarRegistro").click(function() {
    var data = {};
    if ($("#name").val() == "" || $("#email").val() == "" || $("#telefono").val() == "") {
        Swal.fire({
            text: "Todos los campos del formulario deben estar completos",
            icon: "warning"
        });
    } else {
        data.nombreCompleto = $("#name").val();
        data.email = $("#email").val();
        data.telefono = $("#telefono").val();
        sendData(data);
    }
});

if (localStorage.getItem("cookieSeen") != "shown") {
    $(".cookie-banner").delay(2000).fadeIn();
    //localStorage.setItem("cookieSeen","shown");
}

$(".policy").click(function() {
    $(".cookie-banner").fadeOut();
    localStorage.setItem("cookieSeen","shown");
});

$(".cookie-banner").click(function() {
    $(".cookie-banner").fadeOut();
    localStorage.setItem("cookieSeen","shown");
});

function sendData(data) {
    $.ajax({
        url: 'https://we-care.com.mx/ApiWeCare/CRUD/Interesados/create.php',
        type: 'POST',
        data: JSON.stringify(data),
        success: function(response) {
            //cerrar modal y notificar al usuario que alguien del equipo de ventas se
            // comunicarás más tarde
            Swal.fire({
                text: 'Sus datos han sido enviados. Una persona de nuestro equipo de ventas se comunicará más tarde con usted.',
                icon: 'success'
            });
            $("#modalBanner").modal('toggle');
        },
        error: function() {
            //notificar error en la petición
            Swal.fire({
                text: 'Ocurrió un error al momento de procesar la solicitud. Intente nuevamente.',
                icon: 'error'
            });
            //$("#modalBanner").modal('toggle');
        }
    });
}