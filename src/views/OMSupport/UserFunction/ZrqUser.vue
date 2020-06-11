<template>
  <div>
    <div class="tc-cx">
      <Inquire cxType="noCbtn" :cxData="$cdata.qxgl.zrqgl.yhcx" :pd="cx.pd" @cxFnc="cxFnc"></Inquire>
    </div>
    <el-row type="flex">
      <el-col :span="24">
        <Table
          :lbData="$cdata.qxgl.zrqgl.yhlb"
          :isSelect="true"
          :isPl="false"
          :isTab="false"
          :isEdit="false"
          :selection="zrqDmList"
          @SelectionChange="addZrqUser"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          :tableData="tableData"
        ></Table>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <el-button size="mini" type="primary" round @click="save">保存</el-button>
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
          pcsDm: this.dialogData.pcs,
          zrqDm: this.dialogData.zrqDm,
          xm: "",
          sfzh: "",
          jinghao: ""
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
      },
      zrqDmList: [],
      checkedUser: []
    };
  },
  mounted() {
    console.log("角色用户", this.dialogType, this.dialogData);
    this.begin();
  },
  methods: {
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable();
    },
    // 查询用户列表
    getTable() {
      console.log("查询列表-", this.cx);
      this.$api.post(this.$api.aport1 + "/zrq/getZrqUser", this.cx, r => {
        this.tableData = r.pageInfo;
        let zrqDmList = [];
        this.tableData.list.forEach(item1 => {
          r.zrqDmList.forEach(item2 => {
            if (item2 == item1.wybs) {
              zrqDmList.push(item1);
            }
          });
        });
        this.zrqDmList = zrqDmList;
        console.log("zrqDmList", zrqDmList);
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
    addZrqUser(data) {
      console.log("已选中", data);
      this.checkedUser = [];
      let arr = [...data];
      arr.forEach(item => {
        this.checkedUser.push(item.wybs);
      });
    },
    save() {
      // console.log("arr", this.checkedUser);
      let p = {
        userId: this.$store.state.user.userId,
        zrqDm: this.dialogData.zrqDm,
        wybs: this.checkedUser
      };
      this.$api.post(this.$api.aport1 + "/zrq/addZrqUser", p, r => {
        this.$message({
          message: r,
          type: "success"
        });
      });
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