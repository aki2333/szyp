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
        <el-popover
          placement="left"
          trigger="hover"
          popper-class="color-des">
          <ul v-if="colorDes.length!=0">
            <li v-for="(color,inds) in colorDes" :key="inds">
              <span style="width:20px;height:20px;display:inline-block;vertical-align: middle;" class="mr-10" :style="{backgroundColor:color.gdyssh}"></span>
              <span style="flex:1;">{{color.ysshbz}}</span>
            </li>
          </ul>
          <div v-else>无颜色说明</div>
          <span class="mr-10" slot="reference" v-show="(refName=='hczf'&&clzt1==1)||(refName=='zrqzf'&&clzt1==1)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fuse-"></use>
            </svg>
          </span>
          <!-- <i class="mr-10 iconfont" slot="reference" circle type="success" size="mini" v-show="(refName=='hczf'&&clzt1==1)||(refName=='zrqzf'&&clzt1==1)">&#xe617;</i> -->
        </el-popover>
        <template v-for="(pb,pbi) in plBtn">
          <el-button
            size="mini"
            :type="'primary'"
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
      highlight-current-row
      header-row-class-name="table-header"
      header-cell-class-name="table-header-cell"
      :data="tableData.list"
      style="width: 100%"
      :row-style="rowBackground"
      @row-click="rowClick"
      @row-dblclick="rowDbClick"
      @selection-change="handleSelectionChange"
      @select="selectPage"
      @select-all="selectPage"
      @sort-change="sortChange"
    >
      <el-table-column v-if="isSelect" align="center" type="selection" width="50"></el-table-column>
      <template v-for="(lb,i) in lbData">
        <el-table-column
          align="left"
          show-overflow-tooltip
          :key="i"
          v-if="lb.color"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="'custom'&&isSort">
            <template slot-scope="scope">
              <span style="width:20px;height:20px;display:inline-block;vertical-align: middle;" :style="{backgroundColor:scope.row.gdyssh}"></span>
            </template>
        </el-table-column>
        <el-table-column
          align="left"
          show-overflow-tooltip
          v-else
          :key="i"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="'custom'&&isSort"
        ></el-table-column>
      </template>
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
                :style="{'color':lbt.color_type=='1'?'#d78df5':'#7FCEFF'}"
                @click="handleClick(scope.row,lbt)"
                type="text"
                size="small"
                v-else-if="!lbt.user_ctrl||(lbt.user_ctrl==scope.row.status&&!lbt.status)
                ||(lbt.user_ctrl==scope.row.whetherUpdateState&&!lbt.control)
                ||(lbt.control&&page1=='1'&&clzt1==1&&((scope.row.backstatus_desc=='无效地址'||!scope.row.backstatus_desc))
                &&(scope.row.datatype!='3')&&(scope.row.datatype!='4')&&(scope.row.datatype!='5'))"
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
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Trans
        :key="timer"
        :transData="transData"
        :pointData="pointData"
        :dialogType="dialogType"
        @transSave="transSave"
        @dialogCancel="isShowDialog=false"></Trans>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "./Dialog.vue";
import Trans from "./Transfer.vue"
export default {
  components: { Dialog, Trans},
  props: {
    lbType: {
      type: String,
      default: ""
    },
    // 【内层列表tab】
    page: {
      type: String,
      default: ""
    },
    // 【外层列表tab】
    clzt: {
      type: Number,
      default: 0,
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
    isSort: {
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
    lbControlData: {
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
    },
    clearSort: {
      type: Number,
      default:0
    },
    expData:{
      type:Object,
      default: () => {}
    },
    expUrl:{
      type:String,
      default:''
    },
    colorDes:{
      type:Array,
      default: () => []
    }
  },
  data() {
    return {
      pageNum: "1",
      pageSize: this.pageSizeArr[0],
      // order: "serial",
      // direction: 1,
      currentRow: 0,
      page1: this.lbTab.length > 0 ? this.lbTab[0].dm : this.page,
      clzt1:this.clzt,

      lbArr:this.lbData,//获取初始全部列表项
      jbArr:[],//已选择展示项

      isShowDialog: false,
      dialogTitle: "",
      dialogType:"",
      //穿梭框数据
      timer:'',
      transData:this.lbData,//数据来源（全部展示列表项）
      pointData:[],//选中项
      confirmFlag:true,
      expD:{},
      // colorDes:[
      //     {
      //       "gdyssh": "#9aba60",
      //       "ysshbz": "11"
      //     },
      //     {
      //       "gdyssh": "#e2534d",
      //       "ysshbz": "22"
      //     },
      //     {
      //       "gdyssh": "#9aba60",
      //       "ysshbz": "33"
      //     },
      //     {
      //       "gdyssh": "#e2534d",
      //       "ysshbz": "44"
      //     }
      //   ],
    };
  },
  watch: {
    refName(val){
      console.log('进入',val)
      if(val=='jbxxTable'){
        console.log('进入来了',val)
        
      }
    },
    selection(val) {
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
      handler() {},
      deep: true
    },
    // lbData: {
    //   handler(n) {
    //     this.lbArr = n;
    //   },
    //   deep: true
    // },
    page(val) {
      console.log('page1',val)
      this.page1 = val;
    },
    clzt(val){
      // this.transData = this.lbData;
      this.clzt1 = val;
    },
    //清除排序
    clearSort(){
      this.$nextTick(()=>{
        this.$refs[this.refName].clearSort()
      })
    },
  },
  mounted() {
    this.$nextTick(function() {
      // this.transData = this.lbData;
      this.toggleSelection(this.selection);
      if(this.$route.query.page){
        this.page1 = this.$route.query.page
      }
    });
  },
  methods: {
    //默认当前行高亮
    cRowHighlight(){
      this.$refs[this.refName].setCurrentRow(this.tableData.list[0],true)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.$emit("pageSizeFnc", this.pageSize);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.$emit("pageNumFnc", this.pageNum);
    },
    handleSelectionChange(val) {//当选择项发生变化时会触发该事件
      // console.log('选择',val);
      this.$emit("SelectionChange", val);
    },
    selectPage(val,ref){//当用户手动勾选数据行的 Checkbox 时触发的事件   跨页选中需要手动触发
      // console.log('手动触发==',val)
      this.$emit("selectPageFnc",{data:val,refName:ref})
    },
    rowBackground(row){
      return{
        "background-color":row.row.yjssys
      }
    },
    toggleSelection(rows) {//选中行
      if (rows) {
        this.$nextTick(() =>{
          rows.forEach(row => {
            this.$refs[this.refName].toggleRowSelection(row, true);
          });
        })
        
      } else {
        this.$refs[this.refName].clearSelection();
      }
    },
    rowClick(row,column) {//点击行
      if (!this.isRowClick) {
        return false;
      }
      if(column.label=="操作"&&this.refName=='hczf'){
        return false;
      }
      this.$emit("rowClick", { type: this.lbType, data: row });
    },
    rowDbClick(row){
      this.$emit("blFnc", { btn:'', data: row ,double:true});
    },
    handleClick(row, btn) {
      this.$emit("blFnc", { btn: btn, data: row });
    },
    lbTabFun(val) {
      this.$emit("tabFnc", val);
    },
    async plBtnFun(val) {
      if(val.py == 'jb'){//简表
        this.dialogTitle = val.menu_name;
        this.dialogType = val.py;
        this.timer = new Date().getTime();
        if(this.refName=="hczf"){
          if(this.page1!='1'){
            this.transData = this.transData.filter(item => ['datasources_desc'].indexOf(item.dm) == -1);
          }else{
            this.transData = this.lbControlData
          }
        }
        // this.pointData = [];//选中值
        // this.pointData = this.lbData;//选中值
        // console.log('this.transData',this.transData)
        // console.log('this.pointData',this.lbData)
        this.isShowDialog = true;
      }
      if(val.py == 'dc'){//导出
        let expName = this.$store.state.breadcrumb[this.$store.state.breadcrumb.length-1].menu_name;
        console.log('expName',expName)
        this.expD = Object.assign({},this.expData)
        this.expD.menu_name = this.$store.state.breadcrumb[this.$store.state.breadcrumb.length-1].menu_name;
        this.expD.btn_name = val.menu_name;
        this.expD.user = this.$store.state.user;
        this.expD.pd.listName = this.lbData;
        this.expD.pageSize = 2000;
        if(this.tableData.list.length==0){
          this.$message({
            message: "无可导出数据！",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        }
        if(this.tableData.total<=2000){//导出条数小于2000条
          this.expD.pageNum = 1
          this.$api.post(this.expUrl,this.expD,'','','blob','xlsx',expName)
        }else{
          for(var i=1;i<=Math.ceil(this.tableData.total/2000);i++){
            this.expD.pageNum = i
              await this.$confirm('将导出'+i+'个文件，将导出 '+(i)*2000 +' 条，是否继续导出?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$api.post(this.expUrl,this.expD,'','','blob','xlsx',expName)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消导出'
                })
                this.confirmFlag = false
              })
              if(!this.confirmFlag){
                this.confirmFlag = true
                return false
              }
          }
        }
      }
      this.$emit("plFnc", val);
    },
    // 简表保存
    transSave(data){
      this.jbArr = [];
      this.lbArr.forEach(item1 => {
        data.forEach(item2 => {
          if(item1.dm == item2){
            this.jbArr.push(item1)
          }
        })
      });
      this.$emit('transSaveFnc',this.jbArr);
      this.pointData=this.jbArr;
      this.isShowDialog = false;
    },
    sortChange(column){
      column.order=="ascending"?column.order='asc':column.order=="descending"?column.order='desc':column.order=null
      if(column.prop.includes('_desc')){column.prop=column.prop.replace("_desc","");}
      this.$emit("sortChange",{prop:column.prop,direction:column.order})
    },
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