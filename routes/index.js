const { urlencoded } = require('body-parser');
const express=require('express');
const passport=require('passport');
const router=express.Router();
const homecontroller=require("../controllers/home_controller");
router.get('/',homecontroller.home);
router.use('/users',require('./users'));
router.use('/not',require('./notifi'));
router.use('/posts',require('./postsrout'));
router.use('/comment',require("./commentsroute"));
module.exports=router;
