if (localStorage.getItem("wecare_nombre") == undefined) {
    window.location = "https://we-care.com.mx/login.html";
} else {
    //alert("Bienvenido");
    setData();
}

var dataHistorialGral;

function setData() {
    var data = JSON.parse(localStorage.getItem('data'));
    console.log(data);
    var userData = {
        nombre: localStorage.getItem("wecare_nombre"),
        apellidos: localStorage.getItem("wecare_apellidos"),
        folio: localStorage.getItem("wecare_folio")
    }
    getDataEmpleado(data.idUsuario);
    selectHistorialMedicoInd(data.idEmpleado);
    selectHistorialMedicoGral(data.idEmpleado);
    $("#data").append("Nombre del usuario: <b>" + userData.nombre + " " + userData.apellidos + "</b><br>" +
        "Folio: " + "<b>" + userData.folio + "</b>");
}

$("#btnLogOut").click(function() {
    removeSession();
    window.location = "https://we-care.com.mx/login.html";
});

function removeSession() {
    localStorage.removeItem("wecare_nombre");
    localStorage.removeItem("wecare_apellidos");
    localStorage.removeItem("wecare_folio");
}

function getDataEmpleado(data) {
    $.ajax({
        url: 'https://we-care.com.mx/ApiWeCare2/CRUD/Empleados/selectDataEmpleado.php',
        type: "POST",
        data: JSON.stringify({idUsuario: data}),
        success: function(response) {
            var responseData = JSON.parse(response);
            console.log(responseData);
            /*if (responseData == "null") {
                $("#data").append("<br>Cedula: <b>Sin registrar por el usuario</b>");
            } else {
                $("#data").append("<br>Cedula: <b>" + responseData.cedula + "</b>");
            }*/
            $("#data").append("<br>Correo Electrónico: <b>" + responseData.email + "</b>");
            $("#data").append("<br>Tipo de usuario: <b>" + responseData.rol + "</b>");
            $("#data").append("<br>Tipo de usuario: <b>" + responseData.especialidad + "</b>");
        },
        error: function() {
            alert("Error al solicitar los datos");
        }
    });
}

function fillLists(selector, data) {
    var dataHistorial;
    if (selector == ".historialInd") {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            $(selector).append('<li class="list-group-item"><div class="d-flex justify-content-between"><div class=""><p class="text-justify">' + data[i].nombres + " " + data[i].paterno + " " + data[i].materno +'</p></div><div class="alineacion"><button class="btn btn-info" id="#btnView" onclick="showListByPaciente('+ i + ')"><i class="fas fa-eye"></i></button></div></div></li>');
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            $(selector).append('<li class="list-group-item"><div class="d-flex justify-content-between"><div class=""><p class="text-justify">' + data[i].nombres + " " + data[i].paterno + " " + data[i].materno +'</p></div><div class="alineacion"><button class="btn btn-info" id="#btnView" onclick="showListByPaciente('+ i + ')"><i class="fas fa-eye"></i></button></div></div></li>');
        }
    }
} 

function selectHistorialMedicoGral(data) {
    $.ajax({
        url: "https://we-care.com.mx/ApiWeCare2/CRUD/Empleados/selectShareHistorialMedicoG.php",
        type: "POST",
        data: JSON.stringify({idEmpleado: data}),
        dataType: "json",
        success: function(response) {
            //console.log(response);
            dataHistorialGral = response;
            fillLists(".historialCompleto", response);
        },
        error: function() {
            $("#lista-contenedor").append('<li class="list-group-item d-flex justify-content-between align-items-center"><div class="row justify-content-between"><div class="col titulo"><p class="text-justify text-daner">No hay archivos por mostrar</p></div></div></li>');
        }
    });
}

function selectHistorialMedicoInd(data) {
    $.ajax({
        url: "https://we-care.com.mx/ApiWeCare2/CRUD/Empleados/selectShareHistorialMedicoInd.php",
        type: "POST",
        data: JSON.stringify({idEmpleado: data}),
        dataType: "json",
        success: function(response) {
            dataHistorialGral = response;
            fillLists(".historialInd", response);
        },
        error: function() {
            $(".historialInd").append('<li class="list-group-item d-flex justify-content-between align-items-center"><div class="d-flex justify-content-between"><div class=""><p class="text-justify text-danger">No hay archivos por mostrar</p></div></div></li>');
        }
    });
}

function showListByPaciente(position) {
    console.log(dataHistorialGral[position]);
    $("#modalHistorial").modal('show');
    for (let i = 0; i < dataHistorialGral[position].historialMedico.length; i++) {
        //console.log(dataHistorialGral[position].historialMedico[i]);
        var datos = dataHistorialGral[position].historialMedico[i];
        $("#contenidoHistorial").append('<li class="list-group-item d-flex justify-content-between align-items-center"><div class="d-flex justify-content-between"><div class="titulo"><p class="text-justify">' + datos.titulo +'</p></div><div class="alineacion"><button class="btn btn-info" onclick="showImg(`'+position+'`,`'+ i + '`)"><i class="fas fa-eye"></i></button></div></div></li>');
    }
}

function showImg(position, subposition) {
    console.log(position, subposition);
    $("#imgSource").attr("src", "https://we-care.com.mx/WeCare2/4c3b6896f38f3b6dc84c6b41d2ccec74/" + dataHistorialGral[position].folio + dataHistorialGral[position].idUsuario + "/HistorialMedico/" + dataHistorialGral[position].historialMedico[subposition].imgConsulta);
    $("#showImg").modal('show');
}

$("#closeHistorialContent").click(function() {
    $("#contenidoHistorial").empty();
});