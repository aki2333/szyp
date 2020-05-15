<template>
  <div class="page">
    <Inquire :cxData="cxData" @cxFnc="cxFnc"></Inquire>
    <div class="t-tab-top">
        <div class="tab-top-item hand" @click="clzt=1">
            <img :src="clzt==1?tabImgActive_1:tabImg_1" alt="">
            <span>未处理</span>
        </div>
        <div class="tab-top-item hand ml--33" @click="clzt=2">
            <img :src="clzt==2?tabImgActive_2:tabImg_2" alt="">
            <span class="t-leftT">已处理</span>
        </div>
    </div>
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
      tabImg_1:require('../../../assets/images/main/tab_2.png'),
      tabImgActive_1:require('../../../assets/images/main/tab_2_pre.png'),
      tabImg_2:require('../../../assets/images/main/tab_1.png'),
      tabImgActive_2:require('../../../assets/images/main/tab_1_pre.png'),
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
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      page:1,
      clzt:1,
    };
  },
  mounted(){
      this.$store.dispatch("aGetNation");
      this.$store.dispatch("aGetGender");
      this.$store.dispatch("aGetPassport");
      this.$store.dispatch("aGetSuboffice");
      this.$store.dispatch("aGetPolice");
      this.$store.dispatch("aGetDatatype");
      this.$store.dispatch("aGetBackstatus");
  },
  methods: {
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
      let pdAdd = {
          jb:this.$store.state.user.jb,
          bmbh:this.$store.state.user.bmbh,
          clzt:this.clzt,
          cljg:this.page
      }
      this.cx.pd = Object.assign({},this.cx.pd,pdAdd)
      this.$api.post(this.$api.root1+"/issueData/getIssueDataPage", this.cx, r => {
        this.tableData.list = r.list;
      });
    },
    //批量操作按钮  data==按钮名字
    plFnc(data) {
      console.log(data);
    },
    //列表tab切换  data==page 从1开始
    tabFnc(data) {
      this.page = data;
      this.getTable();
    }
  }
};
</script>
<style scoped>
</style>