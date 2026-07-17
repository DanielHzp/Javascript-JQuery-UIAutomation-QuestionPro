POSTJS_Q16_S34B1

// Select the textarea inside the div
var textarea = document.querySelector('.answer-options textarea');

// Get its value
var textValue = textarea.value;

// update the custom variable 100
$survey.updateCustomVariable(100, textValue);


//If other is selected, extract comment added in other text box. source HTML of the text box to verify tree structure


var otherText = '';

$('textarea').each(function() {
    var value = $.trim($(this).val());

    if (value !== '') {
        otherText = value;
        return false; // exit loop
    }
});

$survey.updateCustomVariable(93, otherText);

console.log('otherText = ' + otherText);


console.log("============= Exits Q16 =============");