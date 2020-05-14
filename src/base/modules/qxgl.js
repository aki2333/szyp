import api from '@/api/index.js'
import store from '@/store'

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
// 【角色管理】
const jsgl = {
    lb: [
        {
            cm: '角色类型',
            dm: 'role_type'
        },
        {
            cm: '角色名称',
            dm: 'role_name'
        },
        {
            cm: '所属单位',
            dm: 'create_unitid'
        }
    ],
    lbBtn: [
        {
            "button_name": "编辑",
            "serial": "201",
        },
        {
            "button_name": "用户",
            "serial": "201",
        },
        {
            "button_name": "停用",
            "serial": "201",
        }
    ],
    plBtn: [
        {
            "button_name": "新建全局角色",
            "serial": "201",
            "type": "success"
        },
        {
            "button_name": "新建本地角色",
            "serial": "201",
            "type": "primary"
        }
    ]
}
// 获取单位列表
function getDeptTreeByBmbh() {
    return new Promise((resolve) => {
        api.post(
            "dept/getDeptTreeByBmbh",
            { bmbh: "320507000000" },
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
            "dept/getDeptPermissionTree",
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
// 获取模板列表
function getTemplate() {
    return new Promise((resolve) => {
        api.post(
            "dept/getTemplate",
            {
                userId: store.state.user.userId,
                bmbh: store.state.user.bmbh
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
    getDeptTreeByBmbh,
    getPermissionTree,
    getTemplate
}