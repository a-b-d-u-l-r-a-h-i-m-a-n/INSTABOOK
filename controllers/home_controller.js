const passport = require("passport");
const User = require("../modals/user");
const Post=require('../modals/postSh');
const comments=require("../modals/commnetsmodal");

module.exports.home=async function(req,res){
    try{
        const posts=await Post.find({}).populate('user').populate({
            path:'commentforpost',
            populate:{
                path:'user'
            }
        });
            // posts.populated('user');
            // console.log(posts);
            if(req.user){
                const users=await User.findById(req.user._conditions._id);
            return res.render('home',{
                title:"home",
                posts:posts,
                user:users
            });}else{
                return res.render('home',{
                    title:"home",
                    posts:posts,
                    user:null
                });
            };
      }catch(err){
        console.log("errror",err);
        res.status(500).send("Internal Server Error");
      }
    
}
