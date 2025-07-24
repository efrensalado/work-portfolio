$("#but_upload").click(function() {

    var fd = new FormData();
    var files = $('#file')[0].files;
    var data = {
        img: "",
        folio: "",
        id: ""
    };

    // Check file selected or not
    if (files.length > 0) {
        fd.append('img', files[0]);
        fd.append("id", "60");
        fd.append("folio", "20201224063239");
        for (var value of fd.values()) {
            console.log(value);
        }
        $.ajax({
            url: 'https://we-care.com.mx/ApiWeCare2/Upload/MakeImg.php',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response) {
                $("#img").attr("src", response);
                $(".preview img").show(); // Display image element
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            },
        });
    } else {
        alert("Please select a file.");
    }
});