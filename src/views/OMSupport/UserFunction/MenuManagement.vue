<template>
  <div class="page-box page">
    <el-row type="flex">
      <el-col :span="8">
        <TreeCard
          cardTitle="功能列表"
          treeType="gnlb"
          :treeData="treeData2"
          :treeProps="treeProps2"
          :defaultChecked="defaultChecked2"
          nodeKey="serial"
          :isExpand="true"
          :isCheckbox="false"
          @getTree="getTree"
          @getCheckedNodes="getCheckedNodes"
        ></TreeCard>
      </el-col>
      <el-col :span="16">
        <div class="form-box">
          <Form
            v-if="formType"
            :cxData="labelData"
            :dialogType="formType"
            :dialogData="formData"
            @dialogSave="formSave"
          ></Form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";
import Form from "@/components/Form.vue";

export default {
  components: { TreeCard, Form },
  data() {
    return {
      treeData2: [],
      treeProps2: {
        label: "menu_name",
        children: "childrenMenu"
      },
      defaultChecked2: [],
      menuList: [],
      buttonList: [],
      labelData: this.$cdata.qxgl.cdgl.cd,
      formData: {},
      formType: ""
    };
  },
  mounted() {
    this.cancel();
  },
  methods: {
    // 获取功能列表
    getMenuTree() {
      this.$api.post("menuController/getMenuTree", {}, r => {
        this.treeData2 = r;
        // this.defaultChecked2 = r.choose;
      });
    },
    getTree(data) {
      console.log("点击树节点-", data);
      this.formType = data.type;
      this.formData = data.data;
      // if (data.data.menu_type == "P") {
      //   // this.formData.
      // }
    },
    getCheckedKeys(data) {
      if (data.type == "dwlb") {
        this.bmbhList = data.data;
      }
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
    // 部门赋权
    addPermissionToDept() {
      this.$api.post(
        "dept/addPermissionToDept",
        {
          userId: this.$store.state.user.userId,
          bmbhList: this.bmbhList,
          menuList: this.menuList,
          buttonList: this.buttonList,
          templateId: this.templateId
        },
        r => {
          this.$message({
            message: r,
            type: "success"
          });
        }
      );
    },
    formSave() {},
    // 清除
    cancel() {
      this.getMenuTree();
      this.bmbhList = [];
      this.menuList = [];
    }
  }
};
</script>
<style scoped>
.form-box {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>