//PREJS_MEMBERDATEPICKER_Q2ITA
$(function () {
    var $dob = $('.DOBM10 input.hasDatepicker');
    var $age = $('.AGEM10 input[type="number"]');
    var $condition = $('.OCCUPATIONCONDITIONM10');
    var $conditionOptions =
        $('.OCCUPATIONCONDITIONM10 input[type="radio"]');
        /*
        */

    // Hide until a valid adult DOB is available.
    $condition.hide();

    function updateAgeLogic() {
        var dobValue = $.trim($dob.val() || '');
        var parts = dobValue.split('/');

        if (parts.length !== 3) {
            $age.val('').trigger('change');
            $condition.hide();
            return;
        }

        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);
        var dob = new Date(year, month - 1, day);
        var today = new Date();

        var validDate =
            !isNaN(dob.getTime()) &&
            dob.getFullYear() === year &&
            dob.getMonth() === month - 1 &&
            dob.getDate() === day &&
            dob <= today;

        if (!validDate) {
            $age.val('').trigger('change');
            $condition.hide();

            console.warn('[M2] Invalid DOB:', dobValue);
            return;
        }

        var age = today.getFullYear() - dob.getFullYear();

        if (
            today.getMonth() < dob.getMonth() ||
            (
                today.getMonth() === dob.getMonth() &&
                today.getDate() < dob.getDate()
            )
        ) {
            age--;
        }

        // Preserve the original rule: age 0 is stored as 1.
        var storedAge = age === 0 ? 1 : age;

        $age.val(storedAge).trigger('change');

        console.log('[M2] DOB:', dobValue);
        console.log('[M2] Calculated age:', age);
        console.log('[M2] AGEOM2 stored:', storedAge);

        if (age < 6 && $conditionOptions.length > 8) {
            // Option 9: Altro
            $conditionOptions.eq(8)
                .prop('checked', true)
                .trigger('click')
                .trigger('change');

            $condition.hide();

            console.log(
                '[M2] Under 6: Altro selected and condition hidden'
            );

        } else if (age <= 17 && $conditionOptions.length > 4) {
            // Option 5: Studente
            $conditionOptions.eq(4)
                .prop('checked', true)
                .trigger('click')
                .trigger('change');

            $condition.hide();

            console.log(
                '[M2] Age 6-17: Studente selected and condition hidden'
            );

        } else {
            $condition.show();

            console.log(
                '[M2] Age 18+: occupation condition displayed'
            );
        }
    }

    $dob.on('change input', updateAgeLogic);

    // Handles an existing DOB when returning to the page.
    updateAgeLogic();
});
