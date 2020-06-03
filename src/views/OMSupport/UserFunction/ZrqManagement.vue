<template>
  <div class="page">
    <Inquire :cxData="$cdata.qxgl.zrqgl.cx" :pd="cx.pd" @cxFnc="cxFnc" @lcFnc="lcFnc"></Inquire>
    <div class="page-box">
      <el-row :gutter="20">
        <el-col :span="24">
          <Table
            :lbData="$cdata.qxgl.zrqgl.lb"
            :isSelect="false"
            :isEdit="true"
            :lbBtn="$cdata.qxgl.zrqgl.lbBtn"
            :plBtn="$store.state.plBtn"
            :tableData="tableData"
            @rowClick="rowClick"
            @pageSizeFnc="pageSizeFnc"
            @pageNumFnc="pageNumFnc"
            @plFnc="plFnc"
            @blFnc="blFnc"
          ></Table>
        </el-col>
      </el-row>
    </div>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <ZrqUser
        v-if="dialogType=='glyh'&&isShowDialog"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
      ></ZrqUser>
      <Form
        v-if="(dialogType=='bj'||dialogType=='xj')&&isShowDialog"
        :cxData="labelData"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
        @formLcFnc="lcFnc"
      ></Form>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import Form from "@/components/Form.vue";
import ZrqUser from "./ZrqUser.vue";

export default {
  components: { Inquire, Table, Dialog, Form, ZrqUser },
  data() {
    return {
      cx: {
        pd: { zt: "1" },
        pageSize: 10,
        pageNum: 1,
        order: "serial",
        direction: 1
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      currentRow: {},
      // 弹窗数据,
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: []
    };
  },
  mounted() {
    this.dwxx();
  },
  methods: {
    // 单位信息
    dwxx() {
      this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(data => {
        this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "ssfj" });
        if (data.fj) {
          this.cx.pd.ssfj = data.fj;
          this.dialogData.ssfj = data.fj;
        } else if (data.pcs) {
          this.cx.pd.ssfj = data.fj;
          this.cx.pd.sspcs = data.pcs;
          this.dialogData.ssfj = data.fj;
          this.dialogData.sspcs = data.pcs;
        }
      });
    },
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
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
    // 查询列表
    getTable() {
      this.currentRow = {};
      this.$api.post(this.$api.aport1 + "/zrq/getZrq", this.cx, r => {
        // this.tableData = r.resultList;
        this.tableData = r;
      });
    },
    // 点击表格行
    rowClick(data) {
      this.currentRow = data.data;
    },
    lcFnc(data) {
      console.log("下拉选", data.data);
      if (data.key.dm == "ssfj") {
        if (data.data != "") {
          this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs" });
        } else {
          this.cx.pd.sspcs = "";
          this.dialogData.sspcs = "";
          this.$store.commit("getsspcs", []);
        }
      } else if (data.key.dm == "sspcs") {
        if (data.data) {
          this.getNewZrqDm(data.data).then(r => {
            this.dialogData.zrqDm = r;
          });
        } else {
          this.dialogData.zrqDm = "";
        }
      }
    },

    // 批量操作
    plFnc(data) {
      console.log("批量处理" + data.menu_name, data);
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      this.labelData = this.$cdata.qxgl.zrqgl[data.py];
      if (data.py == "xj") {
        this.dialogData = { zrqDm: "" };
        this.isShowDialog = true;
      } else if (data.py == "qy") {
        this.dialogData = this.currentRow;
        if (JSON.stringify(this.dialogData) == "{}") {
          this.$message({
            message: "请先选择责任区",
            type: "warning"
          });
          return false;
        }
        let qydata = {
          zrqDm: this.dialogData.zrqDm,
          zt: "1"
        };
        this.disEnableZrq(qydata);
      } else if (data.py == "ty") {
        this.dialogData = this.currentRow;
        if (JSON.stringify(this.dialogData) == "{}") {
          this.$message({
            message: "请先选择责任区",
            type: "warning"
          });
          return false;
        }

        let tydata = {
          zrqDm: this.dialogData.zrqDm,
          zt: "0"
        };
        this.$confirm("是否确认停用?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.disEnableZrq(tydata);
        });
      }
    },
    // 表格内操作
    blFnc(data) {
      console.log("表格按钮" + data.btn.button_name, data);
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if (data.btn.button_type == "glyh") {
        // this.labelData = this.$cdata.qxgl.yhgl.plmmcz;
        this.isShowDialog = true;
        this.dialogData = data.data;
      } else if (data.btn.button_type == "bj") {
        this.labelData = this.$cdata.qxgl.zrqgl[data.btn.button_type];
        this.isShowDialog = true;
        this.dialogData = data.data;
      }
    },
    dialogSave(data) {
      console.log(data);
      if (data.type == "xj") {
        this.addZrq(data.data);
      } else if (data.type == "bj") {
        this.editZrq(data.data);
      } else if (data.type == "glyh") {
        this.addZrqUser(data.data);
      }
    },
    getNewZrqDm(data) {
      return new Promise(resolve => {
        this.$api.post(
          this.$api.aport1 + "/zrq/getNewZrqDm",
          { pcsDm: data },
          r => {
            resolve(r.zrqDm);
          }
        );
      });
    },
    addZrq(data) {
      this.$api.post(this.$api.aport1 + "/zrq/addZrq", data, r => {
        this.$message({
          message: r,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    disEnableZrq(data) {
      this.$api.post(this.$api.aport1 + "/zrq/disEnableZrq", data, r => {
        this.$message({
          message: r,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    editZrq(data) {
      this.$api.post(this.$api.aport1 + "/zrq/editZrq", data, r => {
        this.$message({
          message: r,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    }
    // addZrqUser(data) {
    //   this.$api.post(this.$api.aport1 + "/zrq/addZrqUser", data, r => {
    //     this.$message({
    //       message: r,
    //       type: "success"
    //     });
    //     // this.getTable();
    //     // this.isShowDialog = false;
    //   });
    // }
  }
};
</script>