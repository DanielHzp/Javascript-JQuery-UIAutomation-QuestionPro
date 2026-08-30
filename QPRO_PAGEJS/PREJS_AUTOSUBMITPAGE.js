//PREJS_AUTOSUBMITPAGE
console.log("============== ENTER Page: HOH  ================");

$(document).ready(function () {
    var hhSize = String($survey.getSelectedOption('HHSIZE') || '').trim();
console.log("hhSize: "+hhSize);

    if (hhSize === '1') {
        var optionIndexToSelect = 0;
        var $options = $('.HoH input[type="radio"]');

        if ($options.length > optionIndexToSelect) {
            $options.eq(optionIndexToSelect)
                .prop('checked', true)
                .trigger('click')
                .trigger('change');
console.log("Enters if $options.length>optionIndexToSelect");

            setTimeout(function () {
                $('#SurveySubmitButtonElement').trigger('click');
            }, 200);
        }
    }
});