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
        // $("#fmRegistro").remove();
        let email=$.cookie("email");
        if (!email){
            this.limpiar();
            $("#registro").load("./cliente/registro.html",function(){
                $("#btnRegistro").on("click",function(e){
                    e.preventDefault();
                    let email=$("#email").val();
                    let pwd=$("#pwd").val();
                    let name = $("#name").val();
                    let surname = $("#surname").val();
                    if (email && pwd){
                        rest.registrarUsuario(email,pwd,name,surname);
                        //this.mostrarLogin();
                        console.log(email+" "+pwd);
                    }
                });
            });
        }
    }

    this.mostrarLogin=function(){
        // $("#fmRegistro").remove();
        console.log("Mostrar login");
        let email=$.cookie("email");
        if (!email){
            this.limpiar();
            $("#login").load("./cliente/login.html",function(){
                $("#btnLogin").on("click",function(e){
                    e.preventDefault();
                    let email=$("#email").val();
                    let pwd=$("#pwd").val();
                    if (email && pwd){
                        rest.iniciarSesionUsuario(email,pwd);
                        console.log("login "+email+" "+pwd);
                    }
                });
            });
        }
    }


    this.mostrarSalir=function(){
        let email=$.cookie("email");
        if (email){
        this.salir();
        this.mostrarLogin();
        }
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
        $('#mostrarPlantillasEntrenamiento').remove()
        $('#plantillasEntrenamiento').empty()
        let cadena ='<h2 id="mMsg">'+msg+'</h2>';
        $('#msg').append(cadena);
        $("#homeContent").load("./cliente/carousel.html")
        let navBarItem = '<li class="nav-item" id="mostrarPlantillasEntrenamiento"><a class="nav-link" href="#" onclick="cw.mostrarPlantillasEntrenamiento()">Mostrar Plantillas</a></li>';
        $("#navBar").append(navBarItem);
    }

    this.salir=function(){
        $.removeCookie("email");
        rest.salir();
        // location.reload();
    }

    this.limpiar=function(){
        $("#au").empty();
        $("#ou").empty();
        $("#nu").empty();
        $("#ua").empty();
        $("#eu").empty();
        $("#fmLogin").remove();
        $("#pageLogin").remove();
        $("#fmRegistro").remove();
        $("#pageRegistro").remove();
        $('#mMsg').remove();
        $('#homeContent').empty();
        $('#mostrarPlantillasEntrenamiento').remove();
        $('#plantillasEntrenamiento').empty();
    }

    this.eliminarCuenta = function(){
        let email = $.cookie("email");
        if(email){
            $.removeCookie("email");
            location.reload();
            console.log("eliminarCuenta controlWeb");  
            rest.eliminarCuenta(email); 
        } 
    }

    this.mostrarPlantillasEntrenamiento=function(){
        // $("#fmRegistro").remove();
        console.log("Mostrar Plantillas Entrenamiento");
        $("#au").empty();
        $("#ou").empty();
        $("#nu").empty();
        $("#ua").empty();
        $("#eu").empty();
        $("#fmLogin").remove();
        $("#pageLogin").remove();
        $("#fmRegistro").remove();
        $("#pageRegistro").remove();
        $('#mMsg').remove();
        $('#homeContent').empty();
        $("#plantillasEntrenamiento").load("./cliente/plantillasEntrenamiento.html")
    }
    
    this.mostrarHome = function(){
        this.comprobarSesion()
    }

}
