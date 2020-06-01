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
            type: 'datePicker',
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
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',
        },
        // {
        //     cm: '上报状态',
        //     type: 'select',
        //     dm: 'sbzt',
        // },
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
            cm: '中文姓名',
            dm: 'name'
        },
        {
            cm: '英文姓名',
            dm: 'givenname'
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
            dm: 'passporttypeMc'
        },
        {
            cm: '证件号码',
            dm: 'passportno'
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
        // {
        //     cm: '审核状态',
        //     dm: 'shztMc'
        // }
    ],
    lbTab: [
        {
            "mc": '审核成功',
            "dm": 1,
        },
        {
            "mc": '审核失败',
            "dm": 2,
        }
    ],
    lbBtn: [
        {
            "button_name": "编辑",
            "button_type": "bj",
            "serial": "201",
        },
        {
            "button_name": "下载记录",
            "button_type": "xzjl",
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
    bj: [
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name'
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname'
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',
        },
        {
            cm: '出生日期',
            type: 'datePicker',
            dm: 'birthday'
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality',
        },
        {
            cm: '人员类别',
            type: 'select',
            dm: 'rylb',
        },
        {
            cm: '本人联系电话',
            type: 'input',
            dm: 'sjhm'
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
            cm: '签证有效期至',
            type: 'datePicker',
            dm: 'tlyxqz'
        },
        {
            cm: '签发机构',
            type: 'select',
            dm: 'qfjg'
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice',
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',
        },
        {
            cm: '住宿日期',
            type: 'datePicker',
            dm: 'zssj'
        },
        {
            cm: '上报时间',
            type: 'datePicker',
            dm: 'sbsj'
        },
        {
            cm: '入境日期',
            type: 'datePicker',
            dm: 'rjrq'
        },
        {
            cm: '入境口岸',
            type: 'select',
            dm: 'rjka'
        },
        {
            cm: '入境事由',
            type: 'select',
            dm: 'rjsy'
        },
        {
            cm: '住所性质',
            type: 'select',
            dm: 'zsxz'
        },
        {
            cm: '住房种类',
            type: 'select',
            dm: 'zfzl'
        },
        {
            cm: '紧急联系人',
            type: 'input',
            dm: 'jjlxr'
        },
        {
            cm: '紧急联系人电话',
            type: 'input',
            dm: 'jjlxrdh'
        },
        {
            cm: '审核状态',
            type: 'select',
            dm: 'shzt',
            dis: true
        },
        {
            cm: '上报状态',
            type: 'select',
            dm: 'sbzt',
            optype: true,
            dis: true
        },
        {
            cm: '核查结果',
            type: 'input',
            dm: 'yq_hcjg'
        },
        {
            cm: '不通过原因',
            type: 'input',
            col: 24,
            dm: 'shsm'
        },
        {
            cm: '备注',
            type: 'input',
            col: 24,
            dm: 'bz'
        },
        {
            cm: '操作人',
            type: 'input',
            dm: 'spr'
        },
        {
            cm: '操作人单位',
            type: 'input',
            dm: 'sprdm'
        },
        {
            cm: '操作时间',
            type: 'datePicker',
            dm: 'spsj'
        }
        // {
        //     cm: '修改人',
        //     type: 'input',
        //     dm: 'xgr'
        // },
        // {
        //     cm: '修改人单位',
        //     type: 'input',
        //     dm: 'xgrdm'
        // },
        // {
        //     cm: '修改时间',
        //     type: 'datePicker',
        //     dm: 'xgsj'
        // }

    ]
}
export default {
    lzsb
}