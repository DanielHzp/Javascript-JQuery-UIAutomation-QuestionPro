POSTJS_Q1_S34B1


var selectedAnswers= $survey.getSelectedOptions('Q1');

console.log(selectedAnswers);

for(var i=0;i<selectedAnswers.length;i++)
{
console.log(selectedAnswers[i]);

$survey.updateCustomVariable(i+4, selectedAnswers[i]);

}

//Flag if redirect to end of survey is needed, use custom14
var arr = $survey.getSelectedOptions("Q1");

$survey.updateCustomVariable(14, "0");

var found = false;

if (arr && arr.length > 0) {

    for (var i = 0; i < arr.length; i++) {

        var item = arr[i].toString().toLowerCase();

//At least body wash or moisturizer selected
        if (item.indexOf("wash") !== -1 || item.indexOf("moisturizer") !== -1 ) {
            found = true;
            break;
        }
    }
}

//If wash or moisturizer not found
if (!found) {
    console.log("Enters if neither wash nor moisturizer selected");
    $survey.updateCustomVariable(14, "1");
}



