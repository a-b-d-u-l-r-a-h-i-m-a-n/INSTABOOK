const passport=require("passport");
const Commentsmain1=require("../modals/commnetsmodal");
const user=require("../modals/user");
const Post=require("../modals/postSh");


module.exports.createcomment=async function(req,res){
    try{
        const post= await Post.findById(req.body.post);
        if(post){
            await Commentsmain1.create({
                content:req.body.comment,
                user:req.user._conditions._id,
                post:post
            }).then(function(comment){
                post.commentforpost.push(comment);
                post.save();
                req.flash("success","Comment added");
                return res.redirect('back');
            });
        }
    }catch(err){
        req.flash("error",err)
        return res.send("internal error at comments");
    }
};
module.exports.delete=async function(req,res){
    try{
        var id = req.params.id;       
        const cmont=await Commentsmain1.findById(id);
        const pid=cmont.post.toString();
        const cmt=await Post.findById(pid).populate('user')
        // console.log(cmont.user==req.user._conditions._id);
        if(cmont.user==req.user._conditions._id || req.user._conditions._id==cmt.user._id){
            // console.log(cmont);
            // console.log(pid);
            await Commentsmain1.findByIdAndDelete(id);
            await Post.findByIdAndUpdate(pid,{$pull: {commentforpost:id }});
            req.flash("success","Comment deleted")
            return res.redirect('back');
        }else{
            req.flash("error","you canot delete this comment");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        req.flash("error",err);
        return res.redirect("back");
    }
};