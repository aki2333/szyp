<template>
  <div class="page-box page">
    <el-row type="flex">
      <el-col :span="8">
        <TreeCard
          cardTitle="单位列表"
          treeType="dwlb"
          :isCheckbox="false"
          :treeData="treeData1"
          :treeProps="treeProps1"
          nodeKey="bmbh"
          @getTree="getTree"
        ></TreeCard>
      </el-col>
      <el-col :span="16">
        <Table
          :lbData="lbData"
          :isSelect="isSelect"
          :isEdit="isEdit"
          :isPagination="false"
          :lbBtn="lbBtn"
          :plBtn="plBtn"
          :tableData="tableData"
          @blFnc="blFnc"
        ></Table>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <RoleEdit
        v-if="dialogType=='bj'&&isShowDialog"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
      ></RoleEdit>
    </Dialog>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import RoleEdit from "./RoleEdit.vue";

export default {
  components: { TreeCard, Table, Dialog, RoleEdit },
  data() {
    return {
      treeData1: [],
      treeProps1: {
        label: "bmmc",
        children: "children"
      },
      defaultChecked1: [],
      // 【展示数据】
      isSelect: false,
      isEdit: true,
      lbData: this.$cdata.qxgl.jsgl.lb,
      lbBtn: this.$cdata.qxgl.jsgl.lbBtn,
      plBtn: this.$cdata.qxgl.jsgl.plBtn,
      // 【业务数据】
      cx: {
        bmbh: "",
        quanJu: "true"
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      // 弹窗数据
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {}
    };
  },
  mounted() {
    this.begin();
  },
  methods: {
    // 获取单位列表
    getDeptTreeByBmbh() {
      this.$cdata.qxgl.getDeptTreeByBmbh().then(data => {
        this.treeData1 = data;
      });
    },
    // 获取角色列表
    getRole(bmbh) {
      this.cx.bmbh = bmbh;
      this.$api.post("role/getRole", this.cx, r => {
        this.tableData.list = r;
      });
    },
    getTree(data) {
      if (data.type == "dwlb") {
        this.getRole(data.data.bmbh);
      }
    },
    // 批量操作
    plFnc() {},
    // 表格内操作
    blFnc(data) {
      console.log("表内", data);
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.type;
      if (data.btn.type == "bj") {
        this.isShowDialog = true;
        this.dialogData = data.data;
      } else if (data.btn.type == "yh") {
        this.isShowDialog = true;
        this.dialogData = data.data;
      } else if (data.btn.type == "ty") {
        this.deleteRole(data.data);
      }
    },
    dialogSave(data) {
      console.log(data);
      if (data.type == "bj") {
        this.editRole(data.data);
      } else if (data.type == "yh") {
        this.getRoleUser(data.data);
      }
    },
    // 编辑
    editRole(data) {
      let p = data;
      p.roleId = "320508000000";
      p.userId = "";
      this.$api.post("role/editRole", p, r => {
        this.$message({
          message: r,
          type: "success"
        });
        this.isShowDialog = false;
      });
    },
    // 用户
    getRoleUser() {},
    // 停用
    deleteRole() {},
    handleSave() {},
    // 开始
    begin() {
      this.getDeptTreeByBmbh();
    }
  }
};
</script>
<style scoped>
</style>