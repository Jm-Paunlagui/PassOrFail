$(document).ready(() => {
    $("#form").validate({
        rules: {
            prelims: {
                required: true,
                number: true,
                min: 0,
                max: 100
            },
            midterms: {
                required: true,
                number: true,
                min: 0,
                max: 100
            },
            finals: {
                required: true,
                number: true,
                min: 0,
                max: 100
            }
        },
        messages: {
            prelims: {
                required: "Please enter Prelims grade",
                number: "Please enter a number",
                min: "Please enter a number greater than 0",
                max: "Please enter a number less than or equal to 100"
            },
            midterms: {
                required: "Please enter Midterms grade",
                number: "Please enter a number",
                min: "Please enter a number greater than 0",
                max: "Please enter a number less than or equal to 100"
            },
            finals: {
                required: "Please enter Finals grade",
                number: "Please enter a number",
                min: "Please enter a number greater than 0",
                max: "Please enter a number less than or equal to 100"
            }
        },
        errorElement: "span",
        errorPlacement: (error, element) => {
            error.addClass("text-red-500 text-xs italic");
            error.insertAfter(element);
        },
        highlight: (element, errorClass, validClass) => {
            $(element).addClass("border border-red-500");
        },
        unhighlight: (element, errorClass, validClass) => {
            $(element).removeClass("border border-red-500");
        },
        submitHandler: (form) => {
            let prelims = $("#prelims").val();
            let midterms = $("#midterms").val();
            let finals = $("#finals").val();
            let total = parseInt(prelims) + parseInt(midterms) + parseInt(finals);
            let gwa = total / 3;
            let grade = "";
            (gwa >= 100) ? grade = "A+" : (gwa >= 90) ? grade = "A" : (gwa >= 80) ? grade = "B" : (gwa >= 70) ? grade = "C" : (gwa >= 60) ? grade = "D" : grade = "F";

            if (grade != "") {
                $("#form2").html(`
                <div class="grid grid-cols-2 justify-center shadow-lg">

                    <div class="flex bg-indigo-500 rounded-tl-lg rounded-bl-lg">
                        <div class="place-items-center text-gray-100 px-8 py-6">
                            <p class="text-sm lg:text-base font-medium">Total: ${total}</p>
                            <p class="text-sm md:text-base lg:text-md font-medium">GWA: ${gwa.toFixed(3)}</p>
                            <p class="text-sm lg:text-base font-medium">Remarks: ${grade}</p>
                        </div>
                    </div>

                    <div class="flex rounded-tr-lg rounded-br-lg ${gwa >= 60 ? "bg-lime-500": "bg-red-500"}">
                        <div class="text-gray-100 self-center mx-auto">
                            <p class="text-3xl font-extrabold">${gwa >= 60 ? "Passed!" : "Failed!"}</p>                     
                        </div>    
                    </div>
                </div>
                
                `);
            } else {
                alert("Please check your inputs");
                $("#form").trigger("reset");
            }
        }
    });
});