EXTRACTDATAFROMURL

// GET PARAMETERS FROM SECOND SURVEY
function getParameterByName(name) {  
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);  
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));  
} 