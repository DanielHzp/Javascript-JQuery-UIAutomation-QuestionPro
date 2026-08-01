CODEBLOCK1_21438_21444


qid1 = "Q846";
qid2 = "Q893";
qid11 = "Q1029";
qid12 = "Q1030";
qid13 = "Q1028";

$(document).ready(function(){ 

// GET PARAMETERS FROM SECOND SURVEY
function getParameterByName(name) {  
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);  
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));  
}  

var CS = getParameterByName('CS') ; // CS 
var ADID = getParameterByName('ADID') ; // ADID 
var HHID = getParameterByName('HHID') ; // HHID
var FIRSTNAME = getParameterByName('FIRSTNAME') ; // FIRSTNAME
var LASTNAME = getParameterByName('LASTNAME') ; // LASTNAME
var HHSIZE = getParameterByName('HHSIZE') ; // HHSIZE
var DOB = getParameterByName('DOB') ; // DOB 
var ISHOH = getParameterByName('ISHOH') ; // ISHOH
var HOHFIRSTNAME = getParameterByName('HOHFIRSTNAME') ; // HOHFIRSTNAME
var HOHLASTNAME = getParameterByName('HOHLASTNAME') ; // HOHLASTNAME
var CITYNAME = getParameterByName('CTY') ; // Nombre de la communa

console.log("CS: "+CS);

// SET "CURRENT ITEM SELECTED"
$('#'+qid11+'_1').val(CS);
$('#'+qid12+'_1').val(ADID);
$('#'+qid13+'_1').val(HHID);

// for testing purposes
$('#'+qid1+'_1').val(FIRSTNAME);
$('#'+qid1+'_2').val(LASTNAME);
$('label[for$="_2"]').parent().parent().hide();
$('#'+qid1+'_3').val("home address test");
$('#'+qid1+'_3').hide();
$('label[for$="_3"]').parent().parent().hide();
$('#'+qid1+'_4').val("12345");
$('#'+qid1+'_4').hide();
$('label[for$="_4"]').parent().parent().hide();
$('#'+qid1+'_5').val("ARABA/ALAVA");
$('#'+qid1+'_5').hide();
$('label[for$="_5"]').parent().parent().hide();
$('#'+qid1+'_6').val("ALEGRIA-DULANTZI");
$('#'+qid1+'_6').hide();
$('label[for$="_6"]').parent().parent().hide();
$('#'+qid1+'_7').val(HHSIZE);
$('#'+qid1+'_8').val(DOB);
$('label[for$="_8"]').parent().parent().hide();
$('#'+qid1+'_9').val(ISHOH);
$('#'+qid1+'_10').val(HOHFIRSTNAME);
$('#'+qid1+'_11').val(HOHLASTNAME);
$('label[for$="_11"]').parent().parent().hide();
$('#'+qid1+'_12').val(CITYNAME);

// $('input[type=text]').attr('readonly', true);
$('input[type=text][id$=_7]').attr('readonly', false);

$('input[type="submit"]').click(function () { 
i = $('#'+qid1+'_7').val();
$('#'+qid2+'_'+i).prop("checked", true);
}); // end click function

}); // ready

