<template>
  <div class="page-box">
    <el-row>
      <el-col :span="8">
        <TreeCard cardTitle="单位列表" :treeProps="treeProps1" nodeKey="bmbh"></TreeCard>
      </el-col>
      <el-col :span="8">
        <TreeCard cardTitle="功能列表" :treeProps="treeProps1" nodeKey="bmbh"></TreeCard>
      </el-col>
      <el-col :span="8">
        <TreeCard cardTitle="模板列表" :treeProps="treeProps1" nodeKey="bmbh"></TreeCard>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <el-button size="mini" type="primary" round>保存</el-button>
      <el-button size="mini" type="info" round>清除</el-button>
    </div>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";

export default {
  components: { TreeCard },
  data() {
    return {
      treeProps1: {
        label: "bmmc",
        children: "children"
      }
    };
  },
  mounted() {
    console.log(this.$store.state);
    this.getDeptTreeByBmbh();
    this.getTemplate();
  },
  methods: {
    // 获取单位列表
    getDeptTreeByBmbh() {
      this.$api.post(
        "dept/getDeptTreeByBmbh",
        { bmbh: this.$store.state.user.bmbh },
        r => {
          console.log(r);
        }
      );
    },
    // 获取功能列表
    getPermissionTree() {
      this.$api.post(
        "dept/getPermissionTree",
        {
          userId: this.$store.state.user.userId,
          userBmbh: this.$store.state.user.bmbh,
          deptBmbh: ""
        },
        r => {
          console.log(r);
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
          console.log(r);
        }
      );
    },
    // 部门赋权
    addPermissionToDept() {
      this.$api.post(
        "dept/addPermissionToDept",
        { bmbh: this.$store.state.user.bmbh },
        r => {
          console.log(r);
        }
      );
    }
  }
};
</script>