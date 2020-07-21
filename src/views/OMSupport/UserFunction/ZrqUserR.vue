<template>
  <div>
    <div class="tc-cx">
      <Inquire cxType="noCbtn" :cxData="$cdata.qxgl.zrqgl.yhcx" :pd="cx.pd" :cxPara="cx" @cxFnc="cxFnc"></Inquire>
    </div>
    <el-row type="flex" class="page-inner-box">
      <el-col :span="24">
        <Table
          :lbData="$cdata.qxgl.zrqgl.yhlb"
          :isSelect="false"
          :lbBtn="$cdata.qxgl.zrqgl.yhlbBtn"
          :plBtn="$cdata.qxgl.zrqgl.plBtn"
          :isTab="true"
          :page="tabPage"
          :lbTab="$cdata.qxgl.zrqgl.yhlbTab"
          :clearSort="clearSort"
          :expData="cx"
          :expUrl="$api.aport1+'/zrq/exportZrqMj'"
          @blFnc="blFnc"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @tabFnc="tabFnc"
          @sortChange="sortChange"
          :tableData="tableData"
        ></Table>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <!-- <el-button size="mini" type="primary" round @click="save">保存</el-button> -->
      <el-button size="mini" type="info" round @click="cancel">关闭</el-button>
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
          pcsDm: this.dialogData.pcs,
          zrqDm: this.dialogData.zrqDm,
          xm: "",
          sfzh: "",
          jinghao: ""
        },
        pageSize: 10,
        pageNum: 1,
      },
      tabPage: "",
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      clearSort:0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.begin();
    })
  },
  methods: {
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction;
      this.getTable();
    },
    // 查询用户列表
    getTable(flag) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.$api.post(this.$api.aport1 + "/zrq/getZrqUser", this.cx, r => {
        this.tableData = r;
        this.tableData.list.forEach(item => {
          item.status = this.cx.pd.status;
        });
      });
    },
    
    // 表格内操作
    blFnc(data) {
      // data.btn按钮信息
      // data.data行内信息
      if (data.btn.button_type == "tj") {
        let _data = {
          userId: this.$store.state.user.userId,
          zrqDm: this.dialogData.zrqDm,
          wybs: [data.data.wybs],
        };
        this.addRoleUser(_data);
      } else {
        let _data = {
          userId: this.$store.state.user.userId,
          zrqDm: this.dialogData.zrqDm,
          wybs: data.data.wybs,
        };
        this.delRoleUser(_data);
      }
    },
    // 添加
    addRoleUser(data) {
      this.$api.post(this.$api.aport1 + "/zrq/addZrqUser", data, r => {
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
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
        this.$api.post(this.$api.aport1 + "/zrq/delZrqUser", data, r => {
          this.$message({
            message: r,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.getTable();
        });
      });
    },
    tabFnc(data) {
      console.log("tab切换", data);
      this.cx.pd.status = data;
      this.tabPage = data;
      this.cx.pageNum = 1;
      this.cx.pageSize = 10;
      this.getTable(true);
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
    cancel() {
      this.$emit("dialogCancel");
    },
    // 开始
    begin() {
     this.getTable();
    }
  }
};
</script>
<style scoped>
</style>