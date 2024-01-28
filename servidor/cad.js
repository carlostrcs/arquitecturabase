const mongo=require("mongodb").MongoClient;
const ObjectId=require("mongodb").ObjectId;

function CAD(){
    this.usuarios;

    this.conectar=async function(callback){
        let cad=this;
        let client= new
        mongo("mongodb+srv://carlostorrillascasas1:rlxsduyKLzOlqonq@cluster0.gb4qbmd.mongodb.net/?retryWrites=true&w=majority");
        await client.connect();
        const database=client.db("sistema");
        cad.usuarios=database.collection("usuarios");
        callback(database);
    }

    this.buscarOCrearUsuario=function(usr,callback){
        buscarOCrear(this.usuarios,usr,callback);
    }

    function buscarOCrear(coleccion,criterio,callback){
        coleccion.findOneAndUpdate(criterio, {$set: criterio}, 
        {upsert:true,returnDocument:"after",projection:{email:1}}, 
        function(err,doc) {
            console.log("cad buscar o crear usuario");
            if (err) { throw err; }
            else {
                console.log(`Elemento actualizado > ${doc.value.email}`);

                callback({email:doc.value.email});
            }
        });
    }

    this.buscarUsuario=function(obj,callback){
        buscar(this.usuarios,obj,callback);
    }
    
    this.insertarUsuario=function(usuario,callback){
        insertar(this.usuarios,usuario,callback);
    }
    
    function buscar(coleccion,criterio,callback){
        coleccion.find(criterio).toArray(function(error,usuarios){
            if (usuarios.length==0){
                callback(undefined);
            }
            else{
                callback(usuarios[0]);
            }
        });
    }

    function insertar(coleccion,elemento,callback){
        coleccion.insertOne(elemento,function(err,result){
            if(err){
                console.log("error");
            }
            else{
                console.log("Nuevo elemento creado");
                callback(elemento);
            }
        });
    }

    this.actualizarUsuario=function(obj,callback){
        actualizar(this.usuarios,obj,callback);
    }
    
    function actualizar(coleccion, obj, callback) {
        coleccion.findOneAndUpdate(
            { _id: ObjectId(obj._id) },
            { $set: obj },
            {
                upsert: false,
                returnDocument: "after",
                projection: { email: 1 }
            },
            function (err, doc) {
                if (err) {
                    throw err;
                } else {
                    console.log("Elemento actualizado");
                    callback({ email: doc.value.email });
                }
            }
        );
    }

    this.eliminarUsuario=function(email){
        this.buscarUsuario({email: email},function(usr){
            if(!usr){
                callback({email: -1})
            }
        })

    }

    this.eliminarCuenta=function(obj,callback){
        eliminarCuenta2(this.usuarios,obj,callback);
      }
    
      function eliminarCuenta2(coleccion,obj,callback){
          coleccion.deleteOne(obj,function(err,result){
              if(!err){
                  callback(result);
              }
          });
      }
    

        
}

module.exports.CAD = CAD;