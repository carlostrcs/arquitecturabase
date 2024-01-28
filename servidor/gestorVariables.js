const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function accessCLAVECORREO() {
    const name = 'projects/438500343404/secrets/CLAVECORREO/versions/1';
    const [version] = await client.accessSecretVersion({
    name: name,
    });
    const datos=version.payload.data.toString("utf8");
    return datos;
}

async function accessEMAIL (callback) {
    const name = "projects/438500343404/secrets/EMAIL/versions/1";
    const [version] = await client.accessSecretVersion({
      name: name,
    });
    const datos = version.payload.data.toString("utf8");
    console.log(datos);
    return datos;
};

module.exports.obtenerOptionsEmail= async function(callback){
    let options={user:"",pass:""};
    let user = await accessEMAIL();
    let pass = await accessCLAVECORREO();
    options.user = user;
    options.pass = pass;
    callback(options);
}