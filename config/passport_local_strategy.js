const passport=require("passport");
const Localstrategy=require('passport-local').Strategy;
const User = require("../modals/user");
passport.use(new Localstrategy({usernameField:'email',passReqToCallback:true},async function(req,email,password,done){
    try{
        const user4=await User.findOne({email:email});
        if(user4){
            if(user4.password!=password){
                console.log(req)
                req.flash("error","Invalid Username/Password");
                return done(null,false);
            }else{
                return done(null,user4);
            }
        }else{
            req.flash("error","Invalid Username/Password");
            return done(null,false);
        }
    }catch(err){
        req.flash("error",err);
        return done(err);
    }
}));
passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    try{
        const user=User.findById(id);
        if(user){
            return done(null,user);
        }
    }catch(err){
        console.log("error found at decentralization");
    }
});
passport.checkAuthentication=function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/users/signin');
    }
}
passport.setAuthenticatedUser=async function (req,res,next){
    // req.user contains the current signin user details from the seesion cookie and we are just sending this to the locals for the views
    if(req.isAuthenticated()){
        const user=await User.findById(req.user._conditions._id);
        
        req.locals=user;
        // console.log(res)
        // console.log(res.locals);
    }
    next();
}
module.exports=passport;