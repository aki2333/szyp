// 【用户管理】
const lzsb = {
    cx: [
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
            cm: '上报时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '开始日期',
                    type: 'date',
                    dm: 'sbsjLow'
                },
                {
                    cm: '结束日期',
                    type: 'date',
                    dm: 'sbsjUp'
                }
            ]
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
            cm: '住宿时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '开始日期',
                    type: 'date',
                    dm: 'zssjLow'
                },
                {
                    cm: '结束日期',
                    type: 'date',
                    dm: 'zssjUp'
                }
            ]
        },
        {
            cm: '数据来源',
            type: 'select',
            dm: 'sjly',
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
            dm: 'genderMc',
            width:'50'
        },
        {
            cm: '出生日期',
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',
            dm: 'nationalityMc',
            width:'70'
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
            dm: 'subofficeMc',
            width:'280'
        },
        {
            cm: '住宿地址',
            dm: 'zsdz',
            width:'280'
        },
        {
            cm: '住宿日期',
            dm: 'zssj'
        },
        {
            cm: '上报时间',
            dm: 'sbsj'
        },
        {
            cm: '数据来源',
            dm: 'sjlyMc'
        }
    ],
    lbTab: [
        {
            "mc": '走访中',
            "dm": "hczt_0",
        },
        {
            "mc": '走访通过',
            "dm": "hczt_1",
        },
        {
            "mc": '走访未通过',
            "dm": "hczt_2",
        }
    ],
    lbBtn1: [
        {
            "button_name": "编辑",
            "button_type": "bj",
            "serial": "201",
        },
        // {
        //     "button_name": "下载登记表",
        //     "button_type": "xzjl",
        //     "serial": "201",
        // }
    ],
    lbBtn2: [
        {
            "button_name": "查看",
            "button_type": "ck",
            "serial": "201",
        },
        // {
        //     "button_name": "下载登记表",
        //     "button_type": "xzjl",
        //     "serial": "201",
        // }
    ],
    lbBtn3: [
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
                weight:true,
                dis:true,
            },
            {
                cm: '证件种类',
                type: 'select',
                dm: 'passportType',
                weight:true,
                dis:true,
            },
            {
                cm: '证件号码',
                type: 'input',
                dm: 'passportno',
                weight:true,
                dis:true,
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
            // {
            //     cm: '英文姓名',
            //     type: 'input',
            //     dm: 'givenname'
            // },
            // {
            //     cm: '核查英文姓名',
            //     type: 'input',
            //     dm: 'givenname'
            // },
            {
                cm: '中文姓名',
                type: 'input',
                dm: 'name',
            },
            {
                cm: '性别',
                type: 'select',
                dm: 'gender',
                dis:true,
            },
            {
                cm: '出生日期',
                type: 'datePicker',
                dm: 'birthday',
                dis:true,
            },
            {
                cm: '身份证号码',
                type: 'input',
                dm: 'sfzh',
                dis:true,
            },
            {
                cm: '证件有效期',
                type: 'datePicker',
                dm: 'zjyxq',
                dis:true,
            },
            {
                cm: '签证种类',
                type: 'select',
                dm: 'visaType',
                dis:true,
            },
            {
                cm: '签证号码',
                type: 'input',
                dm: 'visaNo',
                dis:true,
            },
            {
                cm: '签证有效期至',
                type: 'datePicker',
                dm: 'tlyxqz',
                dis:true,
            },
            {
                cm: '签发地',
                type: 'select',
                dm: 'qfjg',
                dis:true,
            },
            {
                cm: '入境日期',
                type: 'datePicker',
                dm: 'rjrq',
                dis:true,
            },
            {
                cm: '入境口岸',
                type: 'select',
                dm: 'rjka',
                dis:true,
            },
            {
                cm: '停留事由',
                type: 'select',
                dm: 'rjsy',
                dis:true,
            },
            {
                cm: '在华工作机构名称',
                type: 'input',
                dm: 'gzjg',
                dis:true,
            },
        ],
        "b": [

            
            // {
            //     cm: '职业',
            //     type: 'select',
            //     dm: 'zy',
            // },

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
                cm: '登记人',
                type: 'input',
                dm: 'djr',
                dis:true,
            },
            {
                cm: '登记单位',
                type: 'input',
                dm: 'djdw',
                dis:true,
            },
            {
                cm: '住宿日期',
                type: 'datePicker',
                dm: 'zssj',
                toS:true,//日期精确到秒
                dis:true,
            },
            {
                cm: '行政区划',
                type: 'select',
                dm: 'xzqh',
                dis:true,
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                poupDm:'subofficeMc',
                poup:true,
                dis:true,
            },
            {
                cm: '所属派出所',
                type: 'select',
                dm: 'policestation',
                poupDm:'policestationMc',
                poup:true,
                dis:true,
            },
            {
                cm: '本人联系电话',
                type: 'input',
                dm: 'sjhm',
                dis:true,
            },
            {
                cm: '住宿地址',
                type: 'input',
                col: 16,
                dm: 'zsdz',
                dis:true,
            },

            {
                cm: '紧急联系人',
                type: 'input',
                dm: 'jjlxr',
                dis:true,
            },
            {
                cm: '定位地址',
                type: 'input',
                col: 16,
                dm: 'dwdz',
                dis:true,
            },
            {
                cm: '紧急联系人电话',
                type: 'input',
                dm: 'jjlxrdh',
                dis:true,
            },
            {
                cm: '住所性质',
                type: 'select',
                dm: 'zsxz',
                dis:true,
            },
            {
                cm: '住房种类',
                type: 'select',
                dm: 'zfzl',
                dis:true,
            },

            {
                cm: '上报时间',
                type: 'datetimePicker',
                dm: 'sbsj',
                dis:true,
            },
            {
                cm: '数据比对结果',
                type: 'input',
                col: 16,
                dm: 'yq_hcjg',
                dis:true,
            },

            {
                cm: '出入境状态',
                type: 'select',
                dm: 'crjzt',
                dis:true,
            },
            {
                cm: '证件有效期至',
                type: 'datePicker',
                dm: 'zjyxqz',
                dis:true,
            },
            {
                cm: '职业',
                type: 'select',
                dm: 'zy',
                dis:true,
            },
            {
                cm: '房主姓名',
                type: 'input',
                dm: 'fzxm',
                dis:true,
            },
            {
                cm: '房主电话',
                type: 'input',
                dm: 'fzdh',
                dis:true,
            },
            {
                cm: '房主身份证',
                type: 'input',
                dm: 'fzsfz',
                dis:true,
            },
            {
                cm: '与境外人员关系',
                type: 'select',
                dm: 'jwrygx',
                dis:true,
            },

            {
                cm: '备注',
                type: 'textarea',
                col: 24,
                dm: 'bz',
                dis:true,
            },
            {
                cm: '审核不通过原因',
                type: 'textarea',
                col: 24,
                dm: 'shsm',
                cshow: true,
                dis:true,
            },
            {
                cm: '核查不通过原因',
                type: 'textarea',
                col: 24,
                dm: 'hcsm',
                cshow: true,
                dis:true,
            },
            {
                cm: '审核人',
                type: 'input',
                dm: 'sprMc',
                dis: true,
            },
            {
                cm: '审核单位',
                type: 'input',
                dm: 'sprdwMc',
                dis: true,
            },
            {
                cm: '审核时间',
                type: 'datetimePicker',
                dm: 'spsj',
                dis: true
            },
            {
                cm:'报错',
                type:'checkbox',
                dm:'checklist',
                col:24,
                optype:true
            }
        ]
    }

}
export default {
    lzsb
}