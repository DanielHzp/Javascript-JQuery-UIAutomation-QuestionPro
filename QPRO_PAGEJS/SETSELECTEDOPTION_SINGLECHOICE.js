SETSELECTEDOPTION_SINGLECHOICE

//Set selected option in Q893
$('.Q893 label').each(function () {
    var optionText = $(this).find('.control-label').text().trim();

    if (optionText === hhsize) {
        $(this).find('input[type="radio"]').prop('checked', true);
    }
});
