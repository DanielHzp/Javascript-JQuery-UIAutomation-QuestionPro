POSTJS_Q1_Quota_S34B1
//Extract selected answer from the DOM
var selectedQuota = $('.Q1_Quota input:checked')
    .closest('label')
    .text()
    .trim();

console.log("Selected Quota:", selectedQuota);

$survey.updateCustomVariable(99, selectedQuota);

logCustomVariables();

console.log("=========== Exits Q1_Quota =========== ");