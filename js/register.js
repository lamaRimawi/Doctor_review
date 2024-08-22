(function () {
    'use strict';

    var form = document.getElementById('registerForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            var username = localStorage.getItem('username');
            var email = localStorage.getItem('email');
            var password = localStorage.getItem('password');

            var regUser = document.getElementById('name').value.trim();
            var regEmail = document.getElementById('email').value.trim();
            var regPass = document.getElementById('password').value.trim();


            if ((username && username === regUser) && (email && email === regEmail)) {
                showAlert('danger', 'User already exists. Please use a different username or email.');
            } else {

                localStorage.setItem('username', regUser);
                localStorage.setItem('email', regEmail);
                localStorage.setItem('password', regPass);

                showAlert('success', 'Registration successful! Redirecting to login page...');
                setTimeout(() => {
                    window.location.href = '../html/login.html';
                }, 1500);
            }
        } else {

            form.classList.add('was-validated');
        }
    });

    function showAlert(type, message) {
        var alertMessage = document.getElementById("alertMessage");
        var alertText = document.getElementById("alertText");

        alertMessage.classList.remove('d-none', 'alert-danger', 'alert-success');
        alertMessage.classList.add(`alert-${type}`);
        alertText.textContent = message;
    }
})();
