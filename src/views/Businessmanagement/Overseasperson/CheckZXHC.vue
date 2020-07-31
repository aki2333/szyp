<template>
  <div class="page">
    <Inquire 
		:cxData="cxData" 
		:facxData="facxData" 
		:pd="cx.pd" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
		@queryShowFnc="queryShowFnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">专项核查列表</div>
    </div>
		<div class="page-box">
      <Table
        :lbData="lbData"
        :isSelect="true"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :tableData="tableData"
        :refName="'zxhc'"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        :czWidth="'130'"
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
      ></Table>
    </div>
		<Dialog  :width="dialogType!='xf'&&dialogType!='ck'?'800px':'1200px'" :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Custom
			v-if="dialogType=='xf'"
      :key="timer"
      :dialogType="dialogType"
      @dialogSave="dialogSave"
      @dialogCancel="isShowDialog=false"
			></Custom>
      <BatchIm
      v-else-if="dialogType=='pldr'"
      :url="$api.aport2 + '/specialCheck/readExcel'"
      :urlErr="$api.aport2 + '/specialCheck/exportErrData'"
      @expFun="expFun"
      @dialogCancel="isShowDialog=false"></BatchIm>
      <Form
      v-else
      :cxData="labelData"
      :dialogData="dialogData"
      :dialogType="dialogType"
      @dialogSave="dialogSave"
      @dialogCancel="isShowDialog=false"></Form>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import Custom from "./ZxhcCustom.vue"
import BatchIm from "@/components/BatchImport.vue";
import Form from "@/components/Form.vue";
export default {
	components: {
    Inquire,
    Table,
		Dialog,
    Custom,
    BatchIm,
    Form,
  },
	data(){
		return{
			tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
			//数据展示
			//查询项
			cxData: this.$cdata.zxhc.zxhcgl.cx,
			facxData: this.$cdata.zxhc.zxhcgl.facx,//快速查询项
			//列表
			lbData: this.$cdata.zxhc.zxhcgl.lb,
      lbBtn: this.$cdata.zxhc.zxhcgl.lbBtn,
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
        pd: {
          jb : this.$store.state.user.jb,
          bmbh : this.$store.state.user.bmbh,
        },
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
      issueDataIds:[],
			//弹窗数据
			isShowDialog:false,
			dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
      timer:"",
      onlySerial:'',
		}
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
    //导入--导出错误信息
    expFun(){
      this.isShowDialog = false;
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
		//表格排序
		sortChange(data){
			this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
    },
    //表格复选框选择
    SelectionChange(data){
      this.issueDataIds = [];
      for(var i=0;i<data.length;i++){
        this.issueDataIds.push(data[i].serial)
      }
      // console.log('issueDataIds',this.issueDataIds)
    },
		// 查询用户列表
    getTable(flag,pdQ) {
			if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
			this.cx.pd.jb = this.$store.state.user.jb;
      this.cx.pd.bmbh = this.$store.state.user.bmbh;
			this.cx.pd.clzt = this.pageState;
			this.cx.pd.cljg = '1';
      this.$api.post(this.$api.aport2 + "/issueData/getIssueDataPage", pdQ||this.cx, r => {
				this.tableData.list = r.list;
				this.tableData.total = r.total
      });
    },
		//批量按钮
		plFnc(data){
			this.dialogTitle = data.menu_name;
			this.dialogType = data.py;
			if(data.py=='xf'){
        this.timer = new Date().getTime()
				this.isShowDialog = true
			}else if(data.py=='pldr'){
        this.isShowDialog = true
      }else if(data.py=='xz'){
        this.labelData = this.$cdata.zxhc.zxhcgl.xzAndEdit;
        this.dialogData = {};
        this.isShowDialog = true
      }
		},
		//列表内按钮&&双击行
    blFnc(data){
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      this.onlySerial = data.data.serial;
      if(data.double){
        this.dialogType = 'edit'
        this.dialogTitle = '编辑'
      }
      if(this.dialogType == 'edit'){
        this.labelData = this.$cdata.zxhc.zxhcgl.xzAndEdit;
        this.dialogData = Object.assign({},data.data)
        this.isShowDialog = true;
      }else if(this.dialogType == 'ck'){
        this.labelData = this.$cdata.zxhc.zxhcgl.xq;
        this.dialogData = Object.assign({},data.data)
        this.isShowDialog = true;
      }else if(this.dialogType == 'delete'){
        let p={
          serial:data.data.serial,
          delete_user_id:this.$store.state.user.userId,
          dataType:'3',
        }
        this.$api.post(this.$api.aport2 + '/specialCheck/deleteSpecialCheckIssueData',p,r=>{
          this.$message({
            message: r.message,
            duration: 8000,
            showClose: true,
            type: "success"
          });
          this.getTable();
        })
      }
    },
    editSave(data){
      let p = data;
      p.update_user_id = this.$store.state.user.userId;
      p.dataType = '3';
      p.serial = this.onlySerial;
      p.bmbh = this.$store.state.user.bmbh;
      this.$api.post(this.$api.aport2 + '/specialCheck/updateSpecialCheckIssueData',data,r=>{
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
    xfSave(data){
      console.log('调用')
      let p={
        userInfor:this.$store.state.user,
        issueDataIds:this.issueDataIds,
        feedbackInforList:data.data,
        issueTime:data.time,
        color:"red",
        dataType:'3'
      }
      this.$api.post(this.$api.aport2 + '/specialCheck/issueDataTrigger',p,r=>{
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
    xzSave(data){
      let p = Object.assign({},data);
      p.dataType = '3';
      p.create_user_id = this.$store.state.user.userId;
      this.$api.post(this.$api.aport2 + '/specialCheck/addSpecialCheckIssueData',p,r=>{
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
    dialogSave(data){
      if(data.type=='edit'){
        this.editSave(data.data)
      }else if(data.type=='xf'){
        this.xfSave(data)
      }else if(data.type=='xz'){
        this.xzSave(data.data)
      }
    },
		//点击行
		rowClick(){

		},
	}
};
</script>
<style scoped>
</style>