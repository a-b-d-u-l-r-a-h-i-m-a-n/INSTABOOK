const bodyparser=require('body-parser');
const express=require('express');
const path=require('path');
const app=express();
const port=8000;
const express_session=require('express-session');
const localstrategy=require('./config/passport_local_strategy');
const passport=require('passport');
const db=require('./config/mongoose');
const user=require('./modals/user');
const posts=require("./controllers/post_controler");
const cookieParser=require("cookie-parser");
const expressEjsLayouts = require('express-ejs-layouts');
const MongoStore =require('connect-mongo');
const flash=require("connect-flash");
const customeware=require("./config/myownmw");



app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('./assets'));
app.use(bodyparser.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.set('view engine','ejs');
app.set('views','./views');
app.use(expressEjsLayouts);
app.set('layout extraStyles',true);
app.set('layout extraScripts',true);
app.use(express_session({
    name:'socialmedia_app',
    secret:"ghdhgdghjcgj",
    saveUnintialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: "mongodb://127.0.0.1:27017/test"
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customeware.setFlash);
app.use('/',require('./routes'));










app.listen(port,function(err){
    if(err){
        console.log(`there was an error while running the programme${err}`);
        return;
    }
    console.log(`the server runsuccesully at port ${port}`);
})