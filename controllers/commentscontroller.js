const passport=require("passport");
const user=require("../modals/user");
const Post=require("../modals/postSh");
const Commentsmain1=require("../modals/commnetsmodal");

module.exports.createcomment=async function(req,res){
    try{
        // console.log(req.body.comment);
        const post= await Post.findById(req.body.post);
        if(post){
            await Commentsmain1.create({
                content:req.body.comment,
                user:req.user._conditions._id,
                post:post
            }).then(function(comment){
                post.commentforpost.push(comment);
                post.save();
                return res.redirect('back');
            });
        }
    }catch(err){
        return res.send("internal error at comments");
    }
};
module.exports.delete=async function(req,res){
    try{
        var id = req.params.id;       
        const cmont=await Commentsmain1.findById(id);
        // console.log(cmont.user==req.user._conditions._id);
        if(cmont.user==req.user._conditions._id){
            // console.log("abdul");
            const pid=cmont.post;
            await Commentsmain1.findByIdAndDelete(id);
            await Post.findByIdAndUpdate(pid,{$pull: {commentforpost:{ _id: id }} });
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.redirect("back");
    }
};