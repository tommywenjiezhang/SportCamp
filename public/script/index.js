$( document ).ready(function() {
    $('.post-desc').hide();
    $('.post-image').mouseover(function() {
        $(this).children(":first").show("slow");
    })
    $('.post-image').mouseout(function() {
        $(this).children(":first").hide("slow");
    })


    $(".row.text-center").find('.card-img-top').each(function(){
        let parentheight = $(this).parent().height;
        let  imgHeight = $(this).height;
        $(this).prev().attr("height", function (height){return imgHeight/ parentheight})
        $(this).prev().attr("bottom", function(height) {return 1-imgHeight/ parentheight})
    })


    $('.like_button').each(function(){
        $(this).click(()=>{
        let url = $(this).attr("data")
        $(this).parent().submit();
    })
    })

});