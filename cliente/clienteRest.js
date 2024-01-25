function ClienteRest(){

    this.agregarUsuario=function(email){
    var cli=this;
    $.getJSON("/agregarUsuario/"+email,function(data){
    if (data.email!=-1){
    console.log("Usuario "+email+" ha sido registrado")
    }
    else{
    console.log("El email ya está ocupado");
    }
    })
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
}