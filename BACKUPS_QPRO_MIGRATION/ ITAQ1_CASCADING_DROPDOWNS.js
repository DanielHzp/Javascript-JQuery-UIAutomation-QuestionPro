// ITAQ1_CASCADING_DROPDOWNS
$(function () {

    var URL = "/qp_userimages/sub-8/6407518/ITALYQ1DROPDOWNS.csv";
    var index = {};

    // Existing HTML dropdowns
    var $reg  = $(".CascadingDropdowns select#Regione");
    var $prov = $(".CascadingDropdowns select#Provincia");
    var $city = $(".CascadingDropdowns select#Citta");
    var $cap  = $(".CascadingDropdowns select#CAP");

    // Remove dropdowns accidentally created inside output questions
    $(".Region select#Regione").remove();
    $(".Province select#Provincia").remove();
    $(".City select#Citta").remove();
    $(".PostcodeOutput select#CAP").remove();

    // Hide QuestionPro output questions
    //$(".Region, .RegionID, .Province, .ProvinceID, " +
      //".City, .CityID, .PostcodeOutput, .PostcodeID").hide();

    // Same visual style for all four dropdowns
    $reg.add($prov).add($city).add($cap).css({
        width: "100%",
        minHeight: "42px"
    });

    function field(code) {
        return $("." + code + ' input[type="text"]').first();
    }

    function save(code, value) {
        field(code)
            .val(value || "")
            .trigger("input")
            .trigger("change");
    }

    function clearFields(codes) {
        $.each(codes, function (_, code) {
            save(code, "");
        });
    }

    function clean(value) {
        return $.trim(value || "")
            .replace(/^"|"$/g, "")
            .replace(/""/g, '"');
    }

    // Supports the quoted CSV generated for Italy
    function parseLine(line) {
        var output = [];
        var regex = /(?:^|,)("(?:[^"]|"")*"|[^,]*)/g;
        var match;

        while ((match = regex.exec(line)) !== null) {
            output.push(clean(match[1]));
        }

        return output;
    }

    function parseCSV(csv) {
        var rows = csv
            .replace(/^\uFEFF/, "")
            .split(/\r?\n/);

        var headers = parseLine(rows.shift());

        $.each(rows, function (_, line) {
            if (!$.trim(line)) return;

            var cols = parseLine(line);
            if (cols.length < headers.length) return;

            var row = {};

            $.each(headers, function (i, header) {
                row[header] = cols[i] || "";
            });

            if (
                !row.region ||
                !row.province ||
                !row.city ||
                !row.postcode
            ) {
                return;
            }

            // Preserve leading zeroes
            row.postcode = String(row.postcode).padStart(5, "0");

            var r = row.region;
            var p = row.province;
            var c = row.city;
            var z = row.postcode;

            if (!index[r]) {
                index[r] = {
                    id: row.region_id,
                    children: {}
                };
            }

            if (!index[r].children[p]) {
                index[r].children[p] = {
                    id: row.province_id,
                    children: {}
                };
            }

            if (!index[r].children[p].children[c]) {
                index[r].children[p].children[c] = {
                    id: row.city_id,
                    children: {}
                };
            }

            index[r].children[p].children[c].children[z] = {
                id: row.postcode_id
            };
        });
    }

    function populate($select, values, placeholder) {
        $select.empty().append(
            $("<option>", {
                value: "",
                text: placeholder
            })
        );

        values.sort(function (a, b) {
            return a.localeCompare(b, "it", {
                numeric: true,
                sensitivity: "base"
            });
        });

        $.each(values, function (_, value) {
            $select.append(
                $("<option>", {
                    value: value,
                    text: value
                })
            );
        });

        $select.prop("disabled", !values.length);

        if (values.length === 1) {
            $select.val(values[0]).trigger("change");
        }
    }

    function reset($select, placeholder) {
        $select
            .html(
                '<option value="">' +
                placeholder +
                "</option>"
            )
            .prop("disabled", true);
    }

    // Regione -> Provincia
    $reg.off("change.italy").on("change.italy", function () {
        var region = $(this).val();

        reset($prov, "Seleziona una provincia");
        reset($city, "Seleziona una città");
        reset($cap, "Seleziona un CAP");

        clearFields([
            "Province", "ProvinceID",
            "City", "CityID",
            "PostcodeOutput", "PostcodeID"
        ]);

        save("Region", region);
        save("RegionID", region ? index[region].id : "");

        if (region && index[region]) {
            populate(
                $prov,
                Object.keys(index[region].children),
                "Seleziona una provincia"
            );
        }
    });

    // Provincia -> Città
    $prov.off("change.italy").on("change.italy", function () {
        var region = $reg.val();
        var province = $(this).val();
        var node = region && province
            ? index[region].children[province]
            : null;

        reset($city, "Seleziona una città");
        reset($cap, "Seleziona un CAP");

        clearFields([
            "City", "CityID",
            "PostcodeOutput", "PostcodeID"
        ]);

        save("Province", province);
        save("ProvinceID", node ? node.id : "");

        if (node) {
            populate(
                $city,
                Object.keys(node.children),
                "Seleziona una città"
            );
        }
    });

    // Città -> CAP
    $city.off("change.italy").on("change.italy", function () {
        var region = $reg.val();
        var province = $prov.val();
        var city = $(this).val();

        var node = region && province && city
            ? index[region].children[province].children[city]
            : null;

        reset($cap, "Seleziona un CAP");

        clearFields([
            "PostcodeOutput",
            "PostcodeID"
        ]);

        save("City", city);
        save("CityID", node ? node.id : "");

        if (node) {
            populate(
                $cap,
                Object.keys(node.children),
                "Seleziona un CAP"
            );
        }
    });

    // Store CAP and postcode ID
    $cap.off("change.italy").on("change.italy", function () {
        var region = $reg.val();
        var province = $prov.val();
        var city = $city.val();
        var postcode = $(this).val();

        var node = (
            region &&
            province &&
            city &&
            postcode
        )
            ? index[region]
                .children[province]
                .children[city]
                .children[postcode]
            : null;

        save("PostcodeOutput", postcode);
        save("PostcodeID", node ? node.id : "");
    });

    // Initial state
    reset($reg, "Caricamento...");
    reset($prov, "Seleziona una provincia");
    reset($city, "Seleziona una città");
    reset($cap, "Seleziona un CAP");

    // Load QuestionPro CSV
    $.ajax({
        url: URL,
        dataType: "text",
        cache: true
    })
    .done(function (csv) {
        parseCSV(csv);

        populate(
            $reg,
            Object.keys(index),
            "Seleziona una regione"
        );

        console.log(
            "Italy cascading dropdowns loaded:",
            Object.keys(index).length,
            "regions"
        );
    })
    .fail(function (_, status, error) {
        console.error("CSV loading failed:", status, error);
        reset($reg, "Errore di caricamento");
    });

    // Require all four selections
    $("#SurveySubmitButtonElement")
        .off("click.italyValidation")
        .on("click.italyValidation", function (e) {
            if (
                !$reg.val() ||
                !$prov.val() ||
                !$city.val() ||
                !$cap.val()
            ) {
                e.preventDefault();
                e.stopImmediatePropagation();

                alert(
                    "Per favore, seleziona Regione, " +
                    "Provincia, Città e CAP prima di continuare."
                );

                return false;
            }
        });
});