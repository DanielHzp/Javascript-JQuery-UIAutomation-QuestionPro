REROUTENOTAVEENO_VELOCITYSCRIPT

#if(${custom8} == "1")
 $survey.branchTo("Thank_You_Page")
#else
$survey.branchTo("Q18")
#end
