// import store from '@/store'
//核查走访管理
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
            dm: 'backstatus',
            disdm:true
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
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address'
        },

    ],
    facx:[
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype',
            color:'primary'
        },
        {
            cm: '走访状态',
            type: 'select',
            dm: 'backstatus',
            color:'success',
            checkC:'#67C23A'
        }, 
        // {
        //     cm: '任务处理状态',
        //     type: 'select',
        //     dm: 'statusName'
        // },
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
            dm: 'gender_desc',
            width:'50'
        },
        {
            cm: '出生日期',
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',
            dm: 'nationality_desc',
            width:'70'
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
            dm: 'address',
            width:'280'
        },
        {
            cm: '所属分局',
            dm: 'suboffice_desc',
            width:'280'
        },
        {
            cm: '所属派出所',
            dm: 'policestation_desc',
            width:'280'
        },
        {
            cm: '下发类别',
            dm: 'datatype_desc'
        },
        // {
        //     cm: '手机号码',
        //     dm: 'phone',
        // },
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
        {
            cm: '数据来源',
            dm: 'datasources_desc',
            control:true,//列表项根据条件控制显示
        },
        {
            cm: '停留事由',
            dm: 'stopmatter',
        },
    ],
    inlb:[
        {
            cm:'处理单位',
            dm:'cldw'
        },
        {
            cm:'处理人',
            dm:'clr'
        },
        {
            cm:'处理时间',
            dm:'clsj'
        },
        {
            cm:'处理状态',
            dm:'clzt'
        },
    ],
    lbBtn: [
        {
            "button_name": "回退",
            "button_type": 'back',
            "serial": "201",
            "user_ctrl":'1',
            "status":true,
            "control":true//根据Tab控制
        },
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
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype'
        },
        {
            cm: '走访状态',
            type: 'select',
            dm: 'backstatus',
            disdm:true//查询项下拉选不展示dm
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
            dm: 'gender_desc',
            width:'50'
        },
        {
            cm: '出生日期',
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',
            dm: 'nationality_desc',
            width:'70'
        },
        {
            cm: '证件号码',
            dm: 'passportno'
        },
        {
            cm: '住宿地址',
            dm: 'address',
            width:'280'
        },
        {
            cm: '接收责任区',
            dm: 'turnoutarea_desc',
            
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
            cm: '走访状态',
            dm: 'backstatus_desc'
        },
        {
            cm: '接收类型',
            dm: 'datatype_desc'
        },
        {
            cm: '停留事由',
            dm: 'stopmatter',
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
        {
            title:'基本信息',
            type:'line'
        },
        {
            cm: '中文姓名',
            type: 'input',
            dm: 'name',            
        },
        {
            cm: '英文姓名',
            type: 'input',
            dm: 'givenname',            
        },
        {
            cm: '性别',
            type: 'select',
            dm: 'gender',            
        },
        {
            cm: '出生日期',
            type: 'datePicker',
            dm: 'birthday',            
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
            dm: 'passportno',
        },
        {
            cm: '停留事由',
            type: 'input',
            dm: 'stopmatter',
        },
        {
            cm: '手机号码',
            type: 'input',
            dm: 'phone',
            hc_con:'2',
        },
        {
            title:'走访信息',
            type:'line'
        },
        {
            cm: '下发类别',
            type: 'select',
            dm: 'datatype',            
        },
        {
            cm: '住宿地址',
            type: 'input',
            dm: 'address',            
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
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'policestation',            
        },       
        {
            cm: '接收人',
            type: 'input',
            dm: 'turnoutarea_receive_user',            
        },
        {
            cm: '接收责任区',
            type: 'input',
            dm: 'turnoutarea_desc',            
        },
        {
            cm: '接收时间',
            type: 'input',
            dm: 'turnoutarea_receivedate',            
        },
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
//专项核查管理
const zxhcgl = {
    cx: [
        {
            cm: '标题',
            type: 'input',
            dm: 'bt'
        },
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
            cm: '证件号码',
            type: 'input',
            dm: 'passportno'
        },
        {
            cm: '签证种类',
            type: 'select',
            dm: 'qzzl'
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
        {
            cm: '签证号码',
            type: 'input',
            dm: 'qzhm'
        },
        {
            cm: '出入境状态',
            type: 'select',
            dm: 'datatype'
        },
        {
            cm: '出入境时间',
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
            cm: '数据状态',
            type: 'select',
            dm: 'backstatus'
        },
    ],
    facx:[

    ],
    lb: [
        {
            cm: '标题',
            dm: 'bt'
        },
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
            dm: 'gender_desc',
            width:'50'
        },
        {
            cm: '出生日期',
            dm: 'birthday',
            width:'85'
        },
        {
            cm: '国家地区',
            dm: 'nationality_desc',
            width:'70'
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
            cm: '签证种类',
            dm: 'qqzl',
        },
        {
            cm: '签证号码',
            dm: 'qzhm',
        },
        {
            cm: '下发时间',
            dm: 'issuedate'
        },
        {
            cm: '出入境时间',
            dm: 'suboffice_issuedate'
        },
        {
            cm: '反馈时间',
            dm: 'policestation_backtime'
        },
        {
            cm: '出入境状态',
            dm: 'datatype_desc'
        },
        {
            cm: '数据状态',
            dm: 'backstatus_desc'
        },
    ],
    lbBtn: [
        {
            "button_name": "详情",
            "button_type": 'detail',
            "serial": "201",
        },
        {
            "button_name": "编辑",
            "button_type": 'edit',
            "serial": "201",
        },
        {
            "button_name": "删除",
            "button_type": 'delete',
            "serial": "201",
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
                    "mc": '分局待下发',
                    "dm": '2',
                },
                {
                    "mc": '分局待上报',
                    "dm": '5',
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
                    "mc": '分局待下发',
                    "dm": '2',
                },
                {
                    "mc": '分局待上报',
                    "dm": '5',
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
                cm: '中文姓名',
                type: 'input',
                dm: 'name',
                dis: jb == "3"||isE == '0' ? true : false
            },
            {
                cm: '英文姓名',
                type: 'input',
                dm: 'givenname',
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
                cm: '停留事由',
                type: 'input',
                dm: 'stopmatter',
            },
            {
                cm: '手机号码',
                type: 'input',
                dm: 'phone',
                hc_con:'2'
            },
            {
                cm: '数据来源',
                type: 'input',
                dm: 'datasources_desc',
                hc_con:'1'
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
        }else if(page=='2'||page=='5'){
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
function innerSbDia(data){
    return new Promise((resolve) => {
        zxhc.innerDiaCon=[];
        if(!data.suboffice){
            zxhc.innerDiaCon.push({
                cm: '所属分局',
                type: 'select',
                dm: 'suboffice',
            })
        }
        if(!data.policestation){
            zxhc.innerDiaCon.push({
                cm: '所属派出所',
                type: 'select',
                dm: 'policestation',  
            })
        }
        if(!data.turnoutarea){
            zxhc.innerDiaCon.push({
                cm: '所属责任区',
                type: 'select',
                dm: 'turnoutarea',
            })
        }
        resolve(zxhc.innerDiaCon)
    })
}
function innerBtn(data,page){
    return new Promise((resolve) => {
        if(data == '1'){//已走访
            if(page=='1'){//市局已处理 只能下发
                zxhc.dbBtn = [
                    {
                        "button_name": "下发",
                        "serial": "201",
                        "button_type": "singXf",
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
                ]
            }
        }else if(data == '2'){//未走访
            if(page=='1'){//市局未处理
                zxhc.dbBtn = [
                    {
                        "button_name": "回退",
                        "serial": "201",
                        "button_type": "singback",
                        "type": "primary",
                    },
                    {
                        "button_name": "下发",
                        "serial": "201",
                        "button_type": "singXf",
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
                cm: '中文姓名',
                type: 'input',
                dm: 'name',
                dis: jb == "3" ? true : false
            },
            {
                cm: '英文姓名',
                type: 'input',
                dm: 'givenname',
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
                cm: '手机号码',
                type: 'input',
                dm: 'phone',
            },
            {
                cm: '停留事由',
                type: 'input',
                dm: 'stopmatter',
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
    zxhcgl,
    lbTabShow,
    editShow,
    handShow,
    innerDia,
    innerBtn,
    innerSbDia
}