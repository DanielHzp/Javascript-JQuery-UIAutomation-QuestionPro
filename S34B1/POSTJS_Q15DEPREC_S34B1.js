POSTJS_Q15DEPREC_S34B1


var SelectedAnswerQ15 = $survey.getSelectedOptionIndex("Q15DEPREC");

console.log(SelectedAnswerQ15);

var currentAns=document.querySelector('input[type="radio"]:checked')?.value;

console.log(currentAns);

var currentAnsText=document.querySelector('input[type="radio"]:checked')?.closest('label')?.innerText.trim();
console.log("currentAnsText: "+currentAnsText);

//$survey.updateCustomVariable(6, "0");

//if(SelectedAnswerQ15  == 5)
if(currentAns==870323406)
{
//$survey.updateCustomVariable(6, "1");

}



