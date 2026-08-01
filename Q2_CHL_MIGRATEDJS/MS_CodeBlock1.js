MS_CodeBlock1
qid3 = "Q1340";

$(document).ready(function() {
            hhsize = parseInt('%[21438-21444]Q846_7%', 10);

            let resultArray = [];
            for (let i = 1; i <= 15; i++) {
                resultArray.push(i <= hhsize);
            }

            // Storing the result in variables
            let var1 = resultArray[0];
            let var2 = resultArray[1];
            let var3 = resultArray[2];
            let var4 = resultArray[3];
            let var5 = resultArray[4];
            let var6 = resultArray[5];
            let var7 = resultArray[6];
            let var8 = resultArray[7];
            let var9 = resultArray[8];
            let var10 = resultArray[9];

            // Update the input fields with the values
            $('#'+qid3+'_1').val(var2);
            $('#'+qid3+'_2').val(var3);
            $('#'+qid3+'_3').val(var4);
            $('#'+qid3+'_4').val(var5);
            $('#'+qid3+'_5').val(var6);
            $('#'+qid3+'_6').val(var7);
            $('#'+qid3+'_7').val(var8);
            $('#'+qid3+'_8').val(var9);
            $('#'+qid3+'_9').val(var10);

            console.log(var1, var2, var3, var4, var5, var6, var7, var8, var9);

});