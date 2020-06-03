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
            cm: '住宿地址',
            dm: 'zsdz'
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
            "mc": '核查中',
            "dm": "hczt_0",
        },
        {
            "mc": '核查通过',
            "dm": "hczt_1",
        },
        {
            "mc": '核查未通过',
            "dm": "hczt_2",
        }
    ],
    lbBtn1: [
        {
            "button_name": "编辑",
            "button_type": "bj",
            "serial": "201",
        },
        {
            "button_name": "下载登记表",
            "button_type": "xzjl",
            "serial": "201",
        }
    ],
    lbBtn2: [
        {
            "button_name": "查看",
            "button_type": "ck",
            "serial": "201",
        },
        {
            "button_name": "下载登记表",
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
    bj: {
        "a": [
            {
                cm: '国家(地区)',
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
                dm: 'passportno'
            },
            {
                cm: '英文姓',
                type: 'input',
                dm: 'surname'
            },
            {
                cm: '英文名',
                type: 'input',
                dm: 'firstname'
            },
            {
                cm: '中文姓名',
                type: 'input',
                dm: 'name'
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
                cm: '身份证号码',
                type: 'input',
                dm: 'sfzh',
            },
            {
                cm: '证件有效期',
                type: 'datePicker',
                dm: 'zjyxq'
            },
            {
                cm: '签证(注)种类',
                type: 'select',
                dm: 'visaType',
            },
            {
                cm: '签证(注)号码',
                type: 'input',
                dm: 'visaNo'
            },
            {
                cm: '签证(注)有效期至',
                type: 'datePicker',
                dm: 'tlyxqz'
            },
            {
                cm: '签发地',
                type: 'select',
                dm: 'qfjg'
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
        ],
        "b": [

            {
                cm: '停留事由',
                type: 'select',
                dm: 'rjsy'
            },
            {
                cm: '职业',
                type: 'select',
                dm: 'zy',
            },

            // {
            //     cm: '人员类别',
            //     type: 'select',
            //     dm: 'rylb',
            // },
            // {
            //     cm: '接待单位',
            //     type: 'input',
            //     dm: 'jddw',
            // },
            {
                cm: '在华工作机构名称',
                type: 'input',
                dm: 'gzjg',
            },
            {
                cm: '住宿日期',
                type: 'datePicker',
                dm: 'zssj'
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
                cm: '住宿地址',
                type: 'input',
                col: 16,
                dm: 'zsdz'
            },
            {
                cm: '本人联系电话',
                type: 'input',
                dm: 'sjhm'
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
                cm: '上报时间',
                type: 'datetimePicker',
                dm: 'sbsj'
            },
            {
                cm: '备注',
                type: 'textarea',
                col: 24,
                dm: 'bz'
            },
            {
                cm: '审核不通过原因',
                type: 'textarea',
                col: 24,
                dm: 'shsm',
                cshow: true
            },
            {
                cm: '核查不通过原因',
                type: 'textarea',
                col: 24,
                dm: 'hcsm',
                cshow: true
            },
            {
                cm: '审核人',
                type: 'input',
                dm: 'spr'
            },
            {
                cm: '审核单位',
                type: 'input',
                dm: 'sprdm'
            },
            {
                cm: '审核时间',
                type: 'datePicker',
                dm: 'spsj'
            }

        ]
    }

}
export default {
    lzsb
}