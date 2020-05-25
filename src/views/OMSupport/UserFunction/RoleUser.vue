<template>
  <div>
    <div class="tc-cx">
      <Inquire :cxData="$cdata.qxgl.jsgl.yhcx" :pd="cx.pd" @cxFnc="cxFnc"></Inquire>
    </div>
    <el-row type="flex">
      <el-col :span="24">
        <Table
          :lbData="$cdata.qxgl.jsgl.yhlb"
          :isSelect="false"
          :isPl="false"
          :lbBtn="$cdata.qxgl.jsgl.yhlbBtn"
          :isTab="true"
          :lbTab="$cdata.qxgl.jsgl.yhlbTab"
          @blFnc="blFnc"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @tabFnc="tabFnc"
          :tableData="tableData"
        ></Table>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <!-- <el-button size="mini" type="primary" round @click="save">保存</el-button> -->
      <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";
import Inquire from "@/components/Inquire.vue";

export default {
  components: { Inquire, Table },
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
      // 【业务数据】
      cx: {
        pd: {
          status: "1",
          quanJu: "true",
          roleType: this.dialogData.role_type,
          roleId: this.dialogData.serial,
          xm: "",
          loginName: "",
          jinghao: "",
          bmbh: this.dialogData.bmbh,
          bmmc: this.dialogData.bmmc
        },
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
      }
    };
  },
  mounted() {
    console.log("角色用户", this.dialogType, this.dialogData);
    this.begin();
  },
  methods: {
    cxFnc(data) {
      console.log(data);
      this.cx.pd = data;
      this.getTable();
    },
    // 查询用户列表
    getTable() {
      console.log("查询用户列表-", this.cx);
      this.$api.post(this.$api.aport1+"/role/getRoleUser", this.cx, r => {
        this.tableData = r;
        this.tableData.list.forEach(item => {
          item.status = this.cx.pd.status;
        });
        console.log(this.tableData);
      });
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
    // 表格内操作
    blFnc(data) {
      console.log("点击表格按钮-", data);
      // data.btn按钮信息
      // data.data行内信息
      if (data.btn.button_type == "tj") {
        let _data = {
          roleId: this.dialogData.serial,
          userId: [data.data.wybs],
          loginUserId: this.$store.state.user.userId
        };
        this.addRoleUser(_data);
      } else {
        let _data = {
          roleId: this.dialogData.serial,
          userId: [data.data.wybs],
          loginUserId: this.$store.state.user.userId
        };
        this.delRoleUser(_data);
      }
    },
    // 添加
    addRoleUser(data) {
      this.$api.post(this.$api.aport1+"/role/addRoleUser", data, r => {
        this.$message({
          message: r,
          type: "success"
        });
        this.getTable();
      });
    },
    // 删除
    delRoleUser(data) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$api.post(this.$api.aport1+"/role/delRoleUser", data, r => {
          this.$message({
            message: r,
            type: "success"
          });
          this.getTable();
        });
      });
    },
    tabFnc(data) {
      console.log("tab切换", data);
      this.cx.pd.status = data;
      this.cx.pageNum = 1;
      this.getTable();
    },
    cancel() {
      this.$emit("dialogCancel");
    },
    // 开始
    begin() {
      this.getTable();
      //this.$store.dispatch("aGetBmbh", { bmbh: this.$store.state.user.bmbh });
    }
  }
};
</script>
<style scoped>
</style>