const datos=require("./cad.js");

function Sistema(){
    this.cad=new datos.CAD();
    this.cad.conectar(function(db){
        console.log("Conectado a Mongo Atlas");
    });
    this.usuarios={};

    this.agregarUsuario=function(email){
        let res={"email":-1};
        if (!this.usuarios[email]){
        this.usuarios[email]=new Usuario(email);
        res.email=email;
        }
        else{
        console.log("el email "+email+" está en uso");
        }
        return res;
        }
        

    this.obtenerUsuarios=function(){
        return this.usuarios;
    }

    this.usuarioActivo=function(email){
        let res = {activo:false};
        if(email in this.usuarios){
            res.activo = true;
        }
        return res;
    }

    this.eliminarUsuario=function(email){
        if(this.usuarios[email])
            delete(this.usuarios[email]);
    }

    this.numeroUsuarios=function(){
        return {num:Object.keys(this.usuarios).length}
    }

    this.usuarioGoogle=function(usr,callback){
        this.cad.buscarOCrearUsuario(usr,function(obj){
            callback(obj);
        });
    }

    this.registrarUsuario=function(obj,callback){
        let modelo=this;
        if (!obj.nick){
        obj.nick=obj.email;
        }
        this.cad.buscarUsuario(obj,function(usr){
            if (!usr){
                modelo.cad.insertarUsuario(obj,function(res){
                    callback(res);
                });
            }
            else
            {
                callback({"email":-1});
            }
        });
    }
        
        

   }

   
function Usuario(email){
    this.email=email;
   }

module.exports.Sistema=Sistema
