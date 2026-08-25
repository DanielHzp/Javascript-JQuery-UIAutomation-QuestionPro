GLOBALJS_LOGCUSTOMVARIABLES

//Trace Browser QPRO API response JSON retrieving custom variable values

function logCustomVariables() {
    var customVars = {};

// it goes up to 255 custom variables
    for (var i = 1; i <= 100; i++) {
        customVars["custom" + i] = $survey.surveyResponseJson["custom" + i];
    }

    console.log("==== Survey Custom Variables ====");
    console.log(customVars);
    console.log("=================================");
}