(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                var email_input = document.getElementById("email");
                var log_pass = document.getElementById("password");
                var email = localStorage.getItem("email");
                var password = localStorage.getItem("password");
                var isValid = true;

                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                var passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;


                if (email_input.value.trim() == "") {
                    email_input.classList.add("is-invalid");
                    email_input.nextElementSibling.textContent = "Valid email is required.";
                    isValid = false;
                } else if (!(emailPattern.test(email_input.value.trim()))) {
                    email_input.classList.add("is-invalid");
                    email_input.nextElementSibling.textContent = "Please enter a valid email.";
                    isValid = false;
                } else {
                    email_input.classList.remove("is-invalid");
                    email_input.classList.add("is-valid");
                }


                if (log_pass.value.trim() == "") {
                    log_pass.classList.add("is-invalid");
                    log_pass.nextElementSibling.textContent = "Valid password is required.";
                    isValid = false;
                } else if (!(passwordPattern.test(log_pass.value.trim()))) {
                    log_pass.classList.add("is-invalid");
                    log_pass.nextElementSibling.textContent = "Password must be at least 6 characters long, contain at least one uppercase letter, and one number.";
                    isValid = false;
                } else {
                    log_pass.classList.remove("is-invalid");
                    log_pass.classList.add("is-valid");
                }

                if (isValid) {

                    if (email_input.value.trim() === email && log_pass.value.trim() === password) {
                        showAlert('success', 'Login successful! Redirecting...');
                        setTimeout(() => {
                            window.location.href = "../html/index.html";
                        }, 1500);
                    } else {
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
