// 【用户管理】
const yhgl = {
    cx: [
        {
            cm: '所属单位',
            type: 'select',
            dm: 'bmbh'
        },
        {
            cm: '用户名称',
            type: 'input',
            dm: 'xm'
        },
        {
            cm: '警号',
            type: 'input',
            dm: 'jinghao'
        },
        {
            cm: '创建开始日期',
            type: 'datePicker',
            dm: 'startTime'
        },
        {
            cm: '创建结束日期',
            type: 'datePicker',
            dm: 'endTime'
        },
        {
            cm: '责任区',
            type: 'select',
            dm: 'userType'
        },
        {
            cm: '用户类型',
            type: 'select',
            dm: 'userType'
        },
    ],
    lb: [
        {
            cm: '登录名称',
            dm: 'sfzh'
        },
        {
            cm: '姓名',
            dm: 'xm'
        },
        {
            cm: '警号',
            dm: 'jingHao'
        },
        {
            cm: '部门名称',
            dm: 'xtyhbmmc'
        },
        {
            cm: '创建日期',
            dm: 'xzsj'
        },
        {
            cm: '电话号码',
            dm: 'yddh'
        },
        {
            cm: '责任区',
            dm: 'llcs'
        },
        {
            cm: '创建人',
            dm: 'createUser'
        },
    ],
    lbBtn: [
        {
            "button_name": "密码重置",
            "serial": "201",
        },
        {
            "button_name": "生成随机密码",
            "serial": "201",
        }
    ],
    plBtn: [
        {
            "button_name": "新建",
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "修改",
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "删除",
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "批量密码重置",
            "serial": "201",
            "type": "primary"
        },
        {
            "button_name": "批量生成随机密码",
            "serial": "201",
            "type": "primary"
        }
    ]
}
export default {
    yhgl
}