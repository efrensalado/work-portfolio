
$("#btnLogin").click(function(event) {
    event.preventDefault();
    var data = {
        email: null,
        contrasena: null
    };

    if ($("#mail").val() != "" && $("#contrasena").val() != "") {
        data.email = $("#mail").val();
        data.contrasena = $.MD5($("#contrasena").val());
        sendData(data);
    } else {
        alert("Ingrese todos los datos");
    }
});

function sendData(data) {
    console.log(JSON.stringify(data));
    $.ajax({
        url: "https://we-care.com.mx/ApiWeCare2/CRUD/Empleados/login.php",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function(response) {
            console.log(response);
            localStorage.setItem("data", JSON.stringify(response));
            if (response.pass == data.contrasena) {
                if (response.rol == "Administrador"){
                    saveSessionAdmin(response);
                    window.location.href = "https://we-care.com.mx/ApiWeCare/Paginas/DatosRegistros/datosRegistro.html";
                } else if(response.rol == "Ventas") {
                    saveSessionAdmin(response);
                    window.location.href = "https://we-care.com.mx/ApiWeCare/Paginas/dashboardVentas/index.html";
                } 
                else {
                    console.log(response)
                    saveSession(response);
                    window.location.href = "./dashboard.html";
                }
            } else {
                alert("Las contraseñas no coinciden");
            }
        },
        error: function() {
            alert("Ocurrió un error al momento de procesar la solicitud.");
        }
    });
}

function saveSession(data) {
    localStorage.setItem("wecare_folio", data.folio);
    localStorage.setItem("wecare_nombre", data.nombres);
    localStorage.setItem("wecare_apellidos", data.paterno + " " + data.materno);
    localStorage.setItem("idEmpleado", data.idEmpleado);
}

function saveSessionAdmin(data) {
    localStorage.setItem("wecare_folio", data.folio);
    localStorage.setItem("wecare_admin", data.nombres);
    localStorage.setItem("wecare_apellidos", data.paterno + " " + data.materno);
}