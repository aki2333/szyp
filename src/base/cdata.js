import qxgl from './modules/qxgl.js'
// 【菜单】
const menu = [
    {
        "menu_name": "基础信息采集",
        "menu_url": "jcxxcj",
        "menu_icon": "jcxxcj_1",
        "serial": "0001",
        "childrenMenu": [
            {
                "menu_name": "用户功能管理",
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
                        "menu_url": "jsgl",
                        "parent_id": "000101",
                        "serial": "1745e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "单位管理",
                        "menu_url": "dwgl",
                        "parent_id": "000101",
                        "serial": "1845e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "模板管理",
                        "menu_url": "mbgl",
                        "parent_id": "000101",
                        "serial": "1945e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    }
                ]
            }
        ]
    },
    {
        "menu_name": "业务管理",
        "menu_url": "ywgl",
        "menu_icon": "ywgl_1",
        "serial": "0002",
        "childrenMenu": [
            {
                "menu_name": "用户功能管理",
                "menu_icon": "yhgngl",
                "menu_url": "yhgngl",
                "parent_id": "0001",
                "serial": "000101",
                "childrenMenu": [
                    {
                        "menu_name": "用户管理",
                        "menu_url": "yhgl",
                        "parent_id": "000101",
                        "serial": "1645e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": []
                    },
                    {
                        "menu_name": "角色管理",
                        "menu_url": "jsgl",
                        "parent_id": "000101",
                        "serial": "1745e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "单位管理",
                        "menu_url": "dwgl",
                        "parent_id": "000101",
                        "serial": "1845e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "模板管理",
                        "menu_url": "mbgl",
                        "parent_id": "000101",
                        "serial": "1945e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    }
                ]
            }
        ]
    },
    {
        "menu_name": "分析研判",
        "menu_url": "fxyp",
        "menu_icon": "fxyp_1",
        "serial": "0003",
        "childrenMenu": [
            {
                "menu_name": "用户功能管理",
                "menu_icon": "yhgngl",
                "menu_url": "yhgngl",
                "parent_id": "0001",
                "serial": "000101",
                "childrenMenu": [
                    {
                        "menu_name": "用户管理",
                        "menu_url": "yhgl",
                        "parent_id": "000101",
                        "serial": "1645e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": []
                    },
                    {
                        "menu_name": "角色管理",
                        "menu_url": "jsgl",
                        "parent_id": "000101",
                        "serial": "1745e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "单位管理",
                        "menu_url": "dwgl",
                        "parent_id": "000101",
                        "serial": "1845e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
                    },
                    {
                        "menu_name": "模板管理",
                        "menu_url": "mbgl",
                        "parent_id": "000101",
                        "serial": "1945e567-c09c-4ce0-8814-f9b1510df5fc",
                        "childrenMenuButton": [],
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
                "menu_name": "用户功能管理",
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
                        "menu_url": "jsgl",
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
                        "menu_url": "mbgl",
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
            value: "dw1",
            label: "单位一"
        }
    ],
    userType: [
        {
            value: '0',
            label: "系统用户"
        },
        {
            value: '1',
            label: "其他用户"
        }
    ]
}


export default {
    menu,
    options,
    qxgl
}