var socket = io();

$(window).load(function(){
    login_call();
});

var login_call = function(){
    $("#title").click(function(){
        window.location = '/'
    });

    // var CU_EMAIL_REGEX = "^(?P<uni>[a-z\d]+)@.*(columbia|barnard)\.edu$";
    var form_password = document.querySelector("input.form-control#password");

    form_password.addEventListener('keydown',function(event){
        var form_email = document.querySelector("input.form-control#email");
        
        if(event.which === 13){
            socket.emit('user joined',{
                email : form_email.value,
                password: form_password.value,
                time : time
            });
            console.log(form_email.value);
            console.log(form_password.value);
            event.preventDefault();
        }
    });
}