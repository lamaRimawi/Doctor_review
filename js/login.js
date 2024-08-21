(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });

    var log_sub = document.getElementById("signIn");
    var log_pass = document.getElementById("password");
    var email_input = document.getElementById("email");

    log_sub.addEventListener('click', (e) => {
        e.preventDefault();
        var username = localStorage.getItem("username");
        var password = localStorage.getItem("password");
        var email = localStorage.getItem("email");

        if (log_pass.value === "" || email_input.value === "") {
            alert("Please fill all inputs");
        } else if (email && email_input.value.trim() === email &&
                   password && password === log_pass.value.trim()) {

            setTimeout(() => {
                window.location.href = "../html/index.html";
            }, 1500);
        } else {
            alert("Account not found");
        }
    });
})();
