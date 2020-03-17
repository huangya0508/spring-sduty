$(function() {
    $('#tableMaintain').bootstrapTable({
        url: '/materialData/getMaterialList',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        height: 546,
        toolbar: '#toolbarMaintain',
        pagination: false,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 30,                         //每页的记录行数（*）
        // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        // search: true,                      //是否显示表格搜索
        // showColumns: true,                  //是否显示所有的列（选择显示的列）
        // showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        columns: [{
            checkbox: true,
            visible: true                  //是否显示复选框
        },{
            field: "brand",
            title: "牌号"
        }, {
            field: 'density',
            title: '密度（kg/m^3）'
        }, {
            field: 'heatCoefficient',
            title: '导热系数（W/(m*K)）'
        }, {
            field: 'heatCapacity',
            title: '恒压热容（J/(kg*K)）'
        }, {
            field: 'heatExpand',
            title: '热膨胀系数'
        }, {
            field: 'youngMeasurement',
            title: '杨氏衡量（Pa）'
        }, {
            field: 'poissonRatio',
            title: '泊松比'
        }, {
            field: 'shearModulus',
            title: '剪切模量（Pa）'
        }, {
            field: 'ID',
            title: '操作',
            width: 120,
            align: 'center',
            valign: 'middle',
            formatter: actionFormatter
        },],
    });
});

//操作栏的格式化
function actionFormatter(value, row, index) {
    var result = "";
    result += "<a href='javascript:void(0)' onclick=\"queryDetails('" + row.brand + "'," + row.density + "," + row.heatCoefficient + "," + row.heatCapacity + "," + row.heatExpand + "," + row.youngMeasurement + "," + row.poissonRatio + "," + row.shearModulus + ")\" class='btn btn-xs green' title='查看' ><span class='glyphicon glyphicon-search'></span> 查看</a>";
    return result;
}


//查看详情
function queryDetails(brand,density, heatCoefficient, heatCapacity, heatExpand, youngMeasurement, poissonRatio, shearModulus) {
    var arr1 = ["牌号","密度（kg/m^3）", "导热系数（W/(m*K)）", "恒压热容（J/(kg*K)）", "热膨胀系数", "杨氏衡量（Pa）", "泊松比", "剪切模量（Pa）"];
    var arr2 = [brand,density, heatCoefficient, heatCapacity, heatExpand, youngMeasurement, poissonRatio, shearModulus];
    $("#queryDiv").html("");
    var str = "<table class='table table-bordered'>";
    for (var i = 0; i < 8; i++) {
        str += "<tr>";
        str += "<td >" + arr1[i] + "</td>";
        if (arr2[i] == null) {
            str += "<td>" + "-" + "</td>";
        } else {
            str += "<td>" + arr2[i] + "</td>";
        }
        str += "</tr>";
    }
    str += "</table>";
    $("#queryDiv").append(str);
    $("#queryDetails").modal("show");
}


//打开添加模态框
function openAddMaterial() {
    $("#brand").val('');
    $("#density").val('');
    $("#heatCoefficient").val('');
    $("#heatCapacity").val('');
    $("#heatExpand").val('');
    $("#youngMeasurement").val('');
    $("#poissonRatio").val('');
    $("#shearModulus").val('');
    $("#addModal").modal("show");
}


//添加材料
function addMaterial() {
    var brand = $("#brand").val();
    var density = $("#density").val();
    var heatCoefficient = $("#heatCoefficient").val();
    var heatCapacity = $("#heatCapacity").val();
    var heatExpand = $("#heatExpand").val();
    var youngMeasurement = $("#youngMeasurement").val();
    var poissonRatio = $("#poissonRatio").val();
    var shearModulus = $("#shearModulus").val();
    $.ajax({
        type: "Post",
        data: {
            brand:brand,density: density, heatCoefficient: heatCoefficient, heatCapacity: heatCapacity, heatExpand: heatExpand,
            youngMeasurement: youngMeasurement, poissonRatio: poissonRatio, shearModulus: shearModulus
        },
        url: "/materialData/addMaterial",
        success: function (obj) {
            if (obj == "添加成功") {
                layer.msg(obj, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    $("#tableMaintain").bootstrapTable('refresh')

                });
            } else {
                layer.msg(obj, {
                    icon: 2,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    $("#tableMaintain").bootstrapTable('refresh')

                });
            }
        },
    });
}


//打开编辑模态框
function openMaterial() {
    //获取表格选中行
    var rows = $("#tableMaintain").bootstrapTable('getSelections');
    //判断是否选中行
    if (!rows || rows.length == 0) {
        layer.alert("请先选择一行", {title: "错误", anim: 6, icon: 2})
        return;
    }
    $("#idUpdate").val(rows[0].id);
    $("#brandUpdate").val(rows[0].brand);
    $("#densityUpdate").val(rows[0].density);
    $("#heatCoefficientUpdate").val(rows[0].heatCoefficient);
    $("#heatCapacityUpdate").val(rows[0].heatCapacity);
    $("#heatExpandUpdate").val(rows[0].heatExpand);
    $("#youngMeasurementUpdate").val(rows[0].youngMeasurement);
    $("#poissonRatioUpdate").val(rows[0].poissonRatio);
    $("#shearModulusUpdate").val(rows[0].shearModulus);
    $("#updateModal").modal("show");
}


//编辑材料提交
function updateMaterial() {
    var id = $("#idUpdate").val();
    var brand = $("#brandUpdate").val();
    var density = $("#densityUpdate").val();
    var heatCoefficient = $("#heatCoefficientUpdate").val();
    var heatCapacity = $("#heatCapacityUpdate").val();
    var heatExpand = $("#heatExpandUpdate").val();
    var youngMeasurement = $("#youngMeasurementUpdate").val();
    var poissonRatio = $("#poissonRatioUpdate").val();
    var shearModulus = $("#shearModulusUpdate").val();
    $.ajax({
        type: "Post",
        data: {
            brand:brand,
            id: id,
            density: density,
            heatCoefficient: heatCoefficient,
            heatCapacity: heatCapacity,
            heatExpand: heatExpand,
            youngMeasurement: youngMeasurement,
            poissonRatio: poissonRatio,
            shearModulus: shearModulus
        },
        url: "materialData/updateMaterial",
        success: function (obj) {
            if (obj == "修改成功") {
                layer.msg(obj, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    $("#tableMaintain").bootstrapTable('refresh')
                });
            } else {
                layer.msg(obj, {
                    icon: 2,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    $("#tableMaintain").bootstrapTable('refresh')
                });
            }
        },
    });
}


//删除
function deleteMaterial() {
    //获取表格选中行
    var rows = $("#tableMaintain").bootstrapTable('getSelections');
    //判断是否选中行
    if (!rows || rows.length == 0) {
        layer.alert("请先选择一行", {title: "错误", anim: 6, icon: 2});
        return;
    }

    layer.confirm('确定删除吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        $.ajax({
            type: "Get",
            data: {id: rows[0].id},
            url: "materialData/delMaterial",
            success: function (obj) {
                if (obj == "删除成功") {
                    layer.msg(obj, {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        $("#tableMaintain").bootstrapTable('refresh')
                    });
                } else {
                    layer.msg(obj, {
                        icon: 2,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        $("#tableMaintain").bootstrapTable('refresh')
                    });
                }
            },
        });

    }, function () {
        layer.closeAll();
    });


}



