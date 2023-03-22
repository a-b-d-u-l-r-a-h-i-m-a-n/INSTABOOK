const express=require("express");
const passport=require("passport");
const router=express.Router();
const cmcontroller=require("../controllers/commentscontroller");
router.post('/create',passport.checkAuthentication,cmcontroller.createcomment);
router.get('/delete/:id',passport.checkAuthentication,cmcontroller.delete);
module.exports=router;