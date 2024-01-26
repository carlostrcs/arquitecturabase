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

        
}

module.exports.CAD = CAD;