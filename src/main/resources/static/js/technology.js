// $(function () {
//     //选择框下拉时间
//    $("#chioce").change(function () {
//        $("#mythead").html("");
//        var select =  $("#chioce").val();
//        if(select==1){
//            //模板1
//            var tr = "<tr><td>加热段1</td><td onclick='changeCellValue(\"t1\",this)'>t1</td><td rowspan='2' onclick='changeCellValue(\"T1\",this)'>T1</td></tr>" +
//            "<tr><td>保温段1</td><td onclick='changeCellValue(\"t2\",this)'>t2</td></tr>" +
//                "<tr><td>加热段2</td><td onclick='changeCellValue(\"t3\",this)'>t3</td><td rowspan='2' onclick='changeCellValue(\"T2\",this)'>T2</td></tr>" +
//                "<tr><td>保温段2</td><td onclick='changeCellValue(\"t4\",this)'>t4</td></tr>" +
//                "<tr><td>降温段</td><td onclick='changeCellValue(\"t7\",this)'>t5</td><td rowspan='2' onclick='changeCellValue(\"T0\",this)'>T0</td></tr>"
//            $("#mythead").append(tr);
//            // $("#templtImage").attr("src","d:\1.png");
//        }else if(select==2){
//            //模板2
//            var tr = "<tr><td>加热段1</td><td onclick='changeCellValue(\"t1\",this)'>t1</td><td rowspan='2' onclick='changeCellValue(\"T1\",this)'>T1</td></tr>" +
//                "<tr><td>保温段1</td><td onclick='changeCellValue(\"t2\",this)'>t2</td></tr>" +
//                "<tr><td>加热段2</td><td onclick='changeCellValue(\"t3\",this)'>t3</td><td rowspan='2' onclick='changeCellValue(\"T2\",this)'>T2</td></tr>" +
//                "<tr><td>保温段2</td><td onclick='changeCellValue(\"t4\",this)'>t4</td></tr>" +
//                "<tr><td>加热段3</td><td onclick='changeCellValue(\"t5\",this)'>t5</td><td rowspan='2' onclick='changeCellValue(\"T3\",this)'>T3</td></tr>" +
//                "<tr><td>保温段3</td><td onclick='changeCellValue(\"t6\",this)'>t6</td></tr>" +
//                "<tr><td>降温段</td><td onclick='changeCellValue(\"t7\",this)'>t7</td><td onclick='changeCellValue(\"T0\",this)'>T0</td></tr>"
//            $("#mythead").append(tr);
//            // $("#templtImage").attr("src","d:\2.png");
//        }
//    });
//
//     $("#myForm").Validform({
//         btnSubmit:"#sub",
//         tiptype:1,
//         ignoreHidden:false,
//         dragonfly:false,
//         tipSweep:true,
//         showAllError:false,
//         postonce:true,
//         ajaxPost:true,
//         beforeSubmit:function(curform){
//             var num = $("#chioce").val();
//             if(num==0){
//                 return false;
//             }
//
//         },
//         callback:function(data){
//             debugger
//             if (data.result == true){
//                 layer.closeAll();
//                 $("#myIframe", parent.document).attr("src",data.data);
//                 window.parent.changeTileBackgroudColor("计算结果显示");
//             }
//             //返回数据data是json对象，{"info":"demo info","status":"y"}
//             //info: 输出提示信息;
//             //status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
//             //你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
//             //ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；
//
//             //这里执行回调操作;
//             //注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。
//         }
//     });
// });


$(function () {
    $("#chioce").change(function () {
        $("#mythead").html("");
        var select = $("#chioce").val();
        if (select == 1) {
            //模板1
            var tr = "<tr><td>加热段1</td><td><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据'  placeholder='    t1' id='t1' name='t1' type='text' value=''></td><td rowspan='2' ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    T1' id='T1' name='T1' type='text' value=''></td></tr>" +
                "<tr><td>保温段1</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t2' id='t2' name='t2' type='text' value=''></td></tr>" +
                "<tr><td>加热段2</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据'  placeholder='    t3' id='t3' name='t3' type='text' value=''></td><td rowspan='2' ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    T2' id='T2' name='T2' type='text' value=''></td></tr>" +
                "<tr><td>保温段2</td><td><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t4' id='t4' name='t4' type='text' value=''></td></tr>" +
                "<tr><td>降温段</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t5' id='t7' name='t7' type='text' value=''></td><td rowspan='2' ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    T0' id='T0' name='T0' type='text' value=''></td></tr>"
            $("#mythead").append(tr);
            $("#templtImage").attr("src", "/static/images/technology1.png").attr("width", "100%");
        } else if (select == 2) {
            //模板2
            var tr = "<tr><td>加热段1</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t1' id='t1' name='t1' type='text' value=''></td><td rowspan='2' ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    T1' id='T1' name='T1' type='text' value=''></td></tr>" +
                "<tr><td>保温段1</td><td><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t2' id='t2' name='t2'type='text' value=''></td></tr>" +
                "<tr><td>加热段2</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t3' id='t3' name='t3' type='text' value=''></td><td rowspan='2'><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    T2' id='T2' name='T2' type='text' value=''></td></tr>" +
                "<tr><td>保温段2</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t4' id='t4' name='t4' type='text' value=''></td></tr>" +
                "<tr><td>加热段3</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t5' id='t5' name='t5' type='text' value=''></td><td rowspan='2' ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    T3' id='T3' name='T3' type='text' value=''></td></tr>" +
                 "<tr><td>保温段3</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t6' id='t6' name='t6' type='text' value=''></td></tr>" +
                "<tr><td>降温段</td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    t7' id='t7' name='t7' type='text' value=''></td><td ><input datatype='/^\\d+(\\.\\d+)?$/' errormsg='请输入正确的数据' placeholder='    T0' type='text' id='T0' name='T0' value=''></td></tr>"
            $("#mythead").append(tr);
            $("#templtImage").attr("src", "/static/images/technology2.png").attr("width", "100%");
        }
    });

    $("#myForm").Validform({
        btnSubmit: "#sub",
        // tiptype: 1,
        tiptype:function(msg,o,cssctl){
            if (o.type == 3) {
                layer.msg("请输入正确的数据",{icon:2})
            }
        },
        ignoreHidden: true,
        dragonfly: false,
        tipSweep: true,
        showAllError: false,
        postonce: true,
        ajaxPost: true,
        beforeSubmit: function (curform) {
            var num = $("#chioce").val();
            if (num == 0) {
                return false;
            }

        },
        callback: function (data) {
            var t1 = $("#t1").val();
            var t2 = $("#t2").val();
            var t3 = $("#t3").val();
            var t4 = $("#t4").val();
            var t5 = $("#t5").val();
            var t6 = $("#t6").val();
            var t7 = $("#t7").val();
            var T1 = $("#T1").val();
            var T2 = $("#T2").val();
            var T3 = $("#T3").val();
            var T0 = $("#T0").val();
            // 铺层个数
            var chioce = $("#chioce").val();
            //预计时间
            var settingsNum = $("#settingsNum").val();
            debugger
            var time = (settingsNum * 20);
            var setting = (settingsNum * 2000);
            var prompt = '该模型共有' + settingsNum + '个分区,' + setting + '个网格,大约需要' + time + '分钟';
            layer.confirm('该模型共有' + settingsNum + '个分区,' + setting + '个网格,大约需要' + time + '分钟,确定开始计算吗？', {
                icon: 7,
                btn: ['确定', '取消'] //按钮
            }, function () {
                layer.closeAll();

                $.ajax({
                    type: 'post',
                    data: {
                        "t1": t1,
                        "t2": t2,
                        "t3": t3,
                        "t4": t4,
                        "t5": t5,
                        "t6": t6,
                        "t7": t7,
                        "T1": T1,
                        "T2": T2,
                        "T3": T3,
                        "T0": T0,
                        "chioce": chioce,
                        "prompt": prompt,
                        "time": time
                    },
                    url: "/technology/technologyParameter",
                    dataType: "json",
                    success: function (datas) {
                        //成功后再跳转
                        if (datas.result == true) {
                            $.post("/technology/resultCount", "", function (data) {
                                $("#myIframe", parent.document).attr("src", data);
                                window.parent.changeTileBackgroudColor("正在计算中");
                            });
                        } else {
                            layer.alert(datas.data, {title: "错误", anim: 6, icon: 2});
                        }
                    }
                });

            }, function () {
                layer.closeAll();
            });

            if (data.result == true) {
                layer.closeAll();
                $("#myIframe", parent.document).attr("src", data.data);
                window.parent.changeTileBackgroudColor("正在计算中");
            }
            //返回数据data是json对象，{"info":"demo info","status":"y"}
            //info: 输出提示信息;
            //status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
            //你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
            //ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；

            //这里执行回调操作;
            //注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。
        }
    });

});


// var technologyImgNum ;
// function subParameter() {
//     // debugger
//     var t1 = $("#t1").val();
//     var t2 = $("#t2").val();
//     var t3 = $("#t3").val();
//     var t4 = $("#t4").val();
//     var t5 = $("#t5").val();
//     var t6 = $("#t6").val();
//     var t7 = $("#t7").val();
//     var T1 = $("#T1").val();
//     var T2 = $("#T2").val();
//     var T3 = $("#T3").val();
//     var T0 = $("#T0").val();
//
//     //铺层个数
//     var  chioce = $("#chioce").val();
//     //预计时间
//     var settingsNum = $("#settingsNum").val();
//     var time = (settingsNum*20);
//     var setting = (settingsNum*2000);
//     var prompt = '该模型共有'+settingsNum+'个分区,'+setting+'个网格,大约需要'+time+'分钟';
//     layer.confirm('该模型共有'+settingsNum+'个分区,'+setting+'个网格,大约需要'+time+'分钟,确定开始计算吗？' ,{ icon: 7,
//         btn: ['确定', '取消'] //按钮
//     }, function () {
//         layer.closeAll();
//
//         $.ajax({
//             type: 'post',
//             data:{
//                 "t1":t1,"t2":t2,"t3":t3,"t4":t4,"t5":t5,"t6":t6,"t7":t7,"T1":T1,"T2":T2,"T3":T3,"T0":T0,"chioce":chioce,
//                 "prompt":prompt,"time":time
//             },
//             url: "/technology/technologyParameter",
//             dataType: "json",
//             success: function (datas) {
//                 //成功后再跳转
//                 if (datas.result == true) {
//                     $.post("/technology/resultCount", "", function (data) {
//                         $("#myIframe", parent.document).attr("src", data);
//                         window.parent.changeTileBackgroudColor("正在计算中");
//                     });
//                 }else {
//                     layer.alert(datas.data, {title: "错误", anim: 6, icon: 2});
//                 }
//             }
//         });
//
//     }, function () {
//         layer.closeAll();
//     });
// }


function changeCellValue(val, obj) {
    $(obj).html("");
    var input = "<input  type=\"text\" name='" + val + "'/ datatype='n | /^[0-9]+(.[0-9]{2})?$/' errormsg='请输入正确的数据'>";
    $(obj).append(input);
    $(obj).removeAttr("onclick");
}

