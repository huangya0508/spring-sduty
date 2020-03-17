
//存储添加铺层的每一行
var addData;

//存储添加铺层全部行
var dataArr = [];
/*点击添加一层，初始化材料信息*/
$("#add").click(function () {
    $('#addTable').bootstrapTable({
        url: "/materialData/getMaterialList",//数据源
        dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
        search: false,//是否搜索
        pagination: false,//是否分页
        pageSize: 20,//单页记录数
        pageList: [5, 10, 20, 50],//分页步进值
        sidePagination: "server",//服务端分页
        contentType: "application/json",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
        dataType: "json",//期待返回数据类型
        method: "post",//请求方式
        searchAlign: "left",//查询框对齐方式
        queryParamsType: "limit",//查询参数组织方式
        searchOnEnterKey: false,//回车搜索
        showRefresh: false,//刷新按钮
        showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        //toolbar: "#toolbar",//指定工具栏
        toolbarAlign: "left",//工具栏对齐方式
        height: "auto",
        // width:,
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        columns: [
            {
                title: "牌号",
                field: "brand"
            },
            {
                field: 'density',
                title: '密度（kg/m³）'
            }, {
                field: 'heatCoefficient',
                title: '导热系数（W/m·K）'
            }, {
                field: 'heatCapacity',
                title: '恒压热容（J/kg·K）'
            }, {
                field: 'heatExpand',
                title: '热膨胀系数（1/K）'
            }, {
                field: 'youngMeasurement',
                title: '杨氏衡量（Pa）'
            }, {
                field: 'poissonRatio',
                title: '泊松比（常量）'
            }, {
                field: 'shearModulus',
                title: '剪切模量（N/㎡）'
            }
        ],
        //点击表格的行，获取数据（为json格式）
        onClickRow: function(row, $element) {
            //$element是当前tr的jquery对象
            $element.parent().find("tr").each(function () {
                $(this).removeClass("row-actity");
            });
            $element.addClass("row-actity");
            addData = creatData(row);
        },//单击row事件
        locale: "zh-CN", //中文支持
        detailView: false, //是否显示详情折叠
        detailFormatter: function(index, row, element) {
            var html = '';
            $.each(row, function(key, val){
                html += "<p>" + key + ":" + val +  "</p>"
            });
            return html;
        }
    });

});
//创建data
function creatData (row) {
    var o = new Object();
    o.brand = row.brand;
    o.density = row.density;
    o.heatCoefficient = row.heatCoefficient;
    o.heatCapacity = row.heatCapacity;
    o.heatExpand = row.heatExpand;
    o.youngMeasurement = row.youngMeasurement;
    o.poissonRatio = row.poissonRatio;
    o.shearModulus = row.shearModulus;
    o.angle = row.angle;
    return o ;
}


/*提交添加*/
function sub() {
    //铺层设置值
    var angle = $("#angle").find("option:selected").val();
    //这里做新增处理，新增的铺层数据为 addData
    addData.angle = angle;  //向addData中的object添加铺层设定
    dataArr.push(addData);
    setTable(dataArr);
    $('#addTable').bootstrapTable("refresh");
    $("#myModal").modal('hide');    //关闭模态框
    layer.msg("添加成功");
}

//渲染增加一层表格
function setTable(dataArr){
    $("#setTable").html("");

    var str = "<table id='setTable' class='table table-bordered'>";
    str +="<tr><th>层数</th><th>材料牌号</th><th>铺层设定</th><th>操作</th></tr>";
    for (var i = 0; i < dataArr.length; i++) {
        str += "<tr>";
        str += "<td>" + (i+1) + "</td>";
        str += "<td>" + dataArr[i].brand + "</td>";
        str += "<td>" + dataArr[i].angle + "</td>";
        str += "<td>" + [
            '<button type="button" class="btn btn-default btn-xs up" onclick="moveUp('+i+')"><i class="glyphicon glyphicon-upload"></i> 上移</button>\n' +
            '<button type="button" class="btn btn-default btn-xs down" onclick="moveDown('+i+')"><i class="glyphicon glyphicon-download"></i>下移</button>\n'+
            '<button type="button" class="btn btn-danger btn-xs del" onclick="delLine('+i+')"><i class="glyphicon glyphicon-trash"></i> 移除</button>',
        ].join('') + "</td>";

        str += "</tr>";
    }
    str += "</table>";
    $("#setTable").append(str);
}


//上移
function moveUp(index){
    if (index == 0) {
        layer.alert("首行数据不可上移", {title: "错误", anim: 6, icon: 2});
    }else {
        //交换元素
        var temp = dataArr[index];
        dataArr[index] = dataArr[index - 1];
        dataArr[index - 1] = temp;
        setTable(dataArr);
    }
}

//下移
function moveDown(index){
    if (index == dataArr.length - 1) {
        layer.alert("尾行数据不可下移", {title: "错误", anim: 6, icon: 2});
    }else {
        //交换元素
        var temp = dataArr[index];
        dataArr[index] = dataArr[index + 1];
        dataArr[index + 1] = temp;
        setTable(dataArr);
    }
}

//删除层数
function delLine(index){
    RemoveValByIndex(dataArr,index);
    console.log(dataArr)
    setTable(dataArr);
}

//根据索引删除元素
function RemoveValByIndex(arr, index) {
    arr.splice(index, 1);
}

//下一步跳转到网格
function nextGrid() {
    // $.post("/fileHandle/subSetting",{"material":JSON.stringify(dataArr)},function (data) {
    //     $("#myIframe", parent.document).attr("src",data);
    //
    // });
    if (dataArr.length == 0){
        return layer.alert("请先添加铺层", {title: "错误", anim: 6, icon: 2});
    }

    $.ajax({
        type: "post",
        url:"/fileHandle/subTechnology",
        data:JSON.stringify(dataArr),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
           if(r.result){
               $("#myIframe", parent.document).attr("src",r.data);
               window.parent.changeTileBackgroudColor("工业参数设置");
           }
        }
    });

}


