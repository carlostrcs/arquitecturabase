const nodemailer = require('nodemailer');
const url = "http://localhost:3000/"; // Cambia esta URL a la de tu despliegue
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: 'alguienanonimo2000@gmail.com',
    pass: 'fzwg uoms hwxt uapk'
  },
  tls:{rejectUnauthorized:false}
});

module.exports.enviarEmail = async function(direccion, key, men) {
  console.log("Direccion de corrreo: " + direccion)
  const result = await transporter.sendMail({
    from: 'alguienanonimo2000@gmail.com',
    to: direccion,
    subject: men,
    text: 'Pulsa aquí para confirmar cuenta',
    html: '<p>Bienvenido a Sistema</p><p><a href="' + url + 'confirmarUsuario/' + direccion + '/' + key + '">Pulsa aquí para confirmar cuenta</a></p>'
  });
}
