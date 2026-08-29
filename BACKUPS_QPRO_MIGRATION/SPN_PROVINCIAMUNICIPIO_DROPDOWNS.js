//SPN_PROVINCIAMUNICIPIO_DROPDOWNS
/* =======================
   PRE JS
======================== */

$(function () {

    var rawData = [];
    var index = {};

    // =======================
    // LOAD CSV
    // =======================
    $.ajax({
        url: '/qp_userimages/sub-11/6310699/ProvinciaMunicipioESP.csv',
        dataType: 'text',
        success: function (data) {
            parseCSV(data);
            buildIndex();
            populate('#prov', Object.keys(index));
        },
        error: function () {
            console.error('Failed to load CSV');
        }
    });

    // =======================
    // PARSE CSV
    // =======================
    function parseCSV(data) {
        var rows = data.split('\n');
        var headers = rows[0].split(',');

        for (var i = 1; i < rows.length; i++) {
            var cols = rows[i].split(',');
            if (cols.length < headers.length) continue;

            var obj = {};
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = cols[j].trim();
            }

            rawData.push(obj);
        }
    }

    // =======================
    // BUILD INDEX
    // =======================
    function buildIndex() {
        rawData.forEach(function (row) {

            var prov = row["Provincia"];
            var mun  = row["Municipio"];

            if (!index[prov]) index[prov] = {};
            if (!index[prov][mun]) index[prov][mun] = [];

            index[prov][mun].push(row);
        });
    }

    // =======================
    // POPULATE DROPDOWN
    // =======================
    function populate(selector, values) {

        var html = '<option value="">Selección</option>';

        values.forEach(function (v) {
            html += '<option value="' + v + '">' + v + '</option>';
        });

        $(selector).html(html);

        if (values.length === 1) {
            $(selector).val(values[0]).trigger('change');
        }
    }

    // =======================
    // RESET LOWER DROPDOWNS
    // =======================
    function resetBelow(current) {

        var order = ['#prov', '#mun'];
        var idx = order.indexOf(current);

        for (var i = idx + 1; i < order.length; i++) {
            $(order[i]).html('<option value="">Select</option>');
        }
    }

    // =======================
    // CASCADING
    // =======================

    // Province → Municipality
    $('#prov').on('change', function () {

        var prov = $(this).val();
        resetBelow('#prov');

        if (prov && index[prov]) {
            populate('#mun', Object.keys(index[prov]));
        }

        $('input[type="text"]:eq(2)').val(prov);
    });

    // Municipality logic
    $('#mun').on('change', function () {

        var mun = $(this).val();
        $('input[type="text"]:eq(3)').val(mun);

        if (mun === "CEUTA" || mun === "MELILLA") {
            $('input[type="radio"]:eq(0)').prop("checked", true);
        } else {
            $('input[type="radio"]:eq(1)').prop("checked", true);
        }
    });

    // ================================
    // VALIDATION
    // ================================
    function validate() {

        var provV = $('#prov').val();
        var munV  = $('#mun').val();

        return !!(provV && munV);
    }

    // ================================
    // SUBMIT HANDLER
    // ================================
    $('#SurveySubmitButtonElement').on('click.geoValidation', function (e) {

        if (!validate()) {
            e.preventDefault();
            e.stopImmediatePropagation();

            alert('Por favor, seleccione todos los campos antes de continuar');
            return false;
        }
    });

});