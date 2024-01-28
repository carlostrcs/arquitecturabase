    // https://arquitecturabase-f3atvethyq-ew.a.run.app/
    const fs=require("fs");
    const express = require('express');
    const app = express();
    const passport=require("passport");
    const cookieSession=require("cookie-session");
    const LocalStrategy = require('passport-local').Strategy;
    require("./servidor/passport-setup.js");
    const bcrypt = require("bcrypt");
    const modelo = require("./servidor/modelo.js");
    const haIniciado=function(request,response,next){
        if (request.user){
        next();
        }
        else{
        response.redirect("/")
        }
    };

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

    passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
        function (email, password, done) {
            sistema.loginUsuario({ "email": email, "password": password }, function (user) {
                return done(null, user);
            });
        }
    ));

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

    app.get("/obtenerUsuarios",haIniciado,function(request,response){
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

    app.get("/eliminarUsuario/:email",haIniciado,function(request,response){
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

    // app.post("/loginUsuario",function(request,response){
    //     sistema.loginUsuario(request.body,function(res){
    //         response.send({"email":res.email});
    //     });
    // });

    app.post('/loginUsuario',passport.authenticate("local",{failureRedirect:"/fallo",successRedirect: "/ok"}));

    app.get("/ok",function(request,response){
        response.send({email:request.user.email})
    });

    app.get("/confirmarUsuario/:email/:key",function(request,response){
        let email=request.params.email;
        let key=request.params.key;
        sistema.confirmarUsuario({"email":email,"key":key},function(usr){
            if (usr.email!=-1){
                response.cookie('email',usr.email);
            }
            response.redirect('/');
        });
    });

    app.get("/eliminarCuenta/:email",haIniciado,function(request,response){
        let email=request.params.email;
        console.log(request.user);
        // request.logout();
        // response.redirect("/");
        if (email){
            sistema.eliminarCuenta(email,function(res){
                response.send(res);
            });
        }
    });
        

    
        
        