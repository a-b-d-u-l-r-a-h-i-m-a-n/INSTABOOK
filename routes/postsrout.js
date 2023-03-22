const express=require("express");
const router=express.Router();
const passport=require("passport");
const postcontroller=require("../controllers/post_controler");
router.post("/create",passport.checkAuthentication,postcontroller.create);
router.get('/delete/:id',passport.checkAuthentication,postcontroller.delete);


module.exports=router;