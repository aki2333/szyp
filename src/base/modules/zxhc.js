// import store from '@/store'
//核查走访
const zxhc = {
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
            cm: '年龄段',
            type: 'ageDouble',
            dm: 'age',
            children: [
                {
                    cm: '开始年龄',
                    type: 'number',
                    dm: 'birthdayStart'
                },
                {
                    cm: '结束年龄',
                    type: 'number',
                    dm: 'birthdayEnd'
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
            cm: '走访状态',
            type: 'select',
            dm: 'backstatus'
        },
        {
            cm: '分局下发时间',
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
            dm: 'passportType_desc'
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
            cm: '走访状态',
            dm: 'backstatus_desc'
        },
        {
            cm: '市局下发时间',
            dm: 'issuedate'
        },
        {
            cm: '分局下发时间',
            dm: 'suboffice_issuedate'
        },
        {
            cm: '反馈时间',
            dm: 'policestation_backtime'
        },
        {
            cm: '任务处理状态',
            dm: 'statusName'
        },


    ],
    lbBtn: [
        {
            "button_name": "处理",
            "button_type": 'edit',
            "serial": "201",
            "user_ctrl":'1',
            "status":true
        },
        {
            "button_name": "详情",
            "button_type": 'detail',
            "serial": "201",
            "user_ctrl":'0',
            "status":true
        },
    ],
    plBtn: [
        {
            "button_name": "上报",
            "serial": "201",
            "button_type": "sb",
            "type": "success"
        },
        {
            "button_name": "下发",
            "serial": "201",
            "button_type": "xf",
            "type": "primary"
        },
    ],
    lbTab: [],
    lbTab1: [],
    //编辑弹窗
    editcontent: [],
    //下发市局弹窗
    xfSContent: [
        {
            cm: '所属分局',
            type: 'select',
            dm: 'suboffice',
            dis: false,
        },
    ],
    //下发分局弹窗
    xfFContent: [
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',
            dis: false,
        },
    ],
    //内联弹窗
    innerDiaCon:[],
    dbBtn: [
        {
            "button_name": "上报",
            "serial": "201",
            "button_type": "singSb",
            "type": "primary",
        },
        {
            "button_name": "下发",
            "serial": "201",
            "button_type": "singXf",
            "type": "primary",
        },
    ],
}
//责任区走访
const zrqzf = {
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
            cm: '年龄段',
            type: 'ageDouble',
            dm: 'age',
            children: [
                {
                    cm: '开始年龄',
                    type: 'number',
                    dm: 'birthdayStart'
                },
                {
                    cm: '结束年龄',
                    type: 'number',
                    dm: 'birthdayEnd'
                },
            ],
        },
        {
            cm: '国家地区',
            type: 'select',
            dm: 'nationality'
        },
        {
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        {
            cm: '接收责任区',
            type: 'select',
            dm: 'turnoutarea'
        },
        {
            cm: '接收人',
            type: 'input',
            dm: 'turnoutarea_receive_user'
        },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address'
        },
        {
            cm: '接收时间',
            type: 'double',
            dm: 'jsTime',
            children: [
                {
                    cm: '反馈开始时间',
                    type: 'date',
                    dm: 'turnoutarea_receivedateStart'
                },
                {
                    cm: '反馈结束时间',
                    type: 'date',
                    dm: 'turnoutarea_receivedateEnd'
                },
            ],
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
            cm: '证件号码',
            dm: 'passportno'
        },
        {
            cm: '住宿地址',
            dm: 'address'
        },
        {
            cm: '接收责任区',
            dm: 'turnoutarea_desc'
        },
        {
            cm: '接收人',
            dm: 'turnoutarea_receive_user'
        },

        {
            cm: '接收时间',
            dm: 'turnoutarea_receivedate'
        },
        {
            cm: '接收类型',
            dm: 'datatype_desc'
        },
    ],
    lbBtn: [
        {
            "button_name": "回退",
            "button_type": 'back',
            "serial": "201",
        },
    ],
    plBtn: [
        {
            "button_name": "处理",
            "serial": "201",
            "button_type": "cl",
            "type": "success",

        },
    ],
    clDia: [

    ],
    zrqDia: [
        {
            cm: '责任区',
            type: 'select',
            dm: 'turnoutarea',
        },
    ],
    zrqJs: [
        {
            cm: '责任区',
            type: 'select',
            dm: 'turnoutarea',
            optype: true
        },
    ],
    dbBtn: [
        {
            "button_name": "上一页",
            "serial": "201",
            "button_type": "upPage",
            "type": "info",
        },
        {
            "button_name": "下一页",
            "serial": "201",
            "button_type": "nextPage",
            "type": "info",
        },
    ],
}
// 核查走访
function lbTabShow(jb) {
    return new Promise((resolve) => {
        if(jb=='1'){
            zxhc.lbTab = [
                {
                    "mc": '市局未处理',
                    "dm": '1',
                },
                {
                    "mc": '分局未处理',
                    "dm": '2',
                },
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            zxhc.lbTab1 = [
                {
                    "mc": '市局已处理',
                    "dm": '1',
                },
                {
                    "mc": '分局已处理',
                    "dm": '2',
                },
                {
                    "mc": '派出所已处理',
                    "dm": '3',
                },
            ]
        }else if(jb=='2'){
            zxhc.lbTab = [   
                {
                    "mc": '分局未处理',
                    "dm": '2',
                },
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            zxhc.lbTab1 = [
                {
                    "mc": '分局已处理',
                    "dm": '2',
                },
                {
                    "mc": '派出所已处理',
                    "dm": '3',
                },
            ]
        }else{
            zxhc.lbTab = [   
                {
                    "mc": '派出所未处理',
                    "dm": '3',
                },
            ]
            zxhc.lbTab1 = [
                {
                    "mc": '派出所已处理',
                    "dm": '3',
                },
            ]
        }
        resolve({lbTab:zxhc.lbTab,lbTab1:zxhc.lbTab1})
    })
}
function editShow(jb,isE) {
    return new Promise((resolve) => {
        zxhc.editcontent = [
            {
                title:'基本信息',
                type:'line'
            },
            {
                cm: '姓名',
                type: 'input',
                dm: 'name',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '性别',
                type: 'select',
                dm: 'gender',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '出生日期',
                type: 'datePicker',
                dm: 'birthday',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '国家地区',
                type: 'select',
                dm: 'nationality',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '证件种类',
                type: 'select',
                dm: 'passportType',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '证件号码',
                type: 'input',
                dm: 'passportno',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                title:'走访信息',
                type:'line'
            },
            {
                cm: '下发类别',
                type: 'select',
                dm: 'datatype',
                dis: true
            },
            {
                cm: '住宿地址',
                type: 'input',
                dm: 'address',
                dis: true,
            },
            {
                cm: '走访状态',
                type: 'radio',
                dm: 'backstatus',
                dis:isE == '0'?true : false
            },
            {
                cm: '备注',
                type: 'joinInput',
                dm: 'remarks',
                dis:isE == '0'?true : false
            },
            {
                title:'数据归属',
                type:'line'
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                dis: true
            },
            {
                cm: '所属派出所',
                type: 'select',
                dm: 'policestation',
                dis: true
            },
            {
                cm: '所属责任区',
                type: 'select',
                dm: 'turnoutarea',
                dis:true
            },
        ]
        resolve(zxhc.editcontent)
    })
}
// 核查走访内联弹窗内容
function innerDia(page){
    return new Promise((resolve) => {
        if(page == '1'){
            zxhc.innerDiaCon = [
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
                    cm: '所属责任区',
                    type: 'select',
                    dm: 'turnoutarea',
                },
            ]
        }else if(page=='2'){
            zxhc.innerDiaCon = [
                {
                    cm: '所属派出所',
                    type: 'select',
                    dm: 'policestation',  
                },
                {
                    cm: '所属责任区',
                    type: 'select',
                    dm: 'turnoutarea',
                },
            ]
        }else if(page=='3'){
            zxhc.innerDiaCon = [
                {
                    cm: '所属责任区',
                    type: 'select',
                    dm: 'turnoutarea',
                },
            ]
        }
        
        resolve(zxhc.innerDiaCon)
    })
}
function innerBtn(data){
    return new Promise((resolve) => {
        if(data == '1'){
            zxhc.dbBtn = [
                {
                    "button_name": "上报",
                    "serial": "201",
                    "button_type": "singSb",
                    "type": "primary",
                },
            ]
        }else{
            zxhc.dbBtn = [
                {
                    "button_name": "上报",
                    "serial": "201",
                    "button_type": "singSb",
                    "type": "primary",
                },
                {
                    "button_name": "下发",
                    "serial": "201",
                    "button_type": "singXf",
                    "type": "primary",
                },
            ]
        }
        
        resolve(zxhc.dbBtn)
    })
}
//责任区管理
function handShow(jb) {
    return new Promise((resolve) => {
        zrqzf.clDia = [
            {
                title:'基本信息',
                type:'line'
            },
            {
                cm: '姓名',
                type: 'input',
                dm: 'name',
                dis: jb == "3" ? true : false
            },
            {
                cm: '性别',
                type: 'select',
                dm: 'gender',
                dis: jb == "3" ? true : false
            },
            {
                cm: '出生日期',
                type: 'datePicker',
                dm: 'birthday',
                dis: jb == "3" ? true : false
            },
            {
                cm: '国家地区',
                type: 'select',
                dm: 'nationality',
                dis: jb == "3" ? true : false
            },
            {
                cm: '证件种类',
                type: 'select',
                dm: 'passportType',

            },
            {
                cm: '证件号码',
                type: 'input',
                dm: 'passportno',

            },
            {
                title:'走访信息',
                type:'line'
            },
            {
                cm: '下发类别',
                type: 'select',
                dm: 'datatype',
                dis: true
            },
            {
                cm: '住宿地址',
                type: 'input',
                dm: 'address',
                dis: true,
            },
            {
                cm: '走访状态',
                type: 'radio',
                dm: 'backstatus'
            },
            {
                cm: '备注',
                type: 'input',
                dm: 'remarks'
            },
            {
                title:'数据归属',
                type:'line'
            },
            {
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
                dis: true
            },
            {
                cm: '所属派出所',
                type: 'select',
                dm: 'policestation',
                dis: true
            },
            // {
            //     cm:'所属责任区',
            //     type:'select',
            //     dm:'policestation',
            //     dis:jb=="3"?true:false
            // },         
            {
                cm: '接收人',
                type: 'input',
                dm: 'turnoutarea_receive_user',
                dis: true
            },
            {
                cm: '接收责任区',
                type: 'input',
                dm: 'turnoutarea_desc',
                dis: true
            },
            {
                cm: '接收时间',
                type: 'input',
                dm: 'turnoutarea_receivedate',
                dis: true
            },
        ]
        resolve(zrqzf.clDia)
    })
}

export default {
    zxhc,
    zrqzf,
    lbTabShow,
    editShow,
    handShow,
    innerDia,
    innerBtn
}