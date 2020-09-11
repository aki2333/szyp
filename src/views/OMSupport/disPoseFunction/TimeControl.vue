<template>
  <div class="page">
    <Inquire 
		:cxData="cxData" 
		:facxData="facxData" 
		:pd="cx.pd" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
    @lcFnc="formLcFnc"
    @tagClickFnc="tagClickFnc"
		@queryShowFnc="queryShowFnc"
    @commandfnc="commandfnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item hand">
        <img :src="tabImgActive_1" alt />
        <span>时间管理</span>
      </div>
    </div>
		<div class="page-box">
      <Table
        :clzt="pageState"
        :lbData="lbData"
        :isSelect="false"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :tableData="tableData"
        :refName="'sjgl'"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        :czWidth="'100'"
        :clearSort="clearSort"
        :expData="cx"
        :expUrl="$api.aport2+''"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @blFnc="blFnc"
        @SelectionChange="SelectionChange"
        @rowClick="rowClick"
        @rowDbClick="blFnc"
        @sortChange="sortChange"
        @transSaveFnc="transSaveFnc"
      ></Table>
    </div>
    <Dialog :width="'700px'" :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Form
        :key="new Date().getTime()"
        :cxData="labelData"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :ZDYShow="dialogType=='xz'?true:false"
        @formLcFnc="formLcFnc"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
      ></Form>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import Form from "@/components/Form.vue";
export default {
	components: {
    Inquire,
    Table,
    Dialog,
    Form,
  },
	data(){
		return{
      //数据展示
      tabImgActive_1: this.$cdata.tabImgActive_1,
			//查询项
			cxData: this.$cdata.pzgl.sjkz.cx,
			facxData: this.$cdata.pzgl.sjkz.facx,//快速查询项
			//列表
			lbData: this.$cdata.pzgl.sjkz.lb,
      lbBtn: this.$cdata.pzgl.sjkz.lbBtn,
			plBtn: this.$store.state.plBtn,
			pageSizeArr: [15, 100, 500],
			selection: [],
			//业务数据
			cx: {
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      cxQ:{//快速查询
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
			},
			pageState:1,
      clearSort:0,
      //弹窗
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData:[],
      timer:''
		}
  },
  mounted(){
    this.$store.dispatch("agetYwlb");
  },
	methods:{
		cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
		},
		//查询条件转换查询
    queryShowFnc(flag){
      if(!flag){//快速查询
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
    },
    tagClickFnc(data){
      for(var key in data.para){
        this.cxQ.pd[data.para[key].dmx] = data.para[key].dm;
      }
      this.getTable(true,this.cxQ)
    },
    formLcFnc(data){
      if(data.key.dm == 'dwjb'){
        this.$cdata.czpzlxFuc(data.data)
      }
    },
		//筛选条件 快速查询
    commandfnc(data){
      for(var key in data.obj){
        this.cxQ.pd[data.obj[key].dmx] = data.obj[key].dm;
      }
      this.getTable(true,this.cxQ)
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
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
		//表格排序
		sortChange(data){
			this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
		},
		// 查询用户列表
    getTable(flag,pdQ) {
			if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.$api.post(this.$api.aport2 + "/issueTimeControl/getIssueTimeControlPage", pdQ||this.cx, r => {
				this.tableData.list = r.list;
				this.tableData.total = r.total
      });
    },
    //弹窗保存
    dialogSave(data) {
      console.log(data.data)
      if(data.type == 'xz'){
        this.xzSave(data.data)
      }else if(data.type == 'edit'){
        this.editSave(data.data)
      }
    },
		//批量按钮
		plFnc(data){
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      if(data.py == 'xz'){
        this.dialogData = {};
        // this.timer = new Date().getTime()
        this.labelData = this.$cdata.pzgl.sjkz.xzLabel
        this.isShowDialog = true;
      }
    },
    //新增保存
    xzSave(data){
      this.$api.post(this.$api.aport2 + '/issueTimeControl/addIssueTimeControl',data,r=>{
        this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      })
    },
		//列表内按钮&&双击行
		blFnc(data){
      this.dialogType = data.btn.button_type;
      this.dialogTitle = data.btn.button_name;
      if(data.double){
        this.dialogType = 'edit'
        this.dialogTitle = '编辑'
      }
      if(this.dialogType == 'delete'){
        this.$confirm('是否删除本条数据？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$api.post(this.$api.aport2 + '/issueTimeControl/deleteIssueTimeControl',{dtid:data.data.dtid},r=>{
            this.$message({
              message: r.message,
              duration: 8000,
              showClose: true,
              type: "success"
            });
            this.getTable();
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }else if(this.dialogType == 'edit'){
        this.labelData = this.$cdata.pzgl.sjkz.bjLabel;
        this.dialogData = Object.assign({},data.data)
        this.isShowDialog = true;
      }
    },
    //编辑保存
    editSave(data){
      this.$api.post(this.$api.aport2 + '/issueTimeControl/updateIssueTimeControl',data,r=>{
        this.$message({
            message: r.message,
            duration: 8000,
            showClose: true,
            type: "success"
          });
          this.getTable();
          this.isShowDialog = false;
      })
    },
		//表格复选框选择
		SelectionChange(){},
		//点击行
		rowClick(){

		},
	}
};
</script>
<style scoped>
</style>