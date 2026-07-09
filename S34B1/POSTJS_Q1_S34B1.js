POSTJS_Q1_S34B1


var selectedAnswers= $survey.getSelectedOptions('Q1');
//console.log("$survey.getSelectedOptions('Q1'): "+selectedAnswers);

for(var i=0;i<selectedAnswers.length;i++)
{
//console.log("selectedAnswers[i]:" + selectedAnswers[i]);

$survey.updateCustomVariable(i+4, selectedAnswers[i]);
}

//Flag if redirect to end of survey is needed, use custom14
var arr = $survey.getSelectedOptions("Q1");

$survey.updateCustomVariable(14, "0");

var found = false;
var BWashSelected=false;
var bMoistSelected=false;

if (arr && arr.length > 0) {

    for (var i = 0; i < arr.length; i++) {

        var item = arr[i].toString().toLowerCase();
        console.log("item[i]: "+item);


//At least body wash or moisturizer selected
        if (item.indexOf("wash") !== -1 || item.indexOf("moisturizer") !== -1 ) {
            found = true;

            if(item.indexOf("wash") !== -1){BWashSelected=true;}
            if(item.indexOf("moisturizer") !== -1){bMoistSelected=true;}
            break;
        }
    }
}

//If wash or moisturizer not found
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
console.log("Neither category 1 nor category 2");
}

//console.log("arr.indexOf(Moisturizer): "+arr.indexOf("Moisturizer"));

//If category1=1 (body wash purchaser) and selected moisturizer then end survey
if(bMoistSelected && isCategory1 == "1" && isCategory2 != "1" && !BWashSelected )
{
$survey.updateCustomVariable(14, "1");

console.log("Moisturizer is selected AND is category 1 and not category 2");

}

//If category2=1 (body moist purchaser) and selected wash then end survey
if(BWashSelected && isCategory2 == "1" && isCategory1 != "1" && !bMoistSelected)
{
$survey.updateCustomVariable(14, "1");

console.log("Body wash is selected AND is category 2 and not category 1");

}

console.log(" ============= EXIT Q1 =============");
logCustomVariables();
