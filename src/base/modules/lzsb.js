// 【用户管理】
const lzsb = {
    cx: [
        {
            cm: '姓名',
            type: 'input',
            dm: 'xm'
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '出生日期',
            type: 'input',
            dm: 'birthday'
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType',
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportNo'
        },
        {
            cm: '签证种类',
            type: 'select',
            dm: 'visaType',
        },
        {
            cm: '签证号码',
            type: 'input',
            dm: 'visaNo'
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice',
        },

        {
            cm: '审核状态',
            type: 'select',
            dm: 'shzt',
        },
        {
            cm: '住宿时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '开始日期',
                    type: 'date',
                    dm: 'zssjUp'
                },
                {
                    cm: '结束日期',
                    type: 'date',
                    dm: 'zssjLow'
                }
            ]
        },
        {
            cm: '上报状态',
            type: 'select',
            dm: 'sbzt',
        },
        {
            cm: '上报时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '开始日期',
                    type: 'date',
                    dm: 'sbsjUp'
                },
                {
                    cm: '结束日期',
                    type: 'date',
                    dm: 'sbsjLow'
                }
            ]
        },

    ],
    lb: [
        {
            cm: '姓名',
            dm: 'name'
        },
        {
            cm: '性别',
            dm: 'genderMc'
        },
        {
            cm: '出生日期',
            dm: 'birthday'
        },
        {
            cm: '国家地区',
            dm: 'nationalityMc'
        },
        {
            cm: '证件种类',
            dm: 'passportTypeMc'
        },
        {
            cm: '证件号码',
            dm: 'passportNo'
        },
        {
            cm: '签证种类',
            dm: 'visatypeMc'
        },
        {
            cm: '签证号码',
            dm: 'visaNo'
        },
        {
            cm: '所属分局',
            dm: 'subofficeMc'
        },
        {
            cm: '住宿日期',
            dm: 'zssj'
        },
        {
            cm: '上报日期',
            dm: 'sbsj'
        },
        {
            cm: '上报状态',
            dm: 'sbztMc'
        },
        {
            cm: '审核状态',
            dm: 'shztMc'
        }
    ],
    lbBtn: [
        {
            "button_name": "编辑",
            "button_type": "bj",
            "serial": "201",
        }
    ],
    plBtn: [
        {
            "button_name": "新建",
            "button_type": "xj",
            "user_ctrl": 1,
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "修改",
            "button_type": "xg",
            "user_ctrl": 1,
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "删除",
            "button_type": "sc",
            "user_ctrl": 1,
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "全部密码重置",
            "button_type": "plmmcz",
            "serial": "201",
            "type": "primary"
        },
        {
            "button_name": "全部生成随机密码",
            "button_type": "plscsjmm",
            "serial": "201",
            "type": "primary"
        }
    ],
    // 【单位列表】
    dwtb: [
        {
            cm: '单位名称',
            dm: 'xtyhbmmc'
        },
        // {
        //     cm: '单位类型',
        //     dm: 'xtyhbmcj'
        // },
    ],
    xj: [
        {
            cm: '姓名',
            type: 'input',
            dm: 'xm' //必填
        },
        {
            cm: '电话号码',
            type: 'input',
            dm: 'yddh'//必填
        },
        {
            cm: '警号',
            type: 'input',
            dm: 'jingHao'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'sfzh'//必填
        },
        {
            cm: '所属单位',
            type: 'select',
            dm: 'bmbh',//必填
        },
        // {
        //     cm: '市局单位',
        //     type: 'select',
        //     dm: 'sjBmbh',
        // },
        // {
        //     cm: '分局单位',
        //     type: 'select',
        //     dm: 'fjBmbh',
        // },
        // {
        //     cm: '派出所单位',
        //     type: 'select',
        //     dm: 'pcsBmbh',
        // },
        {
            cm: '密码',
            type: 'input',
            dm: 'xtmm'//必填
        },
        // {
        //     cm: '用户类型',
        //     type: 'select',
        //     dm: 'userType',
        //     optype: true
        // },
    ],
    xg: [
        {
            cm: '姓名',
            type: 'input',
            dm: 'xm'
        },
        {
            cm: '电话号码',
            type: 'input',
            dm: 'yddh'
        },
        {
            cm: '警号',
            type: 'input',
            dm: 'jingHao'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'sfzh'
        },
        {
            cm: '所属单位',
            type: 'select',
            dm: 'bmbh'
        }
    ],
    plmmcz: [
        {
            cm: '密码',
            type: 'password',
            dm: 'xtmm'
        },
        {
            cm: '确认密码',
            type: 'password',
            dm: 'qrxtmm'
        },
    ]
}
export default {
    lzsb
}