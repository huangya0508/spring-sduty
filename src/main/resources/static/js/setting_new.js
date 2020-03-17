$(function () {
    initTable();
});

/**
 * 增加区域铺层材料
 * @param area 不同的区域
 */
function addAreaMaterial(area) {
    //打开模态框的时候默认为0
    var count = $("#angle option").length;
    for (var i = 0; i < count; i++) {
        if ($("#angle ").get(0).options[i].value ==0) {
            $("#angle ").get(0).options[i].selected = true;
            break;
        }
    }
    $("#area").val(area);
    $("#thickness").val('');
    $("#index").val('');
    $("#myModalLabel").text('添加铺层');
    $('#myModal').modal('show')
}

//初始化表格
function initTable() {
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
        singleSelect: true,
        //toolbar: "#toolbar",//指定工具栏
        toolbarAlign: "left",//工具栏对齐方式
        height: "auto",
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        columns: [
            {
                checkbox: true

            },
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

        locale: "zh-CN", //中文支持
        detailView: false, //是否显示详情折叠
        detailFormatter: function (index, row, element) {
            var html = '';
            $.each(row, function (key, val) {
                html += "<p>" + key + ":" + val + "</p>"
            });
            return html;
        }
    });
}

//提交方法
function sub() {
    var index = $("#index").val();
    var area = $("#area").val();
    var thickness = $("#thickness").val();//厚度
    if (thickness == "" || thickness == "undefined") {
        layer.msg("厚度不能空");
        return;
    }
    //添加
    if (index == "" || index == "undefined"){
        var rows = $("#addTable").bootstrapTable("getSelections");
        if (rows.length == 0) {
            layer.alert("请先选择材料", {title: "错误", anim: 6, icon: 2});
            return;
        }
        var me = creatData(rows[0], $("#angle").val());
        $.ajax({
            type: "post",
            url: "/setting/addSetting",
            data: {
                "index": index,
                "partitionNum": area.toString(),
                "brand": me.brand,
                "density": me.density,
                "heatCoefficient": me.heatCoefficient,
                "heatCapacity": me.heatCapacity,
                "heatExpand": me.heatExpand,
                "youngMeasurement": me.youngMeasurement,
                "poissonRatio": me.poissonRatio,
                "shearModulus": me.shearModulus,
                "angle": me.angle,
                "thickness": thickness
            },
            dataType: "json",
            success: function (datas) {
                $('#addTable').bootstrapTable("refresh");
                refreshTabel(area, datas);
                $("#myModal").modal('hide');    //关闭模态框
                if (index == "" || index == "undefined") {
                    layer.msg("添加成功");
                }else {
                    layer.msg("编辑成功");
                }
            }
        });
    }else {//编辑
        $.ajax({
            type: "post",
            url: "/setting/addSetting",
            data: {
                "index": index,
                "partitionNum": area.toString(),
                "angle": $("#angle").val().toString(),
                "thickness": thickness
            },
            dataType: "json",
            success: function (datas) {
                $('#addTable').bootstrapTable("refresh");
                refreshTabel(area, datas);
                $("#myModal").modal('hide');    //关闭模态框
                if (index == "" || index == "undefined") {
                    layer.msg("添加成功");
                }else {
                    layer.msg("编辑成功");
                }
            }
        });

    }
}

function refreshTabel(area, datas) {
    var tableName = "#setTable" + area;
    $("#tabData" + area).html("");

    var str = "<table id='" + tableName + "' class='table table-bordered'>";
    str += "<tr><th>层数</th><th>材料牌号</th><th>铺层设定</th><th>厚度</th><th>操作</th></tr>";
    for (var i = 0; i < datas.length; i++) {
        str += "<tr>";
        str += "<td>" + (i + 1) + "</td>";
        str += "<td>" + datas[i].brand + "</td>";
        str += "<td>" + datas[i].angle + "</td>";
        str += "<td>" + datas[i].thickness + "</td>";
        str += "<td>" + [
            '<button type="button" class="btn btn-default btn-xs up" onclick="moveUp(' + i + ',' + area + ')"><i class="glyphicon glyphicon-upload"></i> 上移</button>\n' +
            '<button type="button" class="btn btn-default btn-xs down" onclick="moveDown(' + i + ',' + area + ',' + datas.length + ')"><i class="glyphicon glyphicon-download"></i>下移</button>\n' +
            '<button type="button" class="btn btn-danger btn-xs " onclick="modify(' + i + ',' + area + ',' + datas[i].angle + ',' + datas[i].thickness + ',' +datas[i].brand + ')"><i class="glyphicon glyphicon-edit"></i> 编辑</button>' +
            '&nbsp;<button type="button" class="btn btn-danger btn-xs del" onclick="delLine(' + i + ',' + area + ')"><i class="glyphicon glyphicon-trash"></i> 移除</button>',
        ].join('') + "</td>";

        str += "</tr>";
    }
    str += "</table>";
    $("#tabData" + area).append(str);
}

function creatData(row, angle) {
    var o = new Object();
    o.brand = row.brand;
    o.density = row.density;
    o.heatCoefficient = row.heatCoefficient;
    o.heatCapacity = row.heatCapacity;
    o.heatExpand = row.heatExpand;
    o.youngMeasurement = row.youngMeasurement;
    o.poissonRatio = row.poissonRatio;
    o.shearModulus = row.shearModulus;
    o.angle = angle;
    return o;
}


function nextTechnology() {
    $.ajax({
        type: "post",
        url: "/setting/subTechnology",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.result) {
                $("#myIframe", parent.document).attr("src", r.data);
                window.parent.changeTileBackgroudColor("工艺参数设置");
            } else {
                layer.alert(r.data, {title: "错误", anim: 6, icon: 2});
            }
        }
    });
}

//删除层数
function delLine(index, area) {
    $.ajax({
        type: "post",
        url: "/setting/delSetting",
        data: {
            "partitionNum": area.toString(), "index": index
        },
        dataType: "json",
        success: function (datas) {
            $('#addTable').bootstrapTable("refresh");
            refreshTabel(area, datas);
            layer.msg("删除成功");
        }
    });

}


//上移
function moveUp(index, area) {
    if (index == 0) {
        layer.alert("首行数据不可上移", {title: "错误", anim: 6, icon: 2});
    } else {
        $.ajax({
            type: "post",
            url: "/setting/moveUpSetting",
            data: {
                "partitionNum": area.toString(), "index": index
            },
            dataType: "json",
            success: function (datas) {
                $('#addTable').bootstrapTable("refresh");
                refreshTabel(area, datas);
                layer.msg("上移成功");
            }
        });

    }
}

//下移
function moveDown(index, area, length) {
    if (index == length - 1) {
        layer.alert("尾行数据不可下移", {title: "错误", anim: 6, icon: 2});
    } else {
        $.ajax({
            type: "post",
            url: "/setting/moveDownSetting",
            data: {
                "partitionNum": area.toString(), "index": index
            },
            dataType: "json",
            success: function (datas) {
                $('#addTable').bootstrapTable("refresh");
                refreshTabel(area, datas);
                layer.msg("下动成功");
            }
        });

    }
}


//编辑
function modify(index, area, angle, thickness,brand ) {
    //回显下拉框
    var count = $("#angle option").length;
    for (var i = 0; i < count; i++) {
        if ($("#angle ").get(0).options[i].value == angle) {//获取select 的value值和入参比较
            $("#angle ").get(0).options[i].selected = true;
            break;
        }
    }
    //回显编辑行
    $('#myModal #addTable tbody tr').each(function () {
        if ($(this).find('td').eq(1).text() == brand) {
            $(this).find('td').eq(0).find('label input').attr('checked', true);
        }
    });
    $("#thickness").val(thickness);
    $("#index").val(index);
    $("#myModalLabel").text('编辑铺层');
    $('#myModal').modal('show');
}

function updateSub() {
    var area = $("#angle").val();
    var thickness = $("#thickness").val();//厚度
    var rows = $("#addTable").bootstrapTable("getSelections");
    var me = creatData(rows[0], $("#angle").val());
    $.ajax({
        type: "post",
        url: "/setting/updateSetting",
        data: {
            "index": 1,
            "partitionNum": area.toString(),
            "brand": me.brand,
            "density": me.density,
            "heatCoefficient": me.heatCoefficient,
            "heatCapacity": me.heatCapacity,
            "heatExpand": me.heatExpand,
            "youngMeasurement": me.youngMeasurement,
            "poissonRatio": me.poissonRatio,
            "shearModulus": me.shearModulus,
            "angle": me.angle,
            "thickness": thickness
        },
        dataType: "json",
        success: function (datas) {
            $('#addTable').bootstrapTable("refresh");
            refreshTabel(area, datas);
            $("#myModal").modal('hide');    //关闭模态框
            layer.msg("添加成功");
        }
    });

}