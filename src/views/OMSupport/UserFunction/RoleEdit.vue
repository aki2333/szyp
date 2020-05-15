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
          @getCheckedNodes="getCheckedNodes"
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
      defaultChecked1: [],
      buttonList: [],
      menuList: []
    };
  },
  mounted() {
    console.log("编辑", this.dialogType, this.dialogData);
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
    getCheckedNodes(data) {
      if (data.type == "gnlb") {
        console.log("gnlb", data);
        this.buttonList = [];
        this.menuList = [];
        let arr = [...data.data];

        arr.forEach(item => {
          if (item.menu_type == "B") {
            this.buttonList.push(item.serial);
          } else {
            this.menuList.push(item.serial);
          }
        });
      }
    },
    save() {
      this.$emit("dialogSave", {
        type: this.dialogType,
        data: { buttonList: this.buttonList, menuList: this.menuList }
      });
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