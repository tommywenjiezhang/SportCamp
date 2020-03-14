$(document).ready(function(){
    $(".content").mouseover(()=> {
        $(".sidebar").show("slow")
    })
    $(".content").mouseout(()=> {
        $(".sidebar").hide("slow")
    })

    $(".delete_comment").click(function(){
        $("#deleteModal").show()
        const url = $(this).attr("href");
        console.log(url)
        }
    )

    $(".view_replies").each(function(){
        $(this).click(function(){
            let item =  $(this).next();
            console.log(item)
               if (item[0].style.display === "block") {
                   item[0].style.display = "none";
                   item[0].overflow = "scroll";
                 } else {
                   item[0].style.display = "block";
                 }
           })
    })

        $(".delete_replies_model").click(function(){
            $("#deleteRepliesModal").show()
        })
})