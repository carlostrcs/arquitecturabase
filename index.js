const fs=require("fs");
const express = require('express');
const app = express();
const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + "/"));
let sistema = new modelo.Sistema();

app.get("/", function(request,response){
    var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
    response.setHeader("Content-type","text/html");
    response.send(contenido);
});
app.listen(PORT, () => {
console.log(`App está escuchando en el puerto ${PORT}`);
console.log('Ctrl+C para salir');
});

app.get("/agregarUsuario/:email",function(request,response){
    let email=request.params.email;
    let res=sistema.agregarUsuario(email);
    response.send(res);
});

app.get("/obtenerUsuarios",function(request,response){
    let res=sistema.obtenerUsuarios();
    response.send(res);
});

app.get("/usuarioActivo/:email",function(request,response){
    let email=request.params.email;
    let res=sistema.usuarioActivo(email);
    response.send(res);
});

app.get("/numeroUsuarios",function(request,response){
    let res=sistema.numeroUsuarios();
    response.send(res);
});

app.get("/eliminarUsuario/:email",function(request,response){
    let email=request.params.email;
    let res=sistema.eliminarUsuario(email);
    response.send(res);
});

