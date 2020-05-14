<template>
  <div class="table-box">
    <div class="table-other">
      <div class="table-tab-box" v-if="isTab">
        <span class="hand">市局未处理</span>
        <span class="hand">分局未处理</span>
      </div>
      <div class="table-btn-box" v-if="isPl">
        <el-button
          size="mini"
          :type="pb.type"
          round
          v-for="(pb,pbi) in plBtn"
          @click="plBtnFun(pb.button_name)"
          :key="pbi"
        >{{pb.button_name}}</el-button>
      </div>
    </div>
    <el-table
      size="small"
      stripe
      :row-class-name="rowClass"
      :data="tableData.list"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column v-if="isSelect" align="center" type="selection" width="50"></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        v-for="(lb,i) in lbData"
        :key="i"
        :prop="lb.dm"
        :label="lb.cm"
      ></el-table-column>
      <el-table-column align="center" label="操作" v-if="isEdit">
        <template slot-scope="scope">
          <el-button
            v-for="(lbt,lbi) in lbBtn"
            :key="lbi"
            @click="handleClick(scope.row)"
            type="text"
            size="small"
          >{{lbt.button_name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center" class="mt-10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="tableData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    listType: {
      type: String,
      default: ""
    },
    isTab: {
      type: Boolean,
      default: false
    },
    isPl: {
      type: Boolean,
      default: true
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    isRowClick: {
      type: Boolean,
      default: true
    },
    cxData: {
      type: Array,
      default: () => []
    },
    lbData: {
      type: Array,
      default: () => []
    },
    lbBtn: {
      type: Array,
      default: () => []
    },
    plBtn: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pageNum: "1",
      pageSize: "10",
      // order: "serial",
      // direction: 1,
      currentRow: 0
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.$emit("pageSizeFnc", this.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.$emit("pageNumFnc", this.pageNum);
    },
    rowClick(row, column, event) {
      if (!this.isRowClick) {
        return false;
      }
      this.currentRow = row;
      console.log(row, column, event);
    },
    rowClass({ row, rowIndex }) {
      console.log({ row, rowIndex });

      return;
    },
    plBtnFun(val){
      this.$emit("plFnc",val)
    },
  }
};
</script>
<style scoped>
.table-box {
  background: #ffffff;
  border-radius: 0 0 20px 20px;
  padding: 10px 15px 20px 15px;
}
.table-other {
  position: relative;
  height: 60px;
  /* display: flex;
  justify-content: space-between; */
}
.table-tab-box {
  position: absolute;
  left: 0;
}
.table-tab-box span{
  font-size: 12px;
  color: #9EA5BF;
  margin-right: 20px;
}
.table-btn-box {
  position: absolute;
  right: 0;
}
</style>