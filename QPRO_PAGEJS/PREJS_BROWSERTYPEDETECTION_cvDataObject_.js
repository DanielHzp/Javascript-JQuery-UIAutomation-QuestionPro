
//PREJS_BROWSERTYPEDETECTION_cvDataObject_QPRO
// ==========================
// BROWSER TYPE DETECTION
// ==========================
(function () {

    var ua = navigator.userAgent || "";

    var inAppSource = "NONE";

    if (/FBAN|FBAV/.test(ua)) {
        inAppSource = "FACEBOOK";
    } else if (/Instagram/.test(ua)) {
        inAppSource = "INSTAGRAM";
    } else if (/TikTok|musical_ly/.test(ua)) {
        inAppSource = "TIKTOK";
    } else if (/WhatsApp/.test(ua)) {
        inAppSource = "WHATSAPP";
    } else if (/MicroMessenger/.test(ua)) {
        inAppSource = "WECHAT";
    }

    var isWebView =
        inAppSource !== "NONE" ||
        /; ?wv\)/.test(ua) ||
        (
            /iPhone|iPad|iPod/.test(ua) &&
            /AppleWebKit/.test(ua) &&
            !/Safari\//.test(ua)
        );

    window.cvData = {
        browserType: isWebView
            ? "IN_APP_BROWSER"
            : "WEB_BROWSER"
    };

    console.log(" ============> Browser Type (window.cvData.browserType):", window.cvData.browserType);

    $(".console-log input[type='text']").val(window.cvData.browserType);
    
    $survey.updateCustomVariable(200, window.cvData.browserType);

})();

// ==========================
// URL UPDATE
// ==========================
window.updateURLStatus = function (status) {

    try {

        console.log(" URL before:", window.location.href);

        var url = new URL(window.location.href);

        url.searchParams.set("status", status);

        if (window.cvData && window.cvData.browserType) {
            url.searchParams.set(
                "browserType",
                window.cvData.browserType
            );
        }

        console.log(" URL after:", url.toString());

        window.history.replaceState({}, "", url.toString());

        console.log("URL updated successfully");
        console.log("Current URL:", window.location.href);

    } catch (e) {

        console.error("URL update failed:", e);

    }
};

// ==========================
// MAIN CHECK
// ==========================
window.checkSurveyStatus = function () {

    console.log("[QP] checkSurveyStatus() fired");

    var marker = document.getElementById("qp-success-marker");

    if (!marker) {

        console.log("[QP] Marker NOT found");

        return;
    }

    console.log("[QP] Marker found");

    var markerText = (marker.textContent || "").trim();

    console.log("[QP] Marker text =", markerText);

    // ==========================
    // COMPLETED
    // ==========================
    if (markerText === "survey_completed") {

        console.log("[QP] Completed marker detected");

        if (window.qpCompletedDetected) {

            console.log("[QP] Completed already processed");

            return;
        }

        updateURLStatus("Submitted");

        window.qpCompletedDetected = true;

        console.log("[QP] Completed flag set");
    }

    // ==========================
    // TERMINATED
    // ==========================
    if (markerText === "survey_terminated") {

        console.log("[QP] Terminated marker detected");

        if (window.qpTerminatedDetected) {

            console.log("[QP] Terminated already processed");

            return;
        }

        updateURLStatus("Terminated");

        window.qpTerminatedDetected = true;

        console.log("[QP] Terminated flag set");
    }
};

// ==========================
// INIT
// ==========================
console.log("[QP] Script initialized");

checkSurveyStatus();

var observer = new MutationObserver(function (mutations) {

    console.log(
        "[QP] MutationObserver triggered:",
        mutations.length,
        "mutation(s)"
    );

    checkSurveyStatus();

});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log(" MutationObserver attached");

logCustomVariables();

console.log("==== EXIT emailConfirmation====");