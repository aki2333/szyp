<template>
  <div class="table-box">
    <div class="table-other" v-if="isTab||isPl">
      <div class="table-tab-box" v-if="isTab">
        <span
          class="hand"
          :class="{'tab_active':page1==lt.dm}"
          v-for="(lt,lti) in lbTab"
          :key="lti"
          @click="lbTabFun(lt.dm)"
        >{{lt.mc}}</span>
      </div>
      <!-- :type="pb.type" -->
      <!--           :disabled="pb.user_ctrl==1&&disPlBtn" -->
      <div class="table-btn-box" v-if="isPl">
        <template v-for="(pb,pbi) in plBtn">
          <el-button
            size="mini"
            :type="pbi==0?'success':'primary'"
            round
            v-if="pb.button_type==2"
            @click="plBtnFun(pb)"
            :key="pbi"
          >{{pb.button_name||pb.menu_name}}</el-button>
        </template>
      </div>
    </div>
    <el-table
      size="small"
      :ref="refName"
      border
      stripe
      highlight-current-row
      header-row-class-name="table-header"
      header-cell-class-name="table-header-cell"
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
      <el-table-column :width="czWidth" align="center" label="操作" v-if="isEdit">
        <template slot-scope="scope">
          <template v-for="(lbt,lbi) in lbBtn">
            <span :key="lbi" class="btn-span">
              <img
                class="btn-img"
                :src="require('@/assets/images/btn/'+lbt.icon+'.png')"
                @click="handleClick(scope.row,lbt)"
                :title="lbt.button_name"
                v-if="lbt.icon"
              />
              <el-button
                style="margin:0 5px"
                @click="handleClick(scope.row,lbt)"
                type="text"
                size="small"
                v-else-if="!lbt.user_ctrl||(lbt.user_ctrl==scope.row.status)"
              >{{lbt.button_name}}</el-button>
            </span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div align="center" class="mtb-10" v-if="isPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pageNum"
        :page-sizes="pageSizeArr"
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
    page: {
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
    pageSizeArr: {
      type: Array,
      default: () => [10, 20, 30, 40]
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
    },
    czWidth: {
      type: String,
      default: "auto"
    }
  },
  data() {
    return {
      pageNum: "1",
      pageSize: this.pageSizeArr[0],
      // order: "serial",
      // direction: 1,
      currentRow: 0,
      page1: this.lbTab.length > 0 ? this.lbTab[0].dm : this.page
    };
  },
  watch: {
    selection(val) {
      console.log(val);
      this.$nextTick(function() {
        this.toggleSelection(val);
      });
    },
    lbTab(val) {
      if (val.length > 0) {
        this.page1 = val[0].dm;
      }
    },
    plBtn: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      deep: true
    },
    page(val){
     this.page1 = val
    }
  },
  mounted() {
    console.log("表格", this.lbType, this.tableData);
    this.$nextTick(function() {
      this.toggleSelection(this.selection);
    });
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
      // console.log(val);
      this.$emit("SelectionChange", val);
    },
    toggleSelection(rows) {
      //this.$refs[this.refName].toggleAllSelection();
      if (rows) {
        rows.forEach(row => {
          console.log("row", row, this.$refs[this.refName], this.refName);
          this.$refs[this.refName].toggleRowSelection(row, true);
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
    
      this.$emit("tabFnc", val);
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
  height: 34px;
  border-bottom: 1px solid #e2e7ed;
  margin-bottom: 12px;
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
.btn-span {
  display: inline-block;
  vertical-align: middle;
}
.btn-img {
  width: 20px;
  margin: 0 5px;
  vertical-align: middle;
  cursor: pointer;
}
</style>