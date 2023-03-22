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
const { session } = require('passport');
const expressEjsLayouts = require('express-ejs-layouts');
const MongoStore =require('connect-mongo');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('./assets'));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(expressEjsLayouts)
// app.use(express.urlencoded({extended: true}));
// app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extraStyles',true);
app.set('layout extraScripts',true);
//mpngo store 
// const options = {
//     mongoUrl: 'mongodb://127.0.0.1:27017/test', // replace with your MongoDB connection string
//     collectionName: 'express_session'
//   };
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
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));
// const post_controller=require("./controllers/post");
// app.get('/post',post_controller.post);
// const ueser_controler=require('./controllers/ueser_control');











app.listen(port,function(err){
    if(err){
        console.log(`there was an error while running the programme${err}`);
        return;
    }
    console.log(`the server runsuccesully at port ${port}`);
})