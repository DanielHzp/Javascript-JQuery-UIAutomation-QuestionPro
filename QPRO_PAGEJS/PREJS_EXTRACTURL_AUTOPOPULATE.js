//PREJS_EXTRACTURL_AUTOPOPULATE

console.log("==== ENTER MS ===== Page: Intro and Initial Parameters ========");

$(document).ready(function () {

    function getParameterByName(name) {
        var regex = new RegExp('[?&]' + name + '=([^&]*)', 'i');
        var match = regex.exec(window.location.search);

        if (match) {
            return decodeURIComponent(match[1].replace(/\+/g, ' '));
        }

        return null;
    }

    function getAppUrlParameter(paramName, appUrl) {
        var appUrlParams = appUrl.split('&');

        console.log("appUrlParams: "+appUrlParams);

        for (var i = 0; i < appUrlParams.length; i++) {
            if (appUrlParams[i].startsWith(paramName + '=')) {
                return decodeURIComponent(
                    appUrlParams[i].split('=').slice(1).join('=').replace(/\+/g, ' ')
                );
            }
        }

        return null;
    }

    // Retrieve primary parameters from sessionStorage or the current URL
    var CS = sessionStorage.getItem('CS') || getParameterByName('CS');
    var ADID = sessionStorage.getItem('ADID') || getParameterByName('ADID');
    var HHID = sessionStorage.getItem('HHID') || getParameterByName('HHID');
    var AppUrl = sessionStorage.getItem('AppUrl') || getParameterByName('AppUrl');
    var web_uuid =
        sessionStorage.getItem('web_uuid') ||
        getParameterByName('web_uuid');

    // Values extracted from AppUrl
    var CS2 = sessionStorage.getItem('CS2');
    var ep = sessionStorage.getItem('ep');
    var gclid = sessionStorage.getItem('gclid');
    var ttclid = sessionStorage.getItem('ttclid');
    var fbclid = sessionStorage.getItem('fbclid');

    if (AppUrl) {
        CS2 = CS2 || getAppUrlParameter('cs', AppUrl);
        ep = ep || getAppUrlParameter('ep', AppUrl);
        gclid = gclid || getAppUrlParameter('gclid', AppUrl);
        ttclid = ttclid || getAppUrlParameter('ttclid', AppUrl);
        fbclid = fbclid || getAppUrlParameter('fbclid', AppUrl);
    }

    // Store available parameters in sessionStorage
    if (!sessionStorage.getItem('CS') && CS) {
        sessionStorage.setItem('CS', CS);
    }

    if (!sessionStorage.getItem('ADID') && ADID) {
        sessionStorage.setItem('ADID', ADID);
    }

    if (!sessionStorage.getItem('HHID') && HHID) {
        sessionStorage.setItem('HHID', HHID);
    }

    if (!sessionStorage.getItem('AppUrl') && AppUrl) {
        sessionStorage.setItem('AppUrl', AppUrl);
    }

    if (!sessionStorage.getItem('web_uuid') && web_uuid) {
        sessionStorage.setItem('web_uuid', web_uuid);
    }

    if (!sessionStorage.getItem('CS2') && CS2) {
        sessionStorage.setItem('CS2', CS2);
    }

    if (!sessionStorage.getItem('ep') && ep) {
        sessionStorage.setItem('ep', ep);
    }

    if (!sessionStorage.getItem('gclid') && gclid) {
        sessionStorage.setItem('gclid', gclid);
    }

    if (!sessionStorage.getItem('ttclid') && ttclid) {
        sessionStorage.setItem('ttclid', ttclid);
    }

    if (!sessionStorage.getItem('fbclid') && fbclid) {
        sessionStorage.setItem('fbclid', fbclid);
    }

    /*
     * Remove irclickid from the AppUrl value when CS, CS2 and AppUrl
     * do not contain the word IMPACT.
     */
    if (
        !(CS && CS.toUpperCase().includes('IMPACT')) &&
        !(CS2 && CS2.toUpperCase().includes('IMPACT')) &&
        !(AppUrl && AppUrl.toUpperCase().includes('IMPACT'))
    ) {
        if (AppUrl) {
            AppUrl = AppUrl
                .replace(/([?&])irclickid=[^&]*&?/, '$1')
                .replace(/[?&]$/, '');
        }
    }

    console.log('CS from URL:', getParameterByName('CS'));
    console.log('Final CS value used:', CS);
    console.log('CS in sessionStorage:', sessionStorage.getItem('CS'));

    // Populate QuestionPro text fields
    if (CS) {
        $('.CS input[type="text"]').val(CS);
    } else if (CS2) {
        $('.CS input[type="text"]').val(CS2);
    } else {
        $('.CS input[type="text"]').val('');
    }

    console.log("ADID: "+ADID);
    $('.ADID input[type="text"]').val(ADID || '');
    console.log("HHID: "+HHID);
    $('.HHID input[type="text"]').val(HHID || '');
    console.log("AppUrl: "+AppUrl);
    $('.APPURL input[type="text"]').val(AppUrl || '');
    console.log("web_uuid: "+web_uuid);
    $('.WEB_UUID input[type="text"]').val(web_uuid || '');

    console.log("ep: "+ep);
    $('.ep input[type="text"]').val(ep || '');
    console.log("gclid: "+gclid);
    $('.gclid input[type="text"]').val(gclid || '');
    console.log("ttclid: "+ttclid);
    $('.ttclid input[type="text"]').val(ttclid || '');
    console.log("fbclid: "+fbclid);
    $('.fbclid input[type="text"]').val(fbclid || '');

    // Capture referrer and URL parameters only on the first execution
    if (!sessionStorage.getItem('referrerAndSearchSet')) {
        var combinedValue =
            document.referrer + ' and ' + window.location.search;

        $('.allparameters input[type="text"]').val(combinedValue);

        sessionStorage.setItem('referrerAndSearchSet', 'true');
        sessionStorage.setItem(
            'referrerAndSearchValue',
            combinedValue
        );
    } else {
        var storedValue =
            sessionStorage.getItem('referrerAndSearchValue') || '';

        $('.allparameters input[type="text"]').val(storedValue);
    }
});