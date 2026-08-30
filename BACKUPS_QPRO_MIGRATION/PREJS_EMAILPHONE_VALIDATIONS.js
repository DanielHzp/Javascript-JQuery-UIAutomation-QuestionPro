//PREJS_EMAILPHONE_VALIDATIONS
$(document).ready(function () {
    var form = document.getElementById('runForm');

    form.addEventListener('submit', function (event) {
        var PhoneNum = $.trim(
            $('.PhoneNum input[type="number"]').val() || ''
        );
        
        var AltPhone = $.trim(
            $('.AltPhone input[type="number"]').val() || ''
        );

        var message = '';

        if (PhoneNum !== '' && PhoneNum.charAt(0) !== '3') {
            console.log("Enters if PhoNum doesn't start with 3");
            message = 'Si prega di inserire un numero di cellulare corretto.';
        } else if (PhoneNum.length < 9) {
            console.log("Enters if PhoneNum length less than 9");
            message = 'Il numeri di cellulare deve avere almeno 9 caratteri';
        } else if (
            AltPhone !== '' &&
            AltPhone.charAt(0) !== '0' &&
            AltPhone.charAt(0) !== '3'
        ) {
            console.log("Enters if home phone doesn't start with 0 nor 3");
            message = 'Si prega di inserire un numero di telefono corretto.';
        } else if (
            AltPhone.charAt(0) === '3' &&
            (AltPhone.length < 9 || AltPhone.length > 10)
        ) {
            console.log("Enters if home phone length less than 9 or more than 10");
            message = 'Si prega di inserire un numero di telefono corretto.';
        } else if (
            AltPhone.charAt(0) === '0' &&
            AltPhone.length < 7
        ) {
            message = 'Si prega di inserire un numero di telefono corretto.';
        }

        if (message) {
            event.preventDefault();
            event.stopImmediatePropagation();
            alert(message);
            return false;
        }
    }, true);
});