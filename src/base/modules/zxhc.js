// import store from '@/store'
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
            dm: 'gender',
        },
        {
            cm: '年龄段',
            type: 'ageDouble',
            dm: 'age',
            children:[
                {
                    cm:'开始年龄',
                    type:'number',
                    dm:'birthdayStart'
                },
                {
                    cm:'结束年龄',
                    type:'number',
                    dm:'birthdayEnd'
                },
            ],
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        {
            cm: '证件种类',
            type: 'select',
            dm: 'passportType'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice'
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation'
        },
        {
            cm: '下发时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '下发开始时间',
                    type: 'date',
                    dm: 'suboffice_issuedateStart'
                },
                {
                    cm: '下发结束时间',
                    type: 'date',
                    dm: 'suboffice_issuedateEnd'
                }
            ]
        },
        {
            cm: '反馈时间',
            type: 'double',
            dm: 'fkTime',
            children: [
                {
                    cm: '反馈开始时间',
                    type: 'date',
                    dm: 'policestation_backtimeStar'
                },
                {
                    cm: '反馈结束时间',
                    type: 'date',
                    dm: 'policestation_backtimeEnd'
                },
            ],
        },
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype'
        },
        {
            cm: '数据状态',
            type: 'select',
            dm: 'backstatus'
        },
    ],
    lb: [
        {
            cm: '姓名',
            dm: 'name'
        },
        {
            cm: '性别',
            dm: 'gender_desc'
        },
        {
            cm: '出生日期',
            dm: 'birthday'
        },
        {
            cm: '国家地区',
            dm: 'nationality_desc'
        },
        {
            cm: '证件种类',
            dm: 'passporttype'
        },
        {
            cm: '证件号码',
            dm: 'passportno'
        },
        {
            cm: '详细地址',
            dm: 'address'
        },
        {
            cm: '所属分局',
            dm: 'suboffice_desc'
        },
        {
            cm: '所属派出所',
            dm: 'policestation_desc'
        },
        {
            cm: '下发类别',
            dm: 'datatype_desc'
        },
        {
            cm: '数据状态',
            dm: 'status_desc'
        },
        {
            cm: '下发时间',
            dm: 'issuedate'
        },
        {
            cm: '反馈时间',
            dm: 'policestation_backtime'
        },

    ],
    lbBtn: [
        {
            "button_name": "编辑",
            "button_type":'edit',
            "serial": "201",
        },
    ],
    plBtn: [
        {
            "button_name": "上报",
            "serial": "201",
            "button_type": "sb"
        },
        {
            "button_name": "下发",
            "serial": "201",
            "button_type": "xf"
        },
    ],
    lbTab: [
        {
            "tab_name": '市局未处理',
            "page": 1,
        },
        {
            "tab_name": '分局未处理',
            "page": 2,
        },
        {
            "tab_name": '派出所未处理',
            "page": 3,
        },
    ],
    editcontent:[
        {
            cm:'姓名',
            type:'input',
            dm:'name',
        },
        {
            cm:'性别',
            type:'select',
            dm:'gender',
        },
        {
            cm:'出生日期',
            type:'datePicker',
            dm:'birthday',
        },
        {
            cm:'国家地区',
            type:'select',
            dm:'nationality',
        },
        {
            cm:'证件种类',
            type:'select',
            dm:'passportType',
        },
        {
            cm:'证件号码',
            type:'input',
            dm:'passportno',
        },
        {
            cm:'下发类别',
            type:'select',
            dm:'datatype',
        },
        {
            cm:'住宿地址',
            type:'input',
            dm:'address',
            dis:true,
        },
        {
            cm:'所属分局',
            type:'select',
            dm:'suboffice',
        },
        {
            cm:'所属派出所',
            type:'select',
            dm:'policestation',
        },
        {
            cm:'走访状态',
            type:'radio',
            dm:'backstatus'
        },
        {
            cm:'备注',
            type:'input',
            dm:'remarks'
        },
    ],
    xfSContent:[
        {
            cm:'所属分局',
            type:'select',
            dm:'suboffice',
            dis:false,
        },
    ],
    xfFContent:[
        {
            cm:'所属派出所',
            type:'select',
            dm:'policestation',
            dis:false,
        },
    ],
}

export default {
    zxhc
}