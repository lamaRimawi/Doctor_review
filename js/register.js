(function () {
    'use strict';

    var form = document.getElementById('registerForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var storedUsername = localStorage.getItem('username');
        var storedEmail = localStorage.getItem('email');

        var regUser = document.getElementById('name');
        var regEmail = document.getElementById('email');
        var regPass = document.getElementById('password');
        var isValid = true;

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        var usernamePattern = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}[a-zA-Z0-9]$/;


        if (regUser.value.trim() == "") {
            regUser.classList.add("is-invalid");
            regUser.nextElementSibling.textContent = "Valid username is required.";
            isValid = false;
        } else if (!(usernamePattern.test(regUser.value.trim()))) {
            regUser.classList.add("is-invalid");
            regUser.nextElementSibling.textContent = "Please enter a valid username. It must be 3-16 characters long, start with a letter, and can contain letters, numbers, underscores (_), and hyphens (-). It cannot start or end with a special character, and consecutive underscores or hyphens are not allowed.";
            isValid = false;
        } else {
            regUser.classList.remove("is-invalid");
            regUser.classList.add("is-valid");
        }


        if (regEmail.value.trim() == "") {
            regEmail.classList.add("is-invalid");
            regEmail.nextElementSibling.textContent = "Valid email is required.";
            isValid = false;
        } else if (!(emailPattern.test(regEmail.value.trim()))) {
            regEmail.classList.add("is-invalid");
            regEmail.nextElementSibling.textContent = "Please enter a valid email address.";
            isValid = false;
        } else {
            regEmail.classList.remove("is-invalid");
            regEmail.classList.add("is-valid");
        }


        if (regPass.value.trim() == "") {
            regPass.classList.add("is-invalid");
            regPass.nextElementSibling.textContent = "Valid password is required.";
            isValid = false;
        } else if (!(passwordPattern.test(regPass.value.trim()))) {
            regPass.classList.add("is-invalid");
            regPass.nextElementSibling.textContent = "Password must be at least 6 characters long, contain at least one uppercase letter, and one number.";
            isValid = false;
        } else {
            regPass.classList.remove("is-invalid");
            regPass.classList.add("is-valid");
        }

        if (isValid) {

            if ((storedUsername && storedUsername === regUser.value.trim()) && (storedEmail && storedEmail === regEmail.value.trim())) {
                showAlert('danger', 'User already exists. Please use a different username or email.');
            } else {
                // Save the new user information
                localStorage.setItem('username', regUser.value.trim());
                localStorage.setItem('email', regEmail.value.trim());
                localStorage.setItem('password', regPass.value.trim());

                showAlert('success', 'Registration successful! Redirecting to login page...');
                setTimeout(() => {
                    window.location.href = '../html/login.html';
                }, 1500);
            }
        }

        form.classList.add('was-validated');
    }, false);

    function showAlert(type, message) {
        var alertMessage = document.getElementById("alertMessage");
        var alertText = document.getElementById("alertText");

        alertMessage.classList.remove('d-none', 'alert-danger', 'alert-success');
        alertMessage.classList.add(`alert-${type}`);
        alertText.textContent = message;
    }
})();
