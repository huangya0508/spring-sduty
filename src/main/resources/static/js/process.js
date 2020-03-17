$(".hirsi-nav").find("li a").on("click", function () {
    $(".hirsi-nav li").each(function () {
        $(this).removeClass("hirsi-this")
    });
    $(".content-main .hirsi-tab").each(function () {
        $(this).attr("hidden", true);
    });
    $(".content-main ." + $(this).attr("hirsi-data")).removeAttr("hidden");
    $(this).parent().addClass("hirsi-this");
});

/*子窗口操作父窗口*/
function next(tab) {
    $("a[hirsi-data='"+tab+"']").click();
}

//根据title名称更新背景
function changeTileBackgroudColor(title) {
    $(".title").each(function (t) {
        if($(this).hasClass("hirsi-this")){
            $(this).removeClass("hirsi-this");
        }
        if($(this).html()==title){
            $(this).addClass("hirsi-this");
        }
    });

}

$(function () {
    //点击材料数据维护
    $("#checkMatril").click(function () {
        removeBackgroud();
        //给当前点击图标加背景
        $(this).addClass("hirsi-this");
        //请求修改iframe页面属性
        $("#myIframe").attr("src","/matedata");
    });

    $("#title_1").click(function () {
        removeBackgroud();
        $(this).addClass("hirsi-this");
        // $("#myIframe").attr("src","/setting");
        $("#myIframe").attr("src","/grid");
    });
});
//移除所有背景
function removeBackgroud() {
    $(".title").each(function (t) {
        if($(this).hasClass("hirsi-this")){
            $(this).removeClass("hirsi-this");
        }
    });
}