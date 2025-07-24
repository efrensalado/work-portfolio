(function($) {

    $(".toggle-password").click(function() {
        $(this).toggleClass("zmdi-eye zmdi-eye-off");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

})(jQuery);

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var data = {
    nombres: "",
    paterno: "",
    materno: "",
    email: "",
    telefono: "",
    empresa: "",
    cargo: "",
    problemas: ""
};

$("#registrar").click(function() {
    data.nombres = $("#nombre").val();
    data.paterno = $("#apPat").val();
    data.materno = $("#apMat").val();
    data.email = $("#correo").val();
    data.telefono = $("#telefono").val();
    data.empresa = $("#empresa").val();
    data.cargo = $("#cargo").val();
    data.problemas = $("#problemas").val();
    console.log(data);
    sendData();
});

function sendData() {
    $.ajax({
        url: "http://empresas.dicormotechnology.com/CRUD/Empresa/create.php",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(data) {
            toastr.success("Registro realizado correctamente.", "Notificación");
            clearForm();
        },
        error: function() {
            toastr.error("No se pudo completar el registro.", "Mensaje de error");
        }
    });
}

function clearForm() {
    $("#nombre").val("");
    $("#apPat").val("");
    $("#apMat").val("");
    $("#correo").val("");
    $("#telefono").val("");
    $("#empresa").val("");
    $("#cargo").val("");
    $("#problemas").val("");
}