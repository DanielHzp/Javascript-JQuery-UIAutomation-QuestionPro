PREJS_Q1_Quota_S34B1

/*Pre JS Q1_Quota*/
var _options_name = ["","Body Wash","Body Moisturizer"];
var _arr_string = $survey.surveyResponseJson.custom100;
_arr_string = _arr_string.slice(0,-1);
_arr_string = _arr_string.slice(1);
var _All_Options_Quota = _arr_string.split(',');
var _Least_Options_Quota = [];

//DH get categories flag value
var categ_1= $survey.surveyResponseJson.custom1;
var categ_2= $survey.surveyResponseJson.custom2;
console.log("categ 1:  ",categ_1," categ2:  ",categ_2);

var _Qoptions_selected = [];

$('.Q1_Quota .multiple-choice-question > .answer-options > label').each(function( index ) {
	var str = $(this).attr('class');
	var newStr = parseInt(str.replace("controls control-selection answerRow", "").replace("ID", ""));
	_Qoptions_selected.push(newStr);
});

var _Qoptions_selected_Quota = [];
jQuery.each( _Qoptions_selected, function( i, val ) {
	var _temp = parseInt(_All_Options_Quota[val]);
	_Qoptions_selected_Quota.push(_temp);
});

console.log("_Qoptions_selected- ",_Qoptions_selected);
console.log("_Qoptions_selected_Quota- ",_Qoptions_selected_Quota);

var _min = Math.min.apply(Math,_Qoptions_selected_Quota);
console.log("Min- ",_min);

jQuery.each( _Qoptions_selected_Quota, function( i, val ) {
	if (_Qoptions_selected_Quota[i] == _min) {
		_Least_Options_Quota.push(_Qoptions_selected[i]);
	}	
});
console.log("_Least_Options_Quota- ",_Least_Options_Quota);

var _random_select = _Least_Options_Quota[Math.floor(Math.random()*_Least_Options_Quota.length)];
console.log("_random_select",_options_name[_random_select]);
var _index = _options_name.indexOf(_options_name[_random_select]);
$survey.setOptionSelected("Q1_Quota",_index);