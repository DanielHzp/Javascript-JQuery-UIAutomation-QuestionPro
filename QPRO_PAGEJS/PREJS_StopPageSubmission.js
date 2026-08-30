//PREJS_StopPageSubmission

$(document).ready(function () {

    var form = document.getElementById('runForm');

    form.addEventListener('submit', function (event) {
       
        var message = '';
    
            message = 'STOP SUBMISSION OF CURRENT PAGE';
        

        if (message) {
            event.preventDefault();
            event.stopImmediatePropagation();
            alert(message);
            return false;
        }
    }, true);
});