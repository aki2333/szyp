<template>
  <div>
    <el-row type="flex" class="page-inner-box">
      <el-col :span="24">
        <Table
          :lbData="$cdata.czxx.xxwhgl.lb"
          :isSelect="false"
          :lbBtn="this.$cdata.czxx.bhqs.lbBtn"
          :isTab="false"
          :tableData="tableData"
          :clearSort="clearSort"
          :expData="cx"
          :expUrl="$api.aport1+'/zrq/exportZrqMj'"
          @blFnc="blFnc"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @sortChange="sortChange"
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

export default {
  components: { Table },
  props: {
    dialogType: {
      type: String,
      default: ""
    },
    dialogData: {
      type: Object,
      default: () => {}
    },
    pd:{
      type: Object,
      default: () => {}
    },
    pageRef:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 【业务数据】
      cx: {
        pd: this.pd,
        pageSize: 10,
        pageNum: 1,
      },
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
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction;
      this.getTable();
    },
    // 查询用户列表
    getTable(flag) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      let url = ''
      if(this.pageRef == 'zhfx'){
        url = '/comprehensive/listdata'
      }else{
        url = '/residetrend/getTrendRYxx'
      }
      this.$api.post(this.$api.aport4 + url, this.cx, r => {
        this.tableData.list = r.list;
        this.tableData.total = r.total;
      });
    },
    // 表格内操作
    blFnc(data) {
      // data.btn按钮信息
      // data.data行内信息
      if (data.btn.button_type == "ck") {
        let routeData = this.$router.resolve({
          path: '/CzCTXQ',
          query:{onlyId:data.data.personnel_id}
        });
        window.open(routeData.href, '_blank');
      }
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