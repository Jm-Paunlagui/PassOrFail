var max_subjects = 11; //maximum input boxes allowed
var subject_counter = 0; //initial text box count

$(document).ready(() => {
    var template = jQuery.validator.format($.trim($("#addSubject").html()));
    //adds new subject
    $("#add_subject").click(function (e) {
        $("#result").html(``);
        if (subject_counter < max_subjects) {
            $(template(1 + subject_counter++)).appendTo("#subject_lists");
            $('.rulingz').each(function () {
                $(this).rules("add", {
                    required: true,
                    number: true,
                    min: 0,
                    max: 100
                });
            });
        } else {
            $("#result").html(`
                <div class="flex flex-col text-center mt-12 bg-yellow-500 rounded-lg w-full py-4 mt-5 mb-16">
                    <div class = "px-8 font-semibold text-gray-100">
                        <p class="text-base xl:text-lg">You Reached the limits!</p>
                    </div>
                </div>
            `);
        }
        e.preventDefault();
    });

    //remove subjects
    $(document).on('click', '#remove', function () {
        $("#result").html(``);
        $(this).closest('#sub').remove();
        subject_counter--;
        alert(rem);
    });

    //validate form
    $("#form").validate({
        messages: {
            number: "Please enter a number",
            min: "Please enter a number greater than 0",
            max: "Please enter a number less than or equal to 100"
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
            let sum = 0;
            if ($('#subject_lists').children().length == 0) {
                $("#result").html(`
                <div class="flex flex-col text-center mt-12 bg-yellow-500 rounded-lg w-full py-4 mt-5 mb-16">
                    <div class = "px-8 font-semibold text-gray-100">
                        <p class="text-base xl:text-xl">Please add subjects to calculate!</p>
                    </div>
                </div>
                `);
            } else {
                $('.subGrade').each(function () {
                    sum += parseFloat($(this).val());
                    let gwa = sum / $('#subject_lists').children().length;
                    let grade = "";
                    (gwa >= 100) ? grade = "A+" : (gwa >= 90) ? grade = "A" : (gwa >= 80) ? grade = "B" : (gwa >= 70) ? grade = "C" : (gwa >= 60) ? grade = "D" : grade = "F";
                    if (grade != "") {
                        $("#result").html(``);
                        $("#result").html(`
                            <div class="grid grid-cols-2 justify-center shadow-lg mb-16">
                                <div class="flex bg-indigo-500 rounded-tl-lg rounded-bl-lg">
                                    <div class="place-items-center text-gray-100 px-8 py-6">
                                        <p class="text-sm lg:text-base font-medium">Subjects: ${subject_counter}</p>
                                        <p class="text-sm lg:text-base font-medium">Total: ${sum}</p>
                                        <p class="text-sm md:text-base lg:text-md font-medium">GWA: ${gwa.toFixed(3)} </p>
                                        <p class="text-sm lg:text-base font-medium">Remarks: ${grade}</p>
                                    </div>
                                </div>
                                <div class="flex rounded-tr-lg rounded-br-lg ${gwa >= 60 ? "bg-green-500" : "bg-red-500"}">
                                    <div class="text-gray-100 self-center mx-auto">
                                        <p class="text-3xl font-extrabold">${gwa >= 60 ? "Passed!" : "Failed!"}</p>                     
                                    </div>    
                                </div>
                            </div>
                        `);
                    } else {
                        $("#result").html(`
                            <div class="flex flex-col text-center mt-12 bg-yellow-500 rounded-lg w-full py-4 mt-5 mb-16">
                                <div class="px-8 font-semibold text-gray-100">
                                    <p class="text-base xl:text-xl">Please check your inputs!</p>
                                </div>
                            </div>
                        `);
                    }
                });
            }
        }
    });
});