<template>
  <div class="page">
    <Inquire :cxData="cxData" @cxFnc="cxFnc"></Inquire>
    <div class="page-box">
      <Table
        :lbData="lbData"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :isTab="isTab"
        :lbTab="lbTab"
        :tableData="tableData"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @tabFnc="tabFnc"
      ></Table>
    </div>
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
  data() {
    return {
      // 查询项

      //数据展示
      isTab: true,
      cxData: this.$cdata.zxhc.zxhc.cx,
      lbData: this.$cdata.zxhc.zxhc.lb,
      lbBtn: this.$cdata.zxhc.zxhc.lbBtn,
      plBtn: this.$cdata.zxhc.zxhc.plBtn,
      lbTab: this.$cdata.zxhc.zxhc.lbTab,
      //业务数据
      cx: {
        pd: {},
        pageSize: 10,
        pageNum: 1
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      page: 0
    };
  },
  methods: {
    cxFnc(data) {
      this.cx.pd = data;
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
      this.$api.post("", this.cx, r => {
        this.tableData = r.resultList;
      });
    },
    //批量操作按钮  data==按钮名字
    plFnc(data) {
      console.log(data);
    },
    //列表tab切换  data==page 从0开始
    tabFnc(data) {
      this.page = data;
    }
  }
};
</script>
<style scoped>
</style>