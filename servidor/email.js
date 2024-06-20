const nodemailer = require('nodemailer');
// const url = "http://localhost:3000/"; // Cambia esta URL a la de tu despliegue
const url = "https://arquitecturabase2-f3atvethyq-no.a.run.app/";
const gv = require('./gestorVariables.js');

let options = {
    user: undefined,
    pass: undefined
}

module.exports.conectar=function(callback){
    gv.obtenerOptionsEmail(function(res){
        options=res;
        callback(res);
    });
}
  

module.exports.enviarEmail = async function(direccion, key, men) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'gmail',
    auth: options,
    tls:{rejectUnauthorized:false}
  });
  
  console.log("Direccion de corrreo: " + direccion)
  const result = await transporter.sendMail({
    from: 'alguienanonimo2000@gmail.com',
    to: direccion,
    subject: men,
    text: 'Pulsa aquí para confirmar cuenta',
    html: '<p>Bienvenido a Sistema</p><p><a href="' + url + 'confirmarUsuario/' + direccion + '/' + key + '">Pulsa aquí para confirmar cuenta</a></p>'
  });
}
