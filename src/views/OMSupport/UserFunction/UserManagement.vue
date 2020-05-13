<template>
  <div class="page">
    <Inquire :cxData="cxData" @cxFnc="cxFnc"></Inquire>
    <Table
      :lbData="lbData"
      :isSelect="isSelect"
      :isEdit="isEdit"
      :lbBtn="lbBtn"
      :plBtn="plBtn"
      :tableData="tableData"
      @pageSizeFnc="pageSizeFnc"
      @pageNumFnc="pageNumFnc"
    ></Table>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
export default {
  components: {
    Inquire,
    Table
  },
  mounted() {
    //console.log(this.$cdata.yhgl);
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
        pd: {},
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
  methods: {
    // 获取查询参数
    cxFnc(data) {
      console.log(data);
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
      this.$api.post("userController/queryUserInfo", this.cx, r => {
        this.tableData = r.resultList;
        console.log(r);
      });
    },
    // 批量操作
    plFnc() {},
    // 表格内操作
    blFnc() {}
  }
};
</script>