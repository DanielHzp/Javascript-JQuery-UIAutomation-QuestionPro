BACKBTNFIX_QPRO

$(document).ready(function() {
    
    $(".btn.btn-back").on("click", function () {

        sessionStorage.setItem("surveyProgressDirection", "Back");
    });
    
    $("#SurveySubmitButtonElement").on("click", function () {

        sessionStorage.setItem("surveyProgressDirection", "Next");
    });
    var direction = sessionStorage.getItem("surveyProgressDirection");

    if (direction === "Back") {

        if ($(".survey-question-wrapper:visible").length === 0) {

            var href = $(".btn.btn-back").attr("href");
            if (href) {

                window.location.href = href;
            }
        }
    } else if (direction === "Next") {

        if ($(".survey-question-wrapper:visible").length === 0) {

            if (document.forms["run"] && typeof document.forms["run"].onsubmit === "function") {

                document.forms["run"].onsubmit();
            }
        }
    }
});
