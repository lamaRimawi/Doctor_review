var username=localStorage.getItem("username");
var password=localStorage.getItem("password");
var email=localStorage.getItem("email");
var reg_user=document.getElementById("name");
var reg_pass= document.getElementById("password");
var reg_email= document.getElementById("email");
var reg_sub= document.getElementById("signup");


reg_sub.addEventListener('click',(e)=>{
    e.preventDefault();
    if(reg_pass.value=="" || reg_user.value=="" || reg_email.value==""){
        alert("please fill all inputs");

    }
    else if(((username) && username === reg_user.value.trim()) && ((password) && password === reg_pass.value.trim()) && ((email) && email === reg_email.value.trim())){
         alert("y already have same account");
    }
    else {
        localStorage.setItem("username",reg_user.value.trim());
        localStorage.setItem("password",reg_pass.value.trim());
        localStorage.setItem("email",reg_email.value.trim());
        setTimeout(()=>{
            window.location="../html/login.html"
        } ,1500)

    }


});