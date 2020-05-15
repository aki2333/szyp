<template>
  <div class="page-box page">
    <el-row type="flex">
      <el-col :span="8">
        <TreeCard
          cardTitle="功能列表"
          treeType="gnlb"
          :treeData="treeData1"
          :treeProps="treeProps1"
          nodeKey="serial"
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
    <div class="page-btn-box">
      <el-button size="mini" type="primary" round @click="save">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";
import Table from "@/components/Table.vue";

export default {
  components: { TreeCard, Table },
  props: {
    cxType: {
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
      dialogTitle: ""
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
      });
    },
    // 过去角色列表
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
    blFnc() {
      // this.dialogTitle = data.btn.button_name;
      // if (data.btn.type == "bj") {
      //   this.isShowDialog = true;
      //   this.editRole(data.data);
      // } else if (data.btn.type == "yh") {
      //   this.isShowDialog = true;
      //   this.getRoleUser(data.data);
      // } else if (data.btn.type == "ty") {
      //   this.deleteRole(data.data);
      // }
    },
    save() {},
    cancel() {},
    // 开始
    begin() {
      this.getRolePermissionTree(this.dialogData.serial);
    }
  }
};
</script>
<style scoped>
</style>