import api from '@/api/index.js'
import store from '@/store'

// 【用户管理】
const yhgl = {
    cx: [
        {
            cm: '所属单位',
            type: 'select',
            dm: 'bmbh',
            // must: true
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
            cm: '姓名',
            type: 'input',
            dm: 'xm'
        },
        {
            cm: '警号',
            type: 'input',
            dm: 'jingHao'
        },
        {
            cm: '身份证号',
            type: 'input',
            dm: 'sfzh'
        },
        {
            cm: '创建时间',
            type: 'double',
            dm: 'xfTime',
            children: [
                {
                    cm: '创建开始日期',
                    type: 'date',
                    dm: 'startTime'
                },
                {
                    cm: '创建结束日期',
                    type: 'date',
                    dm: 'endTime'
                }
            ]
        },
        // {
        //     cm: '责任区',
        //     type: 'select',
        //     dm: 'userType'
        // },
        {
            cm: '用户类型',
            type: 'select',
            dm: 'userType',
            must: true,
            optype: true
        },
    ],
    lb: [
        {
            cm: '身份证号(登录名)',
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
            cm: '状态',
            dm: 'valid'
        },
        // {
        //     cm: '责任区',
        //     dm: 'llcs'
        // },
        {
            cm: '创建人',
            dm: 'createUser'
        }
    ],
    lbBtn: [
        {
            "button_name": "密码重置",
            "button_type": "mmcz",
            "icon": "mmcz",
            "serial": "201",
        },
        {
            "button_name": "生成随机密码",
            "button_type": "scsjmm",
            "icon": "scsjmm",
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
// 【角色管理】
const jsgl = {
    lb: [
        {
            cm: '角色类型',
            dm: 'role_type_desc'
        },
        {
            cm: '角色名称',
            dm: 'role_name'
        },

        {
            cm: '创建单位',
            dm: 'create_unitid_desc'
        },
        {
            cm: '状态',
            dm: 'status_desc'
        }
    ],
    lbBtn: [
        {
            "button_name": "编辑",
            "button_type": "bj",
            "serial": "201",
        },
        {
            "button_name": "用户",
            "button_type": "yh",
            "serial": "201",
        },
        {
            "button_name": "停用",
            "button_type": "ty",
            "color_type": '1',
            "user_ctrl": '1',
            "serial": "201",
        },
        {
            "button_name": "启用",
            "button_type": "qy",
            "user_ctrl": '0',
            "serial": "201",
        }
    ],
    lbTab: [
        {
            "mc": '已启用',
            "dm": '1',
        },
        {
            "mc": '已停用',
            "dm": '0',
        }
    ],
    plBtn: [
        {
            "button_name": "导出",
            "py": "dc",
            "serial": "201",
            "type": "success",
            'button_type':2,
        },
    ],
    yhcx: [

        {
            cm: '所属单位',
            type: 'input',
            col: 24,
            dis: true,
            dm: 'bmmc',
        },
        {
            cm: '身份证号',
            type: 'input',
            col: 8,
            dm: 'loginName'
        },
        {
            cm: '用户名称',
            type: 'input',
            col: 8,
            dm: 'xm'
        },
        {
            cm: '警号',
            type: 'input',
            col: 8,
            dm: 'jinghao'
        }
    ],
    yhlbTab: [
        {
            "mc": '已添加',
            "dm": '1',
        },
        {
            "mc": '未添加',
            "dm": '0',
        }
    ],
    yhlb: [
        {
            cm: '姓名',
            dm: 'xm'
        },
        {
            cm: '警号',
            dm: 'jingHao'
        },
        {
            cm: '身份证号',
            dm: 'sfzh'
        },
        {
            cm: '部门编号',
            dm: 'bmbh'
        },
        {
            cm: '部门名称',
            dm: 'xtyhbmmc'
        },
        // {
        //     cm: '部门级别',
        //     dm: 'jb'
        // }
    ],
    yhlbBtn: [
        {
            "button_name": "添加",
            "button_type": "tj",
            "serial": "201",
            "user_ctrl": '0',
        },
        {
            "button_name": "删除",
            "button_type": "sc",
            "serial": "201",
            "user_ctrl": '1',
        }
    ],
}
// 【菜单管理】
const cdgl = {
    cd: [
        {
            cm: '当前名称',
            type: 'input',
            dm: 'menu_name'
        },
        {
            cm: '种类',
            type: 'select',
            dm: 'menu_type',
            optype: true
        },
        // {
        //     cm: '序号',
        //     type: 'input',
        //     dm: 'menu_order'
        // },
        {
            cm: 'URL',
            type: 'input',
            dm: 'menu_url'
        }
    ]
}
// 【模板管理】
const mbgl = {
    lb: [
        {
            cm: '模板名称',
            dm: 'template_name'
        },
        {
            cm: '单位级别',
            dm: 'grade'
        }
    ],
    plBtn: [
        {
            "button_name": "新建",
            "button_type": "xj",
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "删除",
            "button_type": "sc",
            "serial": "201",
            "type": "primary"
        }
    ]
}
// 【责任区管理】
const zrqgl = {
    cx: [
        {
            cm: '所属分局',
            type: 'select',
            must: true,
            dm: 'ssfj',
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'sspcs',
        },
        {
            cm: '责任区名称',
            type: 'input',
            dm: 'zrqMc'
        },
        {
            cm: '责任区代码',
            type: 'input',
            dm: 'zrqDm'
        },
        {
            cm: '状态',
            type: 'select',
            dm: 'zt',
            must: true,
            optype: true
        },
    ],
    lb: [
        {
            cm: '责任区编号',
            dm: 'zrqDm'
        },
        {
            cm: '责任区名称',
            dm: 'zrqMc'
        },
        {
            cm: '上级部门',
            dm: 'pcs_desc'
        },
        {
            cm: '是否有效',
            dm: 'sfyx_desc'
        }
    ],
    lbBtn: [
        {
            "button_name": "责任民警分配",
            "button_type": "glyh",
            // "icon": "mmcz",
            "serial": "201",
        },
        {
            "button_name": "编辑",
            "button_type": "bj",
            // "icon": "scsjmm",
            "serial": "201",
        }
    ],
    plBtn: [
        {
            "button_name": "导出",
            "py": "dc",
            "serial": "201",
            "type": "success",
            'button_type':2,
        },
    ],
    xj: [
        {
            cm: '所属分局',
            type: 'select',
            must: true,
            dm: 'ssfj',
        },
        {
            cm: '所属派出所',
            type: 'select',
            dm: 'sspcs',//必填
        },
        {
            cm: '责任区代码',
            type: 'input',
            dm: 'zrqDm', //必填
            dis:true
        },
        {
            cm: '责任区名称',
            type: 'input',
            dm: 'zrqMc'//必填
        }

    ],
    bj: [
        {
            cm: '责任区代码',
            type: 'input',
            dis: true,
            dm: 'zrqDm' //必填
        },
        {
            cm: '责任区名称',
            type: 'input',
            dm: 'zrqMc'//必填
        }

    ],
    yhcx: [
        {
            cm: '身份证号',
            type: 'input',
            col: 8,
            dm: 'sfzh'
        },
        {
            cm: '姓名',
            type: 'input',
            col: 8,
            dm: 'xm'
        },
        {
            cm: '警号',
            type: 'input',
            col: 8,
            dm: 'jinghao'
        },
        // {
        //     cm: '状态',
        //     type: 'select',
        //     col: 8,
        //     dm: 'sfyx',
        //     optype:true
        // },
    ],
    yhlb: [
        {
            cm: '姓名',
            dm: 'xm'
        },
        {
            cm: '警号',
            dm: 'jingHao'
        },
        {
            cm: '身份证号',
            dm: 'sfzh'
        },
        {
            cm: '部门名称',
            dm: 'xtyhbmmc'
        }
    ],
    yhlbTab: [
        {
            "mc": '已添加',
            "dm": '1',
        },
        {
            "mc": '未添加',
            "dm": '0',
        }
    ],
    yhlbBtn: [
        {
            "button_name": "添加",
            "button_type": "tj",
            "serial": "201",
            "user_ctrl": '0',
        },
        {
            "button_name": "删除",
            "button_type": "sc",
            "serial": "201",
            "user_ctrl": '1',
        }
    ],
}
// 获取单位列表
function getDeptTreeByBmbh() {
    return new Promise((resolve) => {
        api.post(
            api.aport1 + "/dept/getDeptTreeByBmbh",
            { bmbh: store.state.user.bmbh },
            // { bmbh: this.$store.state.user.bmbh },
            r => {
                resolve(r)
            }
        );

    })
}
// 获取功能列表
function getPermissionTree(deptBmbh) {
    return new Promise((resolve) => {
        api.post(
            api.aport1 + "/dept/getDeptPermissionTree",
            {
                userId: store.state.user.userId,
                userBmbh: store.state.user.bmbh,
                deptBmbh: deptBmbh
            },
            r => {
                resolve(r)
            }
        );
    })

}
// 获取功能列表
function getDeptTempPermTree(tempId) {
    return new Promise((resolve) => {
        api.post(
            api.aport1 + "/dept/getDeptTempPermTree",
            {
                userId: store.state.user.userId,
                userBmbh: store.state.user.bmbh,
                templateId: tempId
            },
            r => {
                resolve(r)
            }
        );
    })

}
// 获取模板列表
function getTemplate(deptBmbh, type) {
    return new Promise((resolve) => {
        api.post(
            api.aport1 + "/dept/getTemplate",
            {
                userId: store.state.user.userId,
                deptBmbh: deptBmbh,
                type: type
            },
            r => {
                resolve(r)
            }
        );
    })

}
// 获取角色权限列表树形结构
function getRolePermissionTree(roleId) {
    return new Promise((resolve) => {
        api.post(
            api.aport1 + "/role/getRolePermissionTree",
            {
                roleId: roleId,
            },
            r => {
                resolve(r)
            }
        );
    })
}
// 单位下的角色权限列表树形结构
function getDeptRolePermTree(deptBmbh, roleId) {
    return new Promise((resolve) => {
        api.post(
            api.aport1 + "/role/getDeptRolePermTree",
            {
                deptBmbh: deptBmbh,
                roleId: roleId,
                userId: store.state.user.userId
            },
            r => {
                resolve(r)
            }
        );
    })
}
function getSjBm(bmbh) {
    return new Promise((resolve) => {
        api.post(
            api.aport1 + "/dept/getSjBm",
            {
                bmbh: bmbh
            },
            r => {
                resolve(r)
            }
        );
    })
}
export default {
    yhgl,
    jsgl,
    cdgl,
    mbgl,
    zrqgl,
    getDeptTreeByBmbh,
    getPermissionTree,
    getDeptTempPermTree,
    getTemplate,
    getRolePermissionTree,
    getDeptRolePermTree,
    getSjBm
}