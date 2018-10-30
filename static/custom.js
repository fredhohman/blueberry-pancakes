$(document).ready(function(){
    $('.treeNode').hide()

    $(".superRootNode").find("li").each(function(){
        $(this).css("list-style","none");
    });

    $(".superRootNode").find("li").each(function(){

        if($(this).next().children().length == 0){
            $(this).prepend("[-] ");
        }else{
            $(this).prepend("[+] ");
        }
    });

    $('.rootNode').click(function() {
        $(this).next().children("li").next().find("li").slideUp();
        $(this).next().children("li").slideToggle();
        $(this).siblings("li").next().find("li").slideUp();
    });

    $('.treeNode').click(function() {
        $(this).next().children("li").next().find("li").slideUp();
        $(this).next().children("li").slideToggle();
        $(this).siblings("li").next().find("li").slideUp();
    });
})