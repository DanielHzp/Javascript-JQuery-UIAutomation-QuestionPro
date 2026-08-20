PREJS_REDIRECT_CHAINSURVEY



//Try to read browser info from globalized object in QPro DOM
var ep = window.cvData.browserType;

//Try to read browser information
//var userAgent=navigator.userAgent;

console.log("ep = " + ep);
//console.log("userAgent = "+userAgent);

var optionSelect = (ep == "IN_APP_BROWSER") ? "2" : "1";

console.log("optionSelect = " + optionSelect);

var $answer = $('input[type=radio][aria-posinset="' + optionSelect + '"]');


$answer.prop('checked', true).trigger('change');










var ep = window.cvData.browserType;
// for testing -> var ep = "IN_APP_BROWSER"
console.log("ep = " + ep);

var pos = (ep == "IN_APP_BROWSER") ? "2" : "1";
console.log("pos = " + pos);

var $radio = $('input[type=radio][aria-posinset="' + pos + '"]');
$radio.prop('checked', true).trigger('change');