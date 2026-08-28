//PREJS_AUTOPOPULATE_DATA
console.log("======== ENTER MS INFO PAGE ========================")
$(function () {

    // Format question labels NOT NEEDED HERE
    //$('.NOME .question-text-span').html('<strong>Il tuo nome</strong>');
    //$('.COGNOME .question-text-span').html('<strong>Il tuo cognome</strong>');

    // Copy values before navigating away from the page
    $('input[type="submit"], button[type="submit"]')
        .off('click.copyNameValues')
        .on('click.copyNameValues', function () {

            var nameU = $('.NOME input[type="text"]').val() || '';
            console.log("nameU: "+nameU);

            var lastnameU = $('.COGNOME input[type="text"]').val() || '';
            console.log("lastnameU: "+lastnameU);

            $('.Name input[type="text"]').val(nameU);
            $('.LastName input[type="text"]').val(lastnameU);
        });

});