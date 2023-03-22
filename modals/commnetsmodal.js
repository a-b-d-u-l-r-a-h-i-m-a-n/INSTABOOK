const mongoose=require("mongoose");
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
});
const commentsmain=mongoose.model("comment",commentSchema)
module.exports=commentsmain;