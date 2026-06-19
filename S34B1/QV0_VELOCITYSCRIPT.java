QV0_VELOCITYSCRIPT
#set($match= 0)
#set($ary = [0, 1])
#set($Qary = ["","1", "2"])
#set($aryval = [])
#set($aryvalQuota = [0])
#foreach( $val in $ary)
	#set($getresp = $survey.getResponseCount("Q1_Quota", $val, 2)) 	
	#set($getresp = $survey.parseInt("$getresp"))
	$aryvalQuota.add($getresp)
#end
$survey.updateHighCustomVariable(100,"$aryvalQuota")
$survey.branchTo("Q1_Quota")
Please wait...