//PREJS_SPNQ1_AGEVALIDATIONS
/* ============================
   AGE LIMITS
============================ */

function qpGetDateLimits() {
    var today = new Date();

    return {
        minDate: new Date(
            today.getFullYear() - 100,
            today.getMonth(),
            today.getDate()
        ),
        maxDate: new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        )
    };
}

function qpIsAgeValid(date) {
    var limits = qpGetDateLimits();

    return (
        date instanceof Date &&
        !isNaN(date.getTime()) &&
        date >= limits.minDate &&
        date <= limits.maxDate
    );
}

/* ============================
   ERROR HANDLING
============================ */

function qpShowError(input, message) {
    var errorId = input.getAttribute("aria-describedby");

    if (errorId) {
        var errorElement = document.getElementById(errorId);

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "";
        }
    }

    input.dataset.invalidDate = "true";
}

function qpClearError(input) {
    var errorId = input.getAttribute("aria-describedby");

    if (errorId) {
        var errorElement = document.getElementById(errorId);

        if (errorElement) {
            errorElement.textContent = "";
            errorElement.style.display = "none";
        }
    }

    input.dataset.invalidDate = "false";
}

/* ============================
   DATE VALIDATION
============================ */

function qpValidateDateField(input) {

    try {

        var enteredDate = $(input).datepicker("getDate");

        var hiddenInput = input
            .closest(".input-wrapper")
            ?.querySelector(".hidden-input-value");

        if (!enteredDate) {

            qpShowError(
                input,
                "Por favor, introduzca una fecha válida."
            );

            if (hiddenInput) {
                hiddenInput.value = "";
            }

            return false;
        }

        if (!qpIsAgeValid(enteredDate)) {

            qpShowError(
                input,
                "La edad debe estar entre 18 y 100 años."
            );

            input.value = "";

            if (hiddenInput) {
                hiddenInput.value = "";
            }

            return false;
        }

        qpClearError(input);

        return true;

    } catch (e) {

        console.error("Date validation error:", e);

        return true;
    }
}

/* ============================
   INITIALIZATION
============================ */

(function () {

    var limits = qpGetDateLimits();

    var dateFields = document.querySelectorAll(".hasDatepicker");

    dateFields.forEach(function (input) {

        try {

            $(input).datepicker("option", {
                minDate: limits.minDate,
                maxDate: limits.maxDate,
                changeMonth: true,
                changeYear: true,
                yearRange:
                    limits.minDate.getFullYear() +
                    ":" +
                    limits.maxDate.getFullYear()
            });

        } catch (e) {

            console.error("Datepicker configuration error:", e);
        }

        input.addEventListener("change", function () {
            qpValidateDateField(input);
        });

        input.addEventListener("blur", function () {
            qpValidateDateField(input);
        });
    });

})();

/* ============================
   PAGE VALIDATION
============================ */

function isPageValid() {

    var valid = true;

    var dateFields = document.querySelectorAll(".hasDatepicker");

    dateFields.forEach(function (input) {

        if (!qpValidateDateField(input)) {

            if (valid) {
                input.focus();
            }

            valid = false;
        }
    });

    return valid;
}

