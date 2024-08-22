(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {

                event.preventDefault();

                if (!form.checkValidity()) {

                    event.stopPropagation();
                } else {

                    var email_input = document.getElementById("email");
                    var log_pass = document.getElementById("password");
                    var email = localStorage.getItem("email");
                    var password = localStorage.getItem("password");

                    if (email_input.value.trim() === email && log_pass.value.trim() === password) {
                        // If credentials match, show success alert and redirect
                        showAlert('success', 'Login successful! Redirecting...');
                        setTimeout(() => {
                            window.location.href = "../html/index.html";
                        }, 1500);
                    } else {
                        // If credentials don't match, show danger alert and mark fields as invalid
                        showAlert('danger', 'Incorrect email or password.');
                        email_input.classList.add('is-invalid');
                        log_pass.classList.add('is-invalid');
                    }
                }


                form.classList.add('was-validated');
            }, false);
        });


    function showAlert(type, message) {
        var alertMessage = document.getElementById("alertMessage");
        var alertText = document.getElementById("alertText");

        alertMessage.classList.remove('d-none', 'alert-danger', 'alert-success');
        alertMessage.classList.add(`alert-${type}`);
        alertText.textContent = message;
    }

})();
