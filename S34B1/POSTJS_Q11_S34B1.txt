POSTJS_Q11_S34B1
var matrixAnsIndex=$survey.getSelectedOptionsIndex("Q11");
var matrixAns=$survey.getSelectedOptions("Q11");

// Loop all checked radios (one per row)
$("input[type='radio']:checked").each(function () {

    var $input = $(this);

    // Row group (same as before)
    var rowName = $input.attr("name");

    // Get all radios in this row
    var $rowRadios = $("input[name='" + rowName + "']");

    // Column index (1-based)
    var colIndex = $rowRadios.index($input) + 1;

    // Get row text
    var rowText = $input.closest("tr").find("th:first, td:first").text().trim();

;

//console.log($input.closest("table").find("tr").first().text());

var headers = $input.closest("table").find("tr").first().children().slice(1);

// Column title (from table header)
var colTitle = headers.eq(colIndex - 1).text().trim();

console.log("Row: " + rowText + " → Column: " + colIndex + " colTitle: "+colTitle);

$survey.updateCustomVariable(6, "1");

if (!colTitle.toLowerCase().includes("stopped"))
{
console.log("Enters if NOT contains stopped shopping for...");
$survey.updateCustomVariable(6, "0");
}

//flag=1 if online or retailer website selected in Q10 and 'Stopped SHOPPING' NOT selected at Q11
if(rowText.toLowerCase().includes("online") || rowText.toLowerCase().includes("website") )
{
console.log("Enters if online or website selected...");

$survey.updateCustomVariable(7, "0");

if (!colTitle.toLowerCase().includes("stopped"))
{
    $survey.updateCustomVariable(7, "1");
}

}


});

