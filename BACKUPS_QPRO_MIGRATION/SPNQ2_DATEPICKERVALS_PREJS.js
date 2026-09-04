//SPNQ2_DATEPICKERVALS_PREJS
/* ============================
   CONFIGURACIÓN DE EDAD
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
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        )
    };
}

function qpIsAgeValid(date) {
    var limits = qpGetDateLimits();
    return date >= limits.minDate && date <= limits.maxDate;
}

/* ============================
   ERRORES (DINÁMICOS)
============================ */

function qpShowError($input, message) {
    var errorId = $input.attr('aria-describedby');
    if (errorId) {
        $('#' + errorId).text(message).show();
    }
    $input.data('invalid-date', true);
}

function qpClearError($input) {
    var errorId = $input.attr('aria-describedby');
    if (errorId) {
        $('#' + errorId).text('').hide();
    }
    $input.data('invalid-date', false);
}

/* ============================
   INICIALIZACIÓN DE LOS CALENDARIOS
============================ */

var qpLimits = qpGetDateLimits();

$('.hasDatepicker').each(function () {

    var $displayInput = $(this);
    var $hiddenInput = $displayInput
        .closest('.input-wrapper')
        .find('.hidden-input-value');

    /* Restringir calendario */
    $displayInput.datepicker('option', {
        minDate: qpLimits.minDate,
        maxDate: qpLimits.maxDate,
        changeMonth: true,
        changeYear: true,
        yearRange:
            qpLimits.minDate.getFullYear() + ':' +
            qpLimits.maxDate.getFullYear()
    });

    /* Validación (usar el propio datepicker) */
    $displayInput.on('blur change', function () {

        var enteredDate = $displayInput.datepicker('getDate');

        if (!enteredDate) {
            qpShowError($displayInput, 'Por favor, introduzca una fecha válida.');
            $hiddenInput.val('');
            return;
        }

        if (!qpIsAgeValid(enteredDate)) {
            qpShowError(
                $displayInput,
                'La edad debe estar entre 18 y 100 años.'
            );
            $displayInput.val('');
            $hiddenInput.val('');
            return;
        }

        qpClearError($displayInput);
    });
});

/* ============================
   VALIDACIÓN GLOBAL DE LA PÁGINA
============================ */

window.isPageValid = function () {

    var valid = true;

    $('.hasDatepicker').each(function () {
        if ($(this).data('invalid-date') === true) {
            $(this).focus();
            valid = false;
            return false;
        }
    });

    return valid;
};

/* ============================
   BLOQUEO REAL DEL BOTÓN SIGUIENTE (QP)
============================ */

(function () {

    var originalNext =
        window.qpNext ||
        window.nextPage ||
        window.surveyNext;

    if (typeof originalNext === 'function') {

        window.qpNext =
        window.nextPage =
        window.surveyNext = function () {

            if (typeof window.isPageValid === 'function') {
                if (!window.isPageValid()) {
                    return false;
                }
            }

            return originalNext.apply(this, arguments);
        };
    }

})();