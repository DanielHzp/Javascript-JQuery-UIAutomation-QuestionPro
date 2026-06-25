PREJS_Q30_S34B1_TRANSPOSE
jQuery(document).ready(function () {

    setTimeout(function () {

        var container = jQuery("#QuestionSection_161780341"); //INSPECT HTML CONTAINER AND USE ID FROM CONTAINER OF MATRIX, IF QUESTION IS REPOSITIONE MAKE SURE TO UPDATE container ID

        // Remove previous render 
        container.find(".qp-transposed").remove();

        // Find matrix (QP moves it sometimes) VALIDATE iF PREVIEW MODE DIFFERS FROM LIVE MODE**

        var table = jQuery("table.parent-table").first();

        if (table.length === 0) {
            console.log("Matrix not found");
            return;
        }

        console.log("Matrix found ");

        // -------------------------
        // EXTRACT COLUMN STATEMENTS THAT MUST BE ROWS
        
        var attributes = [];
        table.find("thead td:gt(0)").each(function () {

            attributes.push(jQuery(this).text().trim());

        });

        // -------------------------
        // EXTRACT BRANDS FROM ROWS + MATRIX
     
        var brands = [];
        var matrix = [];

        var validRowIndex = 0; // ✅ FIXED INDEXING

        table.find("tbody tr").each(function () {

            var row = jQuery(this);

            // ✅ ONLY process real rows
            if (row.find("input").length === 0) {
                return;
            }

            var brand = "";

            brand = row.find(".control-label").first().text().trim();

            if (!brand) {
                brand = row.find("td:first").text().trim();
            }

            if (!brand) {
                return;
            }

            brands.push(brand);

            matrix[validRowIndex] = [];

            row.find("td:gt(0)").each(function (colIndex) {

                matrix[validRowIndex][colIndex] = jQuery(this).find("input");
            });

            validRowIndex++;

        });

        console.log("Statements about brand counted:", attributes.length);
        console.log("Brands:", brands.length);

        // -------------------------
        // HIDE ORIGINAL MATRIX (DO NOT USE .hide())
        
        table.closest(".table-wrapper").css({
            visibility: "hidden",
            position: "absolute",
            height: "0px",
            overflow: "hidden"
        });

        // -------------------------
        // CREATE TRANSPOSED UI MATRIX ANd CONCATENAT COLLAPSIBLE SIGNS
        
        var wrapper = jQuery('<div class="qp-transposed" style="margin-top:10px;"></div>');

        for (var c = 0; c < attributes.length; c++) {

            var attr = attributes[c];

            var block = jQuery(
                '<div class="qp-block" data-index="' + c + '" style="border:1px solid #ddd;margin-bottom:12px;border-radius:12px;overflow:hidden;">' +
                    '<div class="qp-header" style="padding:14px;background:#f5f5f5;font-weight:600;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">' +
                        '<span>' + attr + '</span>' +
                        '<span class="qp-icon">▶</span>' +
                    '</div>' +
                    '<div class="qp-body" style="display:none;padding:10px 14px;background:#fff;"></div>' +
                '</div>'
            );

            var body = block.find(".qp-body");

            for (var r = 0; r < brands.length; r++) {

                (function (rowIndex, colIndex) {

                    var brand = brands[rowIndex];

                    var originalInput = matrix[rowIndex] && matrix[rowIndex][colIndex];

                    var option = jQuery(
                        '<label style="display:block;padding:10px 0;border-bottom:1px solid #eee;">' +
                            '<input type="checkbox" style="margin-right:10px;">' +
                            '<span style="font-size:14px;">' + brand + '</span>' +
                        '</label>'
                    );

                    option.find("input").on("change", function () {

                        // HANDLE SELECTION
                        if (originalInput && originalInput.length && originalInput[0]) {
                            originalInput.prop("checked", this.checked).trigger("click");
                        }

                        
                        //  AUTO-CLOSE + AUTO-OPEN NEXT BEHAVIOR BELOW
                        
                        if (this.checked) {

                            var currentBlock = jQuery(this).closest(".qp-block");
                            var currentIndex = parseInt(currentBlock.attr("data-index"), 10);

                            var nextBlock = container.find('.qp-block[data-index="' + (currentIndex + 1) + '"]');

                            // Close current
                            currentBlock.find(".qp-body").slideUp(150);
                            currentBlock.find(".qp-icon").text("▶");

                            // Open next
                            if (nextBlock.length) {
                                nextBlock.find(".qp-body").slideDown(150);
                                nextBlock.find(".qp-icon").text("▼");
                            }

                        }

                    });

                    body.append(option);

                })(r, c);
            }

            // -------------------------
            // MANUAL TOGGLE BEHAVIOR BELOw
           
            block.find(".qp-header").on("click", function () {

                var currentBody = jQuery(this).next();
                var currentIcon = jQuery(this).find(".qp-icon");

                if (currentBody.is(":visible")) {
                    currentBody.slideUp(150);
                    currentIcon.text("▶");
                } else {
                    jQuery(".qp-body").slideUp(150);
                    jQuery(".qp-icon").text("▶");

                    currentBody.slideDown(150);
                    currentIcon.text("▼");
                }
            });

            wrapper.append(block);
        }

        // Add to question
        container.find(".answer-container").append(wrapper);

        // Open first section automatically
        container.find(".qp-block").first().find(".qp-body").show();
        container.find(".qp-block").first().find(".qp-icon").text("▼");

        console.log(" FINAL TRANSPOSE MATRIXC READY");

    }, 1500);

});