PREJS_GOOGLEMAPSAPI


(function waitForGoogleAndInit() {

    if (!window.google || !google.maps || !google.maps.places) {
        setTimeout(waitForGoogleAndInit, 200);
        return;
    }

    var input = $('input[type=text]').eq(0)[0];

    if (!input) {
        setTimeout(waitForGoogleAndInit, 200);
        return;
    }

    var placeSelected = false;

    var autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'cl' }
    });

    autocomplete.addListener('place_changed', function () {

        var place = autocomplete.getPlace();

        if (place && place.geometry) {
            placeSelected = true;
        }

    });

    $('.next_button').on('click', function(e) {

        if (!placeSelected) {
            e.preventDefault();
            alert('Please select a location from the Google suggestions.');
            return false;
        }

    });

})();
``