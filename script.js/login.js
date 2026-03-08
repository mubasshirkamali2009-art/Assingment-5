const usernameInput=document.getElementById( "input-username" );
const  passwordInput=document.getElementById("input-password");




document.getElementById("login-btn" ).addEventListener("click",
    function(){
        const user=usernameInput.value;
        const pass=passwordInput.value;
        if(user=='admin' && pass=='admin123'){
            alert('Login success')
            window.location.assign("home.html");
        }
        else{
            alert("Youre Not Allowed Try Agine");
            return;
        }
    }
)