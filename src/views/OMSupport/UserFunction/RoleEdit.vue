<template>
  <div class="page-box page">
    <el-row type="flex">
      <el-col :span="24">
        <TreeCard
          cardTitle="功能列表"
          treeType="gnlb"
          :treeData="treeData1"
          :treeProps="treeProps1"
          :defaultChecked="defaultChecked1"
          nodeKey="serial"
          @getTree="getTree"
        ></TreeCard>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <el-button size="mini" type="primary" round @click="save">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";

export default {
  components: { TreeCard },
  props: {
    dialogType: {
      type: String,
      default: ""
    },
    dialogData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      treeData1: [],
      treeProps1: {
        label: "menu_name",
        children: "childrenMenu"
      },
      defaultChecked1: []
    };
  },
  mounted() {
    this.begin();
  },
  methods: {
    //获取角色权限列表树形结构
    getRolePermissionTree(roleId) {
      this.$cdata.qxgl.getRolePermissionTree(roleId).then(data => {
        this.treeData1 = data;
        this.$fnc
          .arrayIndex(data, "choose", "serial", "childrenMenu")
          .then(data => {
            this.defaultChecked1 = data;
          });
      });
    },
    getTree(data) {
      console.log(data);
    },
    save() {
      this.$emit("dialogSave", { type: this.dialogType });
    },
    cancel() {
      this.$emit("dialogCancel");
    },
    // 开始
    begin() {
      this.getRolePermissionTree(this.dialogData.serial);
    }
  }
};
</script>
<style scoped>
</style>