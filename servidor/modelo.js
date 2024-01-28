const datos=require("./cad.js");
const correo=require("./email.js");
const bcrypt = require("bcrypt");

function Sistema(){
    correo.conectar(function(res){
        console.log("Conectado a nodemailer");
    });
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
        if(this.usuarios[email]){
            delete(this.usuarios[email]);
        }
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
        this.cad.buscarUsuario({email: obj.email},function(usr){
            if (!usr){
                obj.key=Date.now().toString();
                obj.confirmada=false;
                bcrypt.hash(obj.password, 10, function (err, hash) {
                    obj.password = hash;
                    modelo.cad.insertarUsuario(obj,function(res){
                        callback(res);
                    });
                });
                correo.enviarEmail(obj.email,obj.key,"Confirmar cuenta");
            }
            else
            {
                callback({"email":-1});
            }
        });
    }

    this.loginUsuario=function(obj,callback){
        let modelo=this;
        this.cad.buscarUsuario({"email": obj.email, "confirmada": true},function(usr){
            if (usr && usr.password){
                bcrypt.compare(obj.password,usr.password, function(err,result){
                    if(err){
                        console.error("Error al comparar contraseñas:", err);
                        callback({ email: -1, err: "Error al comparar contraseñas"});
                    }else if (result){
                        callback(usr);
                    } else {
                        callback({ email: -1, err: "Usuario o contraseña incorrecta"}); // Contraseña incorrecta
                        console.error({ email: -1, err: "Usuario o contraseña incorrecta"});
                        console.error({result});
                      }
                });
            }
            else
            {
                callback({"email":-1});
            }
        });
    }

    this.confirmarUsuario = function(obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario({"email": obj.email, "confirmada": false, "key": obj.key}, function(usr) {
            if (usr) {
                usr.confirmada = true;
                modelo.cad.actualizarUsuario(usr, function(res) {
                    callback({"email": res.email}); // callback(res)
                });
            } else {
                callback({"email": -1});
            }
        });
    }

    this.eliminarCuenta=function(email,callback){
        // let {cad} = this;
        let modelo = this;
        this.cad.buscarUsuario({email:email},function(usr){
          if(!usr){
            callback({email:-1}) 
          }
          else{
            modelo.cad.eliminarCuenta(usr,function(ok){
              callback({email:1,msg:`Se ha eliminado al usuario ${usr.email}`})
            });
          }
        });
      }
    
      
    

    
        

   }

   
function Usuario(email){
    this.email=email;
   }

module.exports.Sistema=Sistema
