const express=require('express');  
const passport = require('passport');
const User=require('../modals/user');
module.exports.profile = async function(req, res){
  try{
    const user=await User.findById(req.params.id);
    console.log(user);
        return res.render('profile_page', {
            title: 'User Profile',
            profile_user: user,
            user:await User.findById(req.user._conditions._id)
    });
  }catch(err){
    console.log("errror",err);
    res.status(500).send("Internal Server Error");
  }
}; 
module.exports.update=async function(req,res){
    try{
        if(req.user._conditions._id==req.params.id){
            await User.updateOne({_id:req.params.id}, { name: req.body.name,email:req.body.email});
            // User.save();
            return res.redirect("back");
        }else{
            return res.redirect("back");
        }
    }catch(err){
        console.log(err);
        return res.send("error while updating");
    }
}
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"sign in page",
        user:null,
    });
};
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('./users/profile');
    }
    return res.render('user_sign_up',{
        title:"sign up page",
        user:0
    });
};
// render the sign up page
module.exports.create_account =async function(req,res){
    if(req.body.password!=req.body.confirmpassword){
        return res.rendirect('back');
    }
    const user1=User.findOne({email: req.body.email});
    if(user1){
        try{
            const newUser=await User.create(req.body);
            // console.log("dhkfgvirefgh");
            return res.redirect('/users/signin');
        }catch(err){
        return res.redirect('back');
        }
    }
};
module.exports.signin_pagehere=async function(req,res){
        return res.redirect('/');
};
module.exports.signout= async function(req,res){
     await req.logout(function(err){
      if(err){
        console.log(err+" error while log out");
        return;
      }
      return res.redirect('/');
     });
};
