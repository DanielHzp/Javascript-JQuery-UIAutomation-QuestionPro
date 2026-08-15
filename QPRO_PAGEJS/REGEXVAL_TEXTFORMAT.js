REGEXVAL_TEXTFORMAT



//Allow only text input in correct format
function allowLettersOnly() {

    $("input[type=text][role=textbox], input[type=text]").on("input", function () {

        var input = $(this).val();
        var regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s-]+$/;

        if (!regex.test(input)) {
            $(this).val(
                input.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s-]/g, "")
            );
        }

    });

}

//HANDLE SPECIAL CHARACTER AND FORMAT RESTRICTIONS ON TEXT BOXES ACROSS THE SURVEY
$(document).on(
    "input",
    "input[type=text][role=textbox], input[type=text]",
    function () {

        var input = $(this).val();
        var regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s-]+$/;

        if (!regex.test(input)) {
            $(this).val(
                input.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s-]/g, "")
            );
        }

    }
);
