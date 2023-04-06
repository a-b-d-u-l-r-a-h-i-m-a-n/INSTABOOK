let createpost=function(){
    try{
        
console.log("hello");
        let newpost=$("#newpost_form");
        newpost.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:"POST",
                url:"/posts/create",
                data:newpost.serialize(),
                success:function(data){     
                    let newpppp= newDompost(data.data.post);
                    $("#listofpost_container").prepend(newpppp);
                    deletpost($(" .deletepost_1S",newpppp));
                }   
            });
        });
    }catch(err){
        console.log(err);
    }
}

let newDompost=function(post){
    return (`<li id="postlist_1${post._id}">
    <p>
        <a class="deletepost_1S"  href="/posts/delete/${post._id}">X</a>
        ${post.content}</p>
        <p>${post.user.name}</p>
        <form action="/comment/create" method="post">
            <input type="text" name="comment" placeholder="comment" required>
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" name="submit">
        </form>
    <div>
        <ul>
        </ul>
    </div>
</li> `)
}

let deletpost=function(deleteLink){
   try{
    console.log("hjfhkjshfvkjlhfkljvhaerkjlfhlkaerjckrkverkvh,rnhv,ndf;v,df;kvh;d,fhv;,df;hdf;bhdaf;k");
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:"get",
            url:$(deleteLink).prop("href"),
            success:function(data){
               $(`#postlist_1-${data.data.post_id}`).remove();
            }
        })
    })
   }catch(err){
     console.log(err);
   }
}
createpost();
