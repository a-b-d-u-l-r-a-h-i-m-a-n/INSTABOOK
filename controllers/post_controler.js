const Post=require('../modals/postSh');
const Comments=require('../modals/commnetsmodal');
module.exports.create=async function(req,res){
    // console.log(req)
    try{
        if(req.user){
            await Post.create({
                content:req.body.post,
                user:req.user._conditions._id,
            }).then(function(post){
                // console.log("hello world");
                return res.redirect('back');
            });
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
            console.log(post.user._id,req.user._conditions._id);
            await Post.findByIdAndDelete(req.params.id);
            await Comments.deleteMany({post:req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.send("post delete error");
    }
}