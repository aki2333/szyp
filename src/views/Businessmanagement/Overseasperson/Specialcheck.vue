<template>
  <div class="page">
    <Inquire :cxData="cxData" @cxFnc="cxFnc"></Inquire>
    <Table
      :lbData="lbData"
      :lbBtn="lbBtn"
      :plBtn="plBtn"
      :isTab="isTab"
      :tableData="tableData"
      @plFnc="plFnc"
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
  data() {
      return{
        // 查询项
        
        //数据展示
        isTab:true,
        cxData:this.$cdata.zxhc.zxhc.cx,
        lbData:this.$cdata.zxhc.zxhc.lb,
        lbBtn:this.$cdata.zxhc.zxhc.lbBtn,
        plBtn:this.$cdata.zxhc.zxhc.plBtn,
        //业务数据
        cx:{
            pd:{},
            pageSize:10,
            pageNum:1,
        },
        tableData: {
            list: [],
            total: 0,
            pageSize: 10,
            pageNum: 1
        }
      }
  },
  methods:{
    cxFnc(data){
        this.cx.pd=data;
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
    plFnc(data){
        console.log(data);
    },
  }
};
</script>
<style scoped>
</style>