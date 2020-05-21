<template>
  <div class="page">
    <Inquire :cxData="cxData" :pd="cx.pd" @cxFnc="cxFnc" @getFirstPd="getFirstPd"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand">
        <img src="../../../assets/images/main/tab_2_pre.png" alt />
        <span>用户管理</span>
      </div>
    </div>
    <div class="page-box">
      <el-row :gutter="20">
        <el-col :span="24">
          <Table
            lbType="yhtb"
            :lbData="lbData"
            :isSelect="isSelect"
            :isEdit="isEdit"
            :lbBtn="lbBtn"
            :plBtn="plBtn"
            :disPlBtn="disPlBtn"
            :tableData="tableData"
            @pageSizeFnc="pageSizeFnc"
            @pageNumFnc="pageNumFnc"
            @rowClick="rowClick"
            @plFnc="plFnc"
            @blFnc="blFnc"
          ></Table>
        </el-col>
        <el-col :span="8" v-if="dwtbShow">
          <Table
            lbType="dwtb"
            :lbData="$cdata.qxgl.yhgl.dwtb"
            :isSelect="false"
            :isPl="false"
            :isEdit="false"
            :tableData="tableData2"
            :isPagination="false"
            @rowClick="rowClick"
          ></Table>
        </el-col>
        <el-col :span="10" v-if="jstbShow">
          <Table
            lbType="jstb"
            :isSelect="true"
            :lbData="$cdata.qxgl.jsgl.lb"
            :isPl="false"
            :isEdit="false"
            refName="jstb"
            :lbBtn="$cdata.qxgl.jsgl.lbBtn"
            :tableData="tableData3"
            :isPagination="false"
            :selection="selection"
            @rowClick="rowClick"
            @userRole="userRole"
          ></Table>
        </el-col>
        <el-col :span="6" v-if="gnlbShow">
          <TreeCard
            :isCheckbox="false"
            treeType="gnlb"
            :treeData="treeData1"
            :treeProps="treeProps1"
            :defaultChecked="defaultChecked1"
            nodeKey="serial"
            @getTree="getTree"
          ></TreeCard>
        </el-col>
      </el-row>
      <div class="page-btn-box" v-if="jstbShow">
        <el-button size="mini" type="primary" round @click="saveUserRoleInfo">保存</el-button>
      </div>
    </div>

    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Form
        v-if="isShowDialog"
        :cxData="labelData"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
      ></Form>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Dialog from "@/components/Dialog.vue";
import Table from "@/components/Table.vue";
import TreeCard from "@/components/TreeCard.vue";
import Form from "@/components/Form.vue";
export default {
  components: {
    Inquire,
    Table,
    Dialog,
    Form,
    TreeCard
  },

  data() {
    return {
      // 【展示数据】
      isSelect: false,
      isEdit: true,
      cxData: this.$cdata.qxgl.yhgl.cx,
      lbData: this.$cdata.qxgl.yhgl.lb,
      lbBtn: this.$cdata.qxgl.yhgl.lbBtn,
      plBtn: this.$cdata.qxgl.yhgl.plBtn,
      // 【业务数据】
      cx: {
        pd: { userType: "0" },
        pageSize: 10,
        pageNum: 1,
        order: "serial",
        direction: 1
      },
      disPlBtn: false,
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      selection: [],
      tableData2: { list: [] },
      tableData3: { list: [] },
      treeData1: [],
      treeProps1: {
        label: "menu_name",
        children: "childrenMenu"
      },
      defaultChecked1: [],
      // 弹窗数据,
      currentRow: {},
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
      userRoleData: [],
      dwtbShow: false,
      jstbShow: false,
      gnlbShow: false
    };
  },
  mounted() {
    this.getTable();
    this.$store.dispatch("aGetBmbh", { bmbh: this.$store.state.user.bmbh });
  },

  methods: {
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      console.log("用户类型", data);
      // this.disPlBtn = data.userType == 0 ? true : false;
      this.getTable();
    },
    // 获取分页等信息
    pageSizeFnc(data) {
      this.cx.pageSize = data;
      this.getTable();
    },
    pageNumFnc(data) {
      this.cx.pageNum = data;
      this.getTable();
    },
    // 查询用户列表
    getTable() {
      console.log(this.cx);
      this.$api.post("userController/queryUserInfo", this.cx, r => {
        this.tableData = r.resultList;
        this.tableData2 = { list: [] };
        this.tableData3 = { list: [] };
        this.dwtbShow = false;
        this.jstbShow = false;
        this.gnlbShow = false;
      });
    },
    // 查询用户单位列表
    queryUserDept(bmbh) {
      this.$api.post("userController/queryUserDept", { bmbh: bmbh }, r => {
        this.tableData2.list = r.deptList;
        this.dwtbShow = true;
        this.jstbShow = false;
        this.gnlbShow = false;
      });
    },
    // 获取角色列表
    getRole(bmbh) {
      this.$api.post(
        "role/getRole",
        { bmbh: bmbh, quanJu: "true", userId: this.currentRow.userId },
        r => {
          this.tableData3.list = r;
          this.jstbShow = true;
          this.gnlbShow = false;
          let arr = [...r];
          this.selection = [];
          arr.forEach(item => {
            if (item.ischeck) {
              this.selection.push(item);
            }
          });
        }
      );
    },

    //获取角色权限列表树形结构
    getRolePermissionTree(roleId) {
      this.$cdata.qxgl.getRolePermissionTree(roleId).then(data => {
        this.treeData1 = data;
        this.gnlbShow = true;
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
    // 点击表格行
    rowClick(data) {
      if (data.type == "yhtb") {
        this.queryUserDept(data.data.bmbh);
        this.currentRow = data.data;
      } else if (data.type == "dwtb") {
        this.getRole(data.data.xtyhbmbh);
      } else if (data.type == "jstb") {
        this.getRolePermissionTree(data.data.serial);
      }
    },
    // 批量操作
    plFnc(data) {
      console.log("批量处理", data);
      this.dialogTitle = data.button_name;
      this.dialogType = data.button_type;
      this.labelData = this.$cdata.qxgl.yhgl[data.button_type];
      if (data.button_type == "xj") {
        this.dialogData = {};
        this.isShowDialog = true;
      } else if (data.button_type == "xg") {
        this.dialogData = this.currentRow;
        console.log(this.dialogData);
        if (JSON.stringify(this.dialogData) == "{}") {
          this.$message({
            message: "请先选择用户",
            type: "warning"
          });
          return false;
        } else if (this.dialogData.userType == "系统用户") {
          this.$message({
            message: "该用户为系统用户，不可修改",
            type: "warning"
          });
          return false;
        }
        this.isShowDialog = true;
        // this.dialogData = data.data;
      } else if (data.button_type == "sc") {
        this.dialogData = this.currentRow;

        if (JSON.stringify(this.dialogData) == "{}") {
          this.$message({
            message: "请先选择用户",
            type: "warning"
          });
          return false;
        } else if (this.dialogData.userType == "系统用户") {
          this.$message({
            message: "该用户为系统用户，不可修改",
            type: "warning"
          });
          return false;
        }
        this.delUser(this.dialogData);
      } else if (data.button_type == "plmmcz") {
        this.isShowDialog = true;
      } else if (data.button_type == "plscsjmm") {
        this.batchRandomPassword();
      }
    },
    // 表格内操作
    blFnc(data) {
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if (data.btn.button_type == "mmcz") {
        this.labelData = this.$cdata.qxgl.yhgl.plmmcz;
        this.isShowDialog = true;
        this.dialogData = data.data;
      } else if (data.btn.button_type == "scsjmm") {
        // this.isShowDialog = true;
        // this.dialogData = data.data;
        this.batchRandomPassword(data.data);
      }
    },
    dialogSave(data) {
      console.log(data);
      if (data.type == "xj") {
        this.saveUser(data.data);
      } else if (data.type == "xg") {
        this.updateOtherUserInfo(data.data);
      } else if (data.type == "plmmcz") {
        this.batchUpdateUserPassword(data.data);
      } else if (data.type == "mmcz") {
        this.batchUpdateUserPassword(data.data, this.currentRow);
      }
    },
    // 新增用户
    saveUser(data) {
      let p = data;
      p.userType = "1";
      console.log(data);
      this.$api.post("userController/saveUser", p, r => {
        this.$message({
          message: r.message,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    // 修改用户
    updateOtherUserInfo(data) {
      this.$api.post("userController/updateOtherUserInfo", data, r => {
        this.$message({
          message: r.message,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    // 删除用户
    delUser(data) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let p = {
          userId: data.userId,
          status: "0"
        };
        this.$api.post("userController/updateOtherUserInfo", p, () => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getTable();
        });
      });
    },
    // 重置密码
    batchUpdateUserPassword(data, rowData) {
      console.log("重置密码", data, rowData);
      let p = data;
      p.userType = this.cx.pd.userType;
      p.list = rowData ? [{ serial: rowData.userId }] : [];
      this.$api.post("userController/batchUpdateUserPassword", p, r => {
        this.$message({
          message: r.message,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    // 生成随机密码
    batchRandomPassword(rowData) {
      this.$confirm("是否确认生成随机密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let p = {};
        p.userType = this.cx.pd.userType;
        p.list = rowData ? [{ serial: rowData.userId }] : [];
        this.$api.post("userController/batchRandomPassword", p, r => {
          this.$message({
            message: r.message,
            type: "success"
          });
          this.getTable();
          this.isShowDialog = false;
        });
      });
    },
    userRole(data) {
      this.userRoleData = data;
    },
    // 用户关联角色添加取消
    saveUserRoleInfo() {
      let p = {
        list: this.userRoleData,
        userId: this.currentRow.userId
      };
      this.$api.post("userRoleController/saveUserRoleInfo", p, r => {
        this.$message({
          message: r.message,
          type: "success"
        });
        this.getTable();
        // this.isShowDialog = false;
      });
    },
    getFirstPd(data) {
      this.cx.pd = data;
      console.log("fiff", data, this.cx);
    },
    begin() {
      this.getTable();
      this.tableData2 = { list: [] };
      this.tableData3 = { list: [] };
      this.treeData1 = [];
    }
  }
};
</script>