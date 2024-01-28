function ClienteRest(){

    this.agregarUsuario=function(email){
    var cli=this;
    $.getJSON("/agregarUsuario/"+email,function(data){
    let msg="El email "+email+" está ocupado";
    if (data.email!=-1){
    console.log("Usuario "+email+" ha sido registrado")
    msg="Bienvenido al sistema, " + email;
    $.cookie("email",email);
    }
    else{
    console.log("El email ya está ocupado");
    }
    cw.mostrarMensaje(msg);
    });
    }

    this.agregarUsuario2=function(email){
        var cli=this;
        $.ajax({
            type:'GET',
            url:'/agregarUsuario/'+email,
            success:function(data){
            if (data.email!=-1){
            console.log("Usuario "+email+" ha sido registrado")
            }
            else{
            console.log("El email ya está ocupado");
            }
            },
            error:function(xhr, textStatus, errorThrown){
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
            });
           
    }

    this.obtenerUsuarios=function(){
        var cli = this;
        $.getJSON("/obtenerUsuarios", (data)=>{
            console.log(data)
        })
    }

    this.numeroUsuarios=function(){
        var cli = this;
        $.getJSON("/numeroUsuarios", (data)=>{
          console.log("El numero de usuarios es: " + data.num)
      })
    }

    this.usuarioActivo=function(email){
        var cli = this;
        $.getJSON("/usuarioActivo/" + email, (data)=>{
            if(data.activo){
              console.log("El usuario " + email + " está activo")
            }else{
              console.log("El usuario " + email + " no está activo")
            }
          })
    }

    this.eliminarUsuario=function(email){
        var cli = this;
        $.getJSON("/eliminarUsuario/" + email, )
    }

    this.registrarUsuario = function(email, password, name, surname) {
      $.ajax({
          type: 'POST',
          url: '/registrarUsuario',
          data: JSON.stringify({"email": email, "password": password, "name": name, "surname": surname}),
          success: function(data) {
              if (data.email !== -1) {
                  console.log("Usuario " + data.email + " ha sido registrado");
                //   $.cookie("email", data.email);
                  cw.limpiar();
                //   cw.mostrarMensaje("Bienvenido al sistema, " + data.email);
                  cw.mostrarLogin();
              } else {
                  alert("El email está ocupado!");
                  console.log("El email está ocupado");
              }
          },
          error: function(xhr, textStatus, errorThrown) {
              console.log("Status: " + textStatus);
              console.log("Error: " + errorThrown);
          },
          contentType: 'application/json'
      });
    }

    this.iniciarSesionUsuario=function(email,password){
        $.ajax({
            type: "POST",
            url: "/loginUsuario",
            data: JSON.stringify({ email: email, password: password }),
            success: function (data) {
              if (data.email != -1) {
                console.log("Usuario " + data.email + " ha sido loggeado");
                $.cookie("email", data.email);
                cw.limpiar();
                cw.mostrarMensaje("Bienvenido al sistema, " + data.email);
              //   cw.limpiar();
               
              } else {
                console.log("No se puede iniciar sesión");
                alert("Usuario y contraseña incorrectos o cuenta sin confirmar, inténtalo de nuevo");
              //   cw.limpiar();
              }
            },
            error: function (xhr, textStatus, errorThrown) {
              console.log("Status: " + textStatus);
              console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
          });
    }

    this.eliminarCuenta=function(email){
        console.log("eliminarCuenta clienteRest");
        $.getJSON("/eliminarCuenta/" + email);
    }

    this.salir=function(){
      console.log("salir clienteRest");
      $.getJSON("/salir");
    }
        
  


    
}