const passport = require("passport");
const User = require("../modals/user");
const Post=require('../modals/postSh');
const comments=require("../modals/commnetsmodal");

module.exports.home=async function(req,res){
    try{
        // console.log(req.locals);
        const posts=await Post.find({}).populate('user').populate({
            path:'commentforpost',
            populate:{
                path:'user'
            }
        });
            // posts.populated('user');
            // console.log(posts);
            if(req.user){
                const friends=await User.find({});
                const users=await User.findById(req.user._conditions._id);
                // console.log(friends);
            return res.render('home',{
                title:"home",
                posts:posts,
                user:users,
                friends:friends
            });}else{
                return res.render('home',{
                    title:"home",
                    posts:posts,
                    user:null,
                    friends:null
                });
            };
      }catch(err){
        console.log("errror",err);
        res.status(500).send("Internal Server Error");
      }
    
}
