// SPNQ1 BROWSER TYPE DETECTION
// Ensure dataLayer exists
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

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

    console.log("[QP] Browser Type:", window.cvData.browserType);

    var cvField = document.querySelector(".console-log input[type='text']");
    if (cvField) {
        cvField.value = window.cvData.browserType;
    }

    if (
        typeof $survey !== "undefined" &&
        typeof $survey.updateCustomVariable === "function"
    ) {
        $survey.updateCustomVariable(
            200,
            window.cvData.browserType
        );
    }

})();

// ==========================
// SANITIZE HELPER
// ==========================
function safe(str) {
    return (str || "").replace(/[<>]/g, "");
}

// ==========================
// GTAG LOADER
// ==========================
window.loadGTAG = function () {

    if (window.gtagLoaded) {
        console.log("[QP] GTAG already loaded");
        return;
    }

    console.log("[QP] Loading GTAG");

    var ids = [
        "G-B1K92EDLP1",
        "G-4858EN53CN",
        "AW-17195609171",
        "AW-10781342796"
    ];

    ids.forEach(function (id) {

        var s = document.createElement("script");

        s.async = true;
        s.src =
            "https://www.googletagmanager.com/gtag/js?id=" +
            id;

        document.head.appendChild(s);

        console.log("[QP] GTAG script added:", id);

    });

    gtag("js", new Date());

    ids.forEach(function (id) {
        gtag("config", id);
    });

    window.gtagLoaded = true;

    console.log("[QP] GTAG loaded");
};

// ==========================
// GTM LOADER
// ==========================
window.loadGTM = function () {

    if (window.gtmLoaded) {
        console.log("[QP] GTM already loaded");
        return;
    }

    console.log("[QP] Loading GTM");

    (function (w, d, s, l, i) {

        w[l] = w[l] || [];

        w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
        });

        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l !== "dataLayer"
                ? "&l=" + l
                : "";

        j.async = true;

        j.src =
            "https://www.googletagmanager.com/gtm.js?id=" +
            i +
            dl;

        f.parentNode.insertBefore(j, f);

    })(
        window,
        document,
        "script",
        "dataLayer",
        "GTM-MGSFRFN"
    );

    window.gtmLoaded = true;

    console.log("[QP] GTM loaded");
};

// ==========================
// URL UPDATE
// ==========================
window.updateURLStatus = function (status) {

    try {

        console.log("[QP] URL before:", window.location.href);

        var url = new URL(window.location.href);

        url.searchParams.set("status", status);

        if (
            window.cvData &&
            window.cvData.browserType
        ) {
            url.searchParams.set(
                "browserType",
                window.cvData.browserType
            );
        }

        if (status === "Submitted") {

            var CS = safe(
                document.getElementById("cs")?.textContent || ""
            );

            var emailQ1 = safe(
                document.getElementById("emailQ1")?.textContent || ""
            );

            var mobileQ1 = safe(
                document.getElementById("mobileQ1")?.textContent || ""
            );

            console.log("[QP] CS:", CS);
            console.log("[QP] Email:", emailQ1);
            console.log("[QP] Mobile:", mobileQ1);

            if (CS) {
                url.searchParams.set("cs", CS);
            }

            if (emailQ1) {
                url.searchParams.set("emailQ1", emailQ1);
            }

            if (mobileQ1) {
                url.searchParams.set("mobileQ1", mobileQ1);
            }
        }

        console.log("[QP] URL after:", url.toString());

        window.history.replaceState(
            {},
            "",
            url.toString()
        );

        console.log("[QP] URL updated successfully");
        console.log(
            "[QP] Current URL:",
            window.location.href
        );

    } catch (e) {

        console.error(
            "[QP] URL update failed:",
            e
        );

    }
};

// ==========================
// MAIN CHECK
// ==========================
window.checkSurveyStatus = function () {

    console.log("[QP] checkSurveyStatus() fired");

    var marker =
        document.getElementById(
            "qp-success-marker"
        );

    if (!marker) {

        console.log("[QP] Marker NOT found");

        return;
    }

    console.log("[QP] Marker found");

    var markerText =
        (marker.textContent || "").trim();

    console.log(
        "[QP] Marker text =",
        markerText
    );

    console.log(
        "[QP] Inside iframe?",
        window.top !== window
    );

    // ==========================
    // COMPLETED
    // ==========================
    if (
        markerText ===
        "survey_completed"
    ) {

        console.log(
            "[QP] Completed marker detected"
        );

        if (
            window.qpCompletedDetected
        ) {

            console.log(
                "[QP] Completed already processed"
            );

            return;
        }

        try {

            console.log(
                "[QP] Starting COMPLETED processing"
            );

            loadGTM();
            loadGTAG();

            var CS =
                document.getElementById("cs")
                    ?.textContent || "";

            var emailQ1 =
                document.getElementById("emailQ1")
                    ?.textContent || "";

            var mobileQ1 =
                document.getElementById("mobileQ1")
                    ?.textContent || "";

            CS = safe(CS);
            emailQ1 = safe(emailQ1);
            mobileQ1 = safe(mobileQ1);

            var phDigits =
                mobileQ1.replace(/\D+/g, "");

            var payload = {
                event: "qp_submission",
                qp_status: "submitted",
                qp_browser_type:
                    window.cvData.browserType,
                qp_cs: CS,
                qp_email: emailQ1,
                qp_phone: mobileQ1,
                qp_email_clean:
                    emailQ1
                        ? emailQ1
                              .trim()
                              .toLowerCase()
                        : "",
                qp_phone_digits:
                    phDigits,
                qp_has_email:
                    !!emailQ1,
                qp_has_phone:
                    !!phDigits,
                qp_is_ep3:
                    CS &&
                    CS.includes("EP3"),
                qp_is_google:
                    CS &&
                    CS.includes("Google")
            };

            console.log(
                "[QP] Pushing submission payload"
            );

            console.log(payload);

            window.dataLayer.push(
                payload
            );

            console.log(
                "[QP] dataLayer push complete"
            );

            updateURLStatus(
                "Submitted"
            );

            window.qpCompletedDetected =
                true;

            console.log(
                "[QP] Completed flag set"
            );

        } catch (e) {

            console.error(
                "[QP] COMPLETED error:",
                e
            );

        }
    }

    // ==========================
    // TERMINATED
    // ==========================
    if (
        markerText ===
        "survey_terminated"
    ) {

        console.log(
            "[QP] Terminated marker detected"
        );

        if (
            window.qpTerminatedDetected
        ) {

            console.log(
                "[QP] Terminated already processed"
            );

            return;
        }

        try {

            console.log(
                "[QP] Starting TERMINATED processing"
            );

            updateURLStatus(
                "Terminated"
            );

            window.qpTerminatedDetected =
                true;

            console.log(
                "[QP] Terminated flag set"
            );

        } catch (e) {

            console.error(
                "[QP] TERMINATED error:",
                e
            );

        }
    }
};

// ==========================
// INIT
// ==========================
console.log("[QP] Script initialized");

checkSurveyStatus();

var observer =
    new MutationObserver(function (
        mutations
    ) {

        console.log(
            "[QP] MutationObserver triggered:",
            mutations.length,
            "mutation(s)"
        );

        checkSurveyStatus();

    });

observer.observe(
    document.body,
    {
        childList: true,
        subtree: true
    }
);

console.log(
    "[QP] MutationObserver attached"
);