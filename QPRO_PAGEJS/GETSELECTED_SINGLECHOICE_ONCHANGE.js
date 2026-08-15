GETSELECTED_SINGLECHOICE_ONCHANGE
//PREJS
jQuery('.radio-check').on('change', function () {

    var selectedText = jQuery(this)
        .closest('label')
        .find('.control-label')
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

    console.log(selectedText);

    setEmbeddedData("SmartphoneTypeText", selectedText);
});










//PREJS SAVES VALUE IN TEMPORARY UI STORAGE
console.log("====== ENTER OS ======");

$(document).on("change", "input[type='radio']", function () {
    sessionStorage.setItem(
        "selectedSmartphoneText",
        $(this)
            .closest("label")
            .find(".control-label")
            .clone()
            .children()
            .remove()
            .end()
            .text()
            .trim()
    );
});



//POSTJS


var selectedText = sessionStorage.getItem("selectedSmartphoneText");

console.log("Final selected option:", selectedText);


console.log("====== EXOT OS ======");
