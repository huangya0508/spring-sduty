layui.use(['element', 'layer'], function () {
    var element = layui.element
        ,$ = layui.jquery
        ,layer = layui.layer;

    /**
     * 顶部导航菜单事件绑定
     */
    $('.layui-nav li dl dd a').on('click', function (data) {
        //页面显示
        if ($(this).attr('data-href') != null && $(this).attr('data-href') != '' && $(this).attr('data-href') != undefined) {
            document.getElementById('iframe').contentWindow.location.replace($(this).attr('data-href'));
        }
        //打开系统管理模块
        if ($(this).attr('id') == 'sys'){
            //边缘弹出
            layer.open({
                type: 2
                ,title: '基本系统配置'
                ,offset: 'rb'
                ,area: ['300px', $('.content').height() + 'px']
                ,closeBtn: 0
                ,resize: false
                ,move:false
                ,shadeClose: true
                ,content: '/sys'
                ,anim: 2
                ,shade: 0.3
            });
        }
    });
});

//上传几何模型加载条
function gridLayer(){
        layer.load(0, {shade: [0.1, '#393D49']});
}

function parentCloseAll() {
    layer.closeAll();
}

function resultLayer(){
    // layer.load(0, {shade: [0.5, '#393D49']});
    //layer.load(1, {shade: [0.5, '#393D49'],content: '正在计算中,请勿关闭此页面...'});
    // layer.load(1, {
    //     time: 0,
    //     shade: [0.1, '#393D49'], //0.1透明度的白色背景
    //     content: '正在计算中,请勿关闭此页面...',
    //     success: function (layero) {
    //         // $("#layui-layer100001").css({
    //         //     'position':'absolute !important',
    //         //     'top':'50% !important',
    //         //     'left':'40% !important'
    //         // });
    //         layero.find('.layui-layer-content').css({
    //             'paddingTop': '40px',
    //             'width': '400px',
    //             'textAlign': 'center',
    //             'backgroundPositionX': 'center',
    //             'font-size':'30px',
    //             'margin':'auto',
    //             'color':'red'
    //         });
    //
    //     }
    //
    //
    // });


    // layer.msg("正在计算中,请勿关闭此页面...", {
    //     icon: 17, //代表加载的图标
    //     time: 0,  //0秒关闭（如果不配置，默认是3秒）
    //     shade: 0.01  ,
    //     success: function (layero) {
    //         layero.find('.layui-layer-content').css({
    //             'paddingTop': '20px',
    //             'width': '400px',
    //             'textAlign': 'center',
    //             'backgroundPositionX': 'center',
    //             'font-size':'30px',
    //             'margin':'auto',
    //             'color':'red'
    //         });
    //
    //     }});

}




//打开添加模态框
function removeHidden() {
    document.getElementById("hiddenId").removeAttribute("hidden");
}

function setHidden() {
    document.getElementById("hiddenId").setAttribute("hidden","hidden");
}

