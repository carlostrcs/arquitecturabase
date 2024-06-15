const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleOneTapStrategy = require("passport-google-one-tap").GoogleOneTapStrategy;

passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(user, done) {
 done(null, user);
});

passport.use(new GoogleStrategy({
 clientID: "438500343404-1h3aa2up8pv81602kgbm9qo9ld34ri0f.apps.googleusercontent.com",
 clientSecret: "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",
 //CAMBIAR DIRECCIÓN DEPENDIENDO DE SI ESTÁ CORRIENDO LOCALHOST O GOOGLE CLOUD
 //callbackURL: "https://arquitecturabase-f3atvethyq-no.a.run.app/google/callback" 
 callbackURL: "http://localhost:3000/google/callback"
 },
 function(accessToken, refreshToken, profile, done) {
 return done(null, profile);
 }
));

passport.use(
    new GoogleOneTapStrategy(
    {
    //client_id:"xxxxxxx.apps.googleusercontent.com", //local
    client_id:"438500343404-g4k6n1a2ee6q9k8qsst998ptbkthrk51.apps.googleusercontent.com", //prod-oneTap
    //clientSecret: "xxxx", //local
    clientSecret:"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", // prod-oneTap
    verifyCsrfToken: false, // whether to validate the csrf token or not
    },
    function (profile, done) {
    return done(null, profile);
    }
    )
    );
    
