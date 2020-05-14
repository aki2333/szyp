<template>
  <div class="page-box">
    <el-row type="flex">
      <el-col :span="8">
        <TreeCard
          cardTitle="单位列表"
          :treeData="treeData1"
          :treeProps="treeProps1"
          nodeKey="bmbh"
          @getTree="getDeptBmbh"
        ></TreeCard>
      </el-col>
      <el-col :span="8">
        <TreeCard
          cardTitle="功能列表"
          :treeData="treeData2"
          :treeProps="treeProps2"
          :defaultChecked="defaultChecked2"
          nodeKey="serial"
          :isExpand="true"
        ></TreeCard>
      </el-col>
      <el-col :span="8">
        <TreeCard cardTitle="模板列表" :treeData="treeData3" :treeProps="treeProps3" nodeKey="serial"></TreeCard>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <el-button size="mini" type="primary" round @click="addPermissionToDept">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">清除</el-button>
    </div>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";

export default {
  components: { TreeCard },
  data() {
    return {
      treeData1: [],
      treeProps1: {
        label: "bmmc",
        children: "children"
      },
      defaultChecked1: [],
      treeData2: [],
      treeProps2: {
        label: "menu_name",
        children: "childrenMenu"
      },
      defaultChecked2: [],
      treeData3: [],
      treeProps3: {
        label: "template_name",
        children: "children"
      }
    };
  },
  mounted() {
    console.log(this.$store.state);
    this.cancel();
  },
  methods: {
    // 获取单位列表
    getDeptTreeByBmbh() {
      this.$api.post(
        "dept/getDeptTreeByBmbh",
        { bmbh: "320507000000" },
        // { bmbh: this.$store.state.user.bmbh },
        r => {
          this.treeData1 = r;
        }
      );
    },
    // 获取功能列表
    getPermissionTree(deptBmbh) {
      this.$api.post(
        "dept/getPermissionTree",
        {
          userId: this.$store.state.user.userId,
          userBmbh: this.$store.state.user.bmbh,
          deptBmbh: deptBmbh
        },
        r => {
          this.treeData2 = r;
          let arr = [...r];
          this.$fnc
            .arrayIndex(arr, "choose", "serial", "childrenMenu")
            .then(data => {
              this.defaultChecked2 = data;
            });
        }
      );
    },
    // 获取模板列表
    getTemplate() {
      this.$api.post(
        "dept/getTemplate",
        {
          userId: this.$store.state.user.userId,
          bmbh: this.$store.state.user.bmbh
        },
        r => {
          this.treeData3 = r;
        }
      );
    },
    // 获取部门编号
    getDeptBmbh(data) {
      this.getPermissionTree(data.bmbh);
    },
    // 部门赋权
    addPermissionToDept() {
      this.$api.post(
        "dept/addPermissionToDept",
        {
          userId: this.$store.state.user.userId,
          bmbhList: [],
          menuList: [],
          templateId: ""
        },
        r => {
          console.log(r);
        }
      );
    },
    // 清除
    cancel() {
      this.getDeptTreeByBmbh();
      this.getPermissionTree("");
      this.getTemplate();
    }
  }
};
</script>