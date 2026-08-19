POSTJS_AUTOSELECT_SINGLECHOICE



var hhsizeRaw = $survey.surveyResponseJson["custom6"];
var hhsize = parseInt(hhsizeRaw, 10);

if (isNaN(hhsize)) {
    hhsize = 999; // fallback: choose first option if HHSIZE is missing
}

// jQuery .eq() is zero-based:
// .eq(0) = first radio option
// .eq(1) = second radio option

var optionIndexToSelect = hhsize < 11 ? 1 : 0;

console.log("optionIndexToSelect: "+optionIndexToSelect);

var $options = $('.M10REDIRECT input[type="radio"]');

if ($options.length > optionIndexToSelect) {
    $options.eq(optionIndexToSelect)
        .prop('checked', true)
        .trigger('click')
        .trigger('change');
}