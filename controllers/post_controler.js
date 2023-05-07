const Post=require('../modals/postSh');
const Comments=require('../modals/commnetsmodal');
module.exports.create=async function(req,res){
    // console.log(req)
    try{
        if(req.user){
            let poat=await Post.create({
                content:req.body.post,
                user:req.user._conditions._id,
            });
            poat=await Post.findById(poat._id).populate('user');
            if(req.xhr){
                req.flash("success","post added successfully");
                return res.status(200).json({
                    data:{
                        post:poat,
                    },
                    message:"post created"
                });
            }
            return res.redirect('back');
        }
    }catch(err){
        console.log("error",err);
    }
};
module.exports.delete=async function(req,res){
    try{
        // console.log(req.params.id);
        const post=await Post.findById(req.params.id);
        // console.log(post);
        if(post.user._id==req.user._conditions._id){
            // console.log(post.user._id,req.user._conditions._id);
            await Post.findByIdAndDelete(req.params.id);
            await Comments.deleteMany({post:req.params.id});
            if(req.xhr){
                console.log("here is the xhr");
                req.flash("success","Post ans associated comments deleted");
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted"
                });
            };
            req.flash("success","Post ans associated comments deleted");
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash("error",err);
        return res.send("post delete error");
    }
}