function ControlWeb(){

    this.mostrarAgregarUsuario = ()=>{
        $('#bnv').remove();
        $('#mAU').remove();
        let cadena = `
        <div id="mAU">
            <div class="card">
                <div class="card-body">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <p><input type="text" class="form-control" id="email" placeholder="Introduce un email"></p>
                        <button id="btnAU" type="submit" class="btn btn-primary">Submit</button>
                        <div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_light_focus_web@2x.png" style="height:40px;"></a></div>
                    </div>
                </div>
            </div>
        </div>
        `;
        $("#au").append(cadena);
        $("#btnAU").on("click",function(){ 
            let email = $("#email").val();
            rest.agregarUsuario(email);
            $("#mAU").remove();

        })
    }

    this.mostrarRegistro=function(){
        $("#fmRegistro").remove();
        $("#registro").load("./cliente/registro.html",function(){
            $("#btnRegistro").on("click",function(e){
                e.preventDefault();
                let email=$("#email").val();
                let pwd=$("#pwd").val();
                if (email && pwd){
                    //rest.registrarUsuario(nick);
                    console.log(email+" "+pwd);
                }
            });
        });
    }
        

    this.comprobarSesion=function(){
        let email=$.cookie("email");
        if (email){
        cw.mostrarMensaje("Bienvenido al sistema, "+email);
        console.log(email);
        }
        else{
        cw.mostrarRegistro();
        }
    }

    this.mostrarMensaje=(msg)=>{
        $('#mMsg').remove()
        let cadena ='<h2 id="mMsg">'+msg+'</h2>';
        $('#msg').append(cadena);
    }

    this.salir=function(){
        $.removeCookie("email");
        location.reload();
        }
}
