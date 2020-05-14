const zxhc = {
    cx: [
        {
            cm: '姓名',
            type: 'input',
            dm: 'name'
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender'
        },
        {
            cm: '年龄段',
            type: 'input',
            dm: 'age'
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'gjdq'
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'zjzl'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'zjhm'
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'ssfj'
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'sspcs'
        },
        {
            cm: '下发时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '下发开始时间',
                    type: 'date',
                    dm: 'xfSTime'
                },
                {
                    cm: '下发结束时间',
                    type: 'date',
                    dm: 'xfETime'
                }
            ]
        },

        {
            cm: '反馈开始时间',
            type: 'datePicker',
            dm: 'startTime'
        },
        {
            cm: '反馈结束日期',
            type: 'datePicker',
            dm: 'endTime'
        },
        {
            cm: '下发类别',
            type: 'select',
            dm: 'xfType'
        },
        {
            cm: '数据状态',
            type: 'select',
            dm: 'dataType'
        },
    ],
    lb: [
        {
            cm: '姓名',
            dm: 'name'
        },
        {
            cm: '性别',
            dm: 'xb'
        },
        {
            cm: '出生日期',
            dm: 'birth'
        },
        {
            cm: '国家地区',
            dm: 'gjdq'
        },
        {
            cm: '证件种类',
            dm: 'zjzl'
        },
        {
            cm: '证件号码',
            dm: 'zjhm'
        },
        {
            cm: '详细地址',
            dm: 'dz'
        },
        {
            cm: '所属分局',
            dm: 'ssfj'
        },
        {
            cm: '所属派出所',
            dm: 'sspcs'
        },
        {
            cm: '下发类别',
            dm: 'xslb'
        },
        {
            cm: '数据状态',
            dm: 'sjzt'
        },
        {
            cm: '下发时间',
            dm: 'xfsj'
        },
        {
            cm: '反馈时间',
            dm: 'fksj'
        },

    ],
    lbBtn: [
        {
            "button_name": "编辑",
            "serial": "201",
        },
    ],
    plBtn: [
        {
            "button_name": "上报",
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "下发",
            "serial": "201",
            "type": "primary"
        },
    ],
    lbTab: [
        {
            "tab_name": '市局未处理',
            "page": 0,
        },
        {
            "tab_name": '分局未处理',
            "page": 1,
        },
        {
            "tab_name": '派出所未处理',
            "page": 2,
        },
    ],
}
export default {
    zxhc
}