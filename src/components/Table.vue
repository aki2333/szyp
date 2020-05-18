<template>
  <div class="table-box">
    <div class="table-other" v-if="isTab||isPl">
      <div class="table-tab-box" v-if="isTab">
        <span
          class="hand"
          :class="{'tab_active':page==lt.page}"
          v-for="(lt,lti) in lbTab"
          :key="lti"
          @click="lbTabFun(lt.page)"
        >{{lt.tab_name}}</span>
      </div>
      <div class="table-btn-box" v-if="isPl">
        <el-button
          size="mini"
          :type="pb.type"
          :disabled="pb.user_ctrl==1&&disPlBtn"
          round
          v-for="(pb,pbi) in plBtn"
          @click="plBtnFun(pb)"
          :key="pbi"
        >{{pb.button_name}}</el-button>
      </div>
    </div>
    <el-table
      size="small"
      :ref="refName"
      border
      stripe
      highlight-current-row
      :data="tableData.list"
      style="width: 100%"
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="isSelect" align="center" type="selection" width="50"></el-table-column>
      <!--  -->
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
            @click="handleClick(scope.row,lbt)"
            type="text"
            size="small"
          >{{lbt.button_name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center" class="mtb-10" v-if="isPagination">
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
    lbType: {
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
    disPlBtn: {
      type: Boolean,
      default: false
    },
    refName: {
      type: String,
      default: "aa"
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
    isPagination: {
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
    lbTab: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Object,
      default: () => {}
    },
    selection: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pageNum: "1",
      pageSize: "10",
      // order: "serial",
      // direction: 1,
      currentRow: 0,
      page: 1
    };
  },
  watch: {
    selection(val) {
      this.toggleSelection(val);
    },
    plBtn: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      deep: true
    }
  },
  mounted() {
    console.log("表格", this.lbType);
  },
  methods: {
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
    handleSelectionChange(val) {
      console.log(val);
      this.$emit("userRole", val);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          console.log("row", row, this.$refs[this.refName], this.refName);
          this.$refs[this.refName].toggleRowSelection(row);
        });
      } else {
        this.$refs[this.refName].clearSelection();
      }
    },
    rowClick(row) {
      if (!this.isRowClick) {
        return false;
      }
      this.$emit("rowClick", { type: this.lbType, data: row });
    },
    handleClick(row, btn) {
      this.$emit("blFnc", { btn: btn, data: row });
    },
    lbTabFun(val) {
      this.page = val;
      this.$emit("tabFnc", this.page);
    },
    plBtnFun(val) {
      this.$emit("plFnc", val);
    }
  }
};
</script>
<style scoped>
.table-other {
  position: relative;
  height: 36px;
  /* display: flex;
  justify-content: space-between; */
}
.table-tab-box {
  position: absolute;
  left: 0;
}
.table-tab-box span {
  font-size: 12px;
  color: #9ea5bf;
  margin-right: 20px;
  display: inline-block;
  padding: 0 2px 10px;
  box-sizing: border-box;
}
.tab_active {
  color: #2576dc;
  border-bottom: 3px solid #2576dc;
}
.table-btn-box {
  position: absolute;
  right: 0;
}
</style>