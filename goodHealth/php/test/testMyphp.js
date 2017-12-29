/**
 * Created by GraceHan on 16/10/12.
 */

/**本页适用于带参跳转*/
$(function(){
    $("#userlist a").bind("click",function(){
        var hol = $(this).attr("rel");
        var data = "action=getlink&id="+hol;

        $.getJSON("server.php",data, function(json){
            $("#name").html(json.name);
            $("#sex").html(json.sex);
            $("#tel").html(json.tel);
            $("#email").html(json.email);
        });
    });
});