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

        console.log("item: "+item);

//At least body wash or moisturizer selected
        if (item.indexOf("wash") !== -1 || item.indexOf("moisturizer") !== -1 ) {
            found = true;
            break;
        }
    }
}

//If wash or moisturizer not found, custom14=1 to finish survey
if (!found) {
    console.log("Enters if neither wash nor moisturizer selected");
    $survey.updateCustomVariable(14, "1");
}

//If neither category 1 (!=1) nor category 2 (!=1) assigned

var isCategory1 = $survey.surveyResponseJson.custom22;
var isCategory2 = $survey.surveyResponseJson.custom23;


if(isCategory1 != "1" && isCategory2 != "1")
{

    $survey.updateCustomVariable(14, "1");
}

//If category1=1 (body wash purchaser) and selected moisturizer then end survey
if(arr.indexOf("Moisturizer") > -1 && isCategory1 == "1" && isCategory2 != "1" )
{
$survey.updateCustomVariable(14, "1");

}

//If category2=1 (body moist purchaser) and selected wash then end survey
if(arr.indexOf("Wash") > -1 && isCategory2 == "1" && isCategory1 != "1" )
{
$survey.updateCustomVariable(14, "1");

}