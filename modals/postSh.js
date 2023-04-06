const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    content:{
        type: String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    } , 
    commentforpost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }],},{
    timestamps:true
});
const post=mongoose.model("post",postSchema);
module.exports=post;
