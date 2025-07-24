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
    //console.log(params);
    return params;
};

var data = getParams(window.location.href);
var costos = ["$500.00", "$800.00"];
//console.log(data);
$("#idUsuario").val(data.idUsuario);
$("#idRol").val(data.idRol);

if(data.idRol == "1"){
    $("#monto").val(costos[1]);
} else {
    $("#monto").val(costos[0]);
}

$.ajax({
    type: "POST",
    url: "https://we-care.com.mx/ApiWeCare2/CRUD/Empleados/selectDataEmpleado.php",
    data: JSON.stringify(data),
    dataType: "json",
    success: function(response) {
        //console.log(response)
        $("#nombre").val(response.nombres);
        $("#apellidos").val(response.paterno + " " + response.materno);
        $("#email").val(response.email);
        $("#tel").val(response.telefono);
        $("#folio").val(response.folio);
    }
});