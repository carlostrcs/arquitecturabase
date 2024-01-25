function Sistema(){
    this.usuarios={};
    this.agregarUsuario=function(email){
    this.usuarios[email]=new Usuario(email);
    }

    this.obtenerUsuarios=function(){
        return this.usuarios;
    }

    this.usuarioActivo=function(email){
        if(this.usuarios[email])
            return true;
        return false;
    }

    this.eliminarUsuario=function(email){
        if(this.usuarios[email])
            delete(this.usuarios[email]);
    }

    this.numeroUsuarios=function(){
        return Object.keys(this.usuarios).length
    }

   }

   
function Usuario(email){
    this.email=email;
   }