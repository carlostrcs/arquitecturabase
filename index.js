    // https://arquitecturabase-f3atvethyq-ew.a.run.app/
    const fs=require("fs");
    const express = require('express');
    const app = express();
    const passport=require("passport");
    const cookieSession=require("cookie-session");
    require("./servidor/passport-setup.js");
    const modelo = require("./servidor/modelo.js");
    const PORT = process.env.PORT || 3000;
    const bodyParser=require("body-parser");
    app.use(express.static(__dirname + "/"));

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    
    app.use(cookieSession({
        name: 'Sistema',
        keys: ['key1', 'key2']
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
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

    app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));

    app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/fallo' }),
    function(req, res) {
        res.redirect('/good');
    });

    app.get("/good", function(request,response){

        let email=request.user.emails[0].value;
        console.log({email});
        sistema.usuarioGoogle({"email":email},function(obj){
            
            response.cookie('email',obj.email);
            response.redirect('/');
        });
    });
        
    // app.get("/good", function(request,response){
    //     let email=request.user.emails[0].value;
    //     if (email){
    //     sistema.agregarUsuario(email);
    //     }
    //     //console.log(request.user.emails[0].value);
    //     response.cookie('email',email);
    //     response.redirect('/');
    //    });

    app.get("/fallo",function(request,response){
        response.send({email:"nook"})
    });
    
    app.post('/oneTap/callback',
    passport.authenticate('google-one-tap', { failureRedirect: '/fallo' }),
    function(req, res) {
        console.log("callback")
        // Successful authentication, redirect home.
        res.redirect('/good');
    });

    app.post("/registrarUsuario",function(request,response){
        sistema.registrarUsuario(request.body,function(res){
            response.send({"email":res.email});
        });
    });
        