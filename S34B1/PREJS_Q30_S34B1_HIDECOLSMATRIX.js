PREJS_Q30_S34B1

    // 1. Get selected brands from Q16
    var selectedBrands = $survey.getSelectedOptions("Q16") || [];
    console.log(selectedBrands);

    // Normalize (safety: trim + lowercase)
    selectedBrands = selectedBrands.map(function(b){
        return String(b).trim().toLowerCase();
    });

    // 2. Target Q30 matrix
    var $q30 = $(".Q30");
    var $table = $q30.find("table.parent-table");

    // 3. Loop through ALL header rows (top + bottom)
    $table.find("thead tr").each(function(){

        $(this).find("td[role='columnheader']").each(function(index){

            // Skip first column (statements column)
            if(index === 0) return;

            var headerText = $(this).text().trim().toLowerCase();
            
            console.log("headerText: "+headerText+" index: "+index);

            // Always keep "None of the above"
            if(headerText === "none of the above") return;

            // Always keep "Other"
            if(headerText === "other") return;

            
          

            // 4. If NOT selected → hide column everywhere
            if(selectedBrands.indexOf(headerText) === -1){

                console.log(headerText+" NOT FOUND AMONG SELECTED OPTIONS IN Q16 ");

                // Hide header cell
                $(this).hide();

                // Hide corresponding column cells in all body rows
                $table.find("tbody tr").each(function(){
                    $(this).find("td").eq(index).hide();
                });
            }
        });

    });