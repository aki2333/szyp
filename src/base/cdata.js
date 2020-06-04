import qxgl from './modules/qxgl.js'
import zxhc from './modules/zxhc.js'
import lzsb from './modules/lzsb.js'

// 【菜单】
const menu = [

    {
        "menu_name": "业务管理",
        "menu_url": "ywgl",
        "menu_icon": "ywgl_1",
        "serial": "0002",
        "childrenMenu": [
            {
                "menu_name": "业务管理",
                "menu_icon": "yhgngl",
                "menu_url": "ywglgn",
                "parent_id": "0001",
                "serial": "000101",
                "childrenMenu": [
                    {
                        "menu_name": "核查走访管理",
                        "menu_url": "Specialcheck",
                        "parent_id": "000101",
                        "serial": "1645e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": []
                    }
                ]
            }
        ]
    },
    {
        "menu_name": "运维支撑",
        "menu_url": "ywzc",
        "menu_icon": "ywzc_1",
        "serial": "0004",
        "childrenMenu": [
            {
                "menu_name": "权限管理",
                "menu_icon": "yhgngl",
                "menu_url": "yhgngl",
                "parent_id": "0001",
                "serial": "000101",
                "childrenMenu": [
                    {
                        "menu_name": "用户管理",
                        "menu_url": "UserManagement",
                        "parent_id": "000101",
                        "serial": "1645e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": []
                    },
                    {
                        "menu_name": "角色管理",
                        "menu_url": "RoleManagement",
                        "parent_id": "000101",
                        "serial": "1745e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "单位管理",
                        "menu_url": "UnitManagement",
                        "parent_id": "000101",
                        "serial": "1845e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "模板管理",
                        "menu_url": "TemplateManagement",
                        "parent_id": "000101",
                        "serial": "1945e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "菜单管理",
                        "menu_url": "MenuManagement",
                        "parent_id": "000101",
                        "serial": "1945e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    }
                ]
            }
        ]
    }
]
// 【下拉选项】
const options = {
    bmbh: [
        {
            dm: "dw1",
            mc: "单位一"
        }
    ],
    status: [
        {
            dm: 'true',
            mc: "已添加"
        },
        {
            dm: 'false',
            mc: "未添加"
        }
    ],
    zt: [
        {
            dm: '1',
            mc: "有效"
        },
        {
            dm: '0',
            mc: "无效"
        }
    ],
    sbzt: [
        {
            dm: '0',
            mc: "待上报"
        },
        {
            dm: '1',
            mc: "上报成功"
        },
        {
            dm: '2',
            mc: "上报失败"
        }
    ],
    userType: [
        {
            dm: '0',
            mc: "系统用户"
        },
        {
            dm: '1',
            mc: "外部用户"
        }
    ],
    button_type: [
        {
            dm: '1',
            mc: '系统按钮'
        },
        {
            dm: '2',
            mc: '表格按钮'
        },
        {
            dm: '3',
            mc: '操作按钮'
        }
    ],
    menu_type: [
        {
            dm: 'P',
            mc: "菜单"
        },
        {
            dm: 'B',
            mc: "按钮"
        }
    ]
}
export default {
    menu,
    options,
    qxgl,
    zxhc,
    lzsb
}