//SETSELECTEDOPTION_SINGLECHOICE

//Set selected option in Q893
$('.Q893 label').each(function () {
    var optionTextRadio = $(this).find('.control-label').text().trim();

    if ("CONDITION IS MET TO SELECT OPTION OF SINGLE CHOICE QUESTION") {
        
        $(this).find('input[type="radio"]').prop('checked', true);
    }
});


//Using $survey object
$survey.setOptionSelected("Q2", i+1); //Q2 must be in the same page 
//where this function is called

