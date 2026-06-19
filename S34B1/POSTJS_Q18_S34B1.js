POSTJS_Q18_S34B1
var arr = $survey.getSelectedOptions("Q18");

$survey.updateCustomVariable(9, "0");

var found = false;

if (arr && arr.length > 0) {

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i].toString().toLowerCase();

        if (item.indexOf("daily") !== -1) {
            found = true;
            break;
        }
    }
}

if (!found) {
    console.log("Enters if daily moisturizing NOT selected");
    $survey.updateCustomVariable(9, "1");
}