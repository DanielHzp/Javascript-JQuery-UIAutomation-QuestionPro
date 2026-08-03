GLOBALJS_LOGCUSTOMVARIABLES

//Trace API response JSON retrieving custom variable values

function logCustomVariables() {
    var customVars = {};

//I dont use more than variabl 100, but it goes up to 255 custom variabls
    for (var i = 1; i <= 100; i++) {
        customVars["custom" + i] = $survey.surveyResponseJson["custom" + i];
    }

    console.log("==== Survey Custom Variables ====");
    console.log(customVars);
    console.log("=================================");
}