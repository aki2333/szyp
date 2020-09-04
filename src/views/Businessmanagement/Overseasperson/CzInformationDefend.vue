<template>
  <div class="page">
    <Inquire 
		:cxData="cxData" 
    :cxCheck="cxCheck"
		:facxData="facxData" 
		:pd="cx.pd" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
    @lcFnc="lcFnc" 
		@queryShowFnc="queryShowFnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">常住人员信息维护列表</div>
    </div>
		<div class="page-box">
      <Table
        :lbData="lbData"
        :isSelect="true"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :tableData="tableData"
        :refName="'czxxwh'"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
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
    <Dialog :width="dialogType=='edit'?'1300px':'1000px'" 
      :top="dialogType=='edit'?'3vh':'15vh'" :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Edit 
      :timer="timer"
      :jbxxdiaData="jbxxdiaData"
      :dialogType="dialogType"
      :onlyId="onlyId"
      @dialogSave="dialogSave"
      @dialogCancel="isShowDialog=false"></Edit>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import Edit from "./CzxxwhEdit.vue";
// import Form from "@/components/Form.vue";
export default {
	components: {
    Inquire,
    Table,
    Dialog,
    Edit
    // Form,
  },
	data(){
		return{
			
			//数据展示
			//查询项
      cxData: this.$cdata.czxx.xxwhgl.cx,
      cxCheck:this.$cdata.czxx.xxwhgl.cxCheck,
			facxData: this.$cdata.czxx.xxwhgl.facx,//快速查询项
			//列表
			lbData: this.$cdata.czxx.xxwhgl.lb,
      lbBtn: this.$cdata.czxx.xxwhgl.lbBtn,
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
      clearSort:0,
      //弹窗数据
      timer:'',
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      jbxxdiaData:{},
      onlyId:'',
		}
  },
  mounted(){
    this.$store.dispatch("aGetDM", "qzzl");
    this.$store.dispatch("aGetDM", "xzqh");
    this.$store.dispatch('aGetDMPro', "dm_jwrysf");//身份
    this.$store.dispatch('aGetDMPro', "dm_jzztlx");//居住状态类型
    this.$store.dispatch('aGetDMPro', "dm_gzztlx");//工作状态类型
    this.$store.dispatch('aGetDMPro', "dm_spqfdb");//签发地
    this.$store.dispatch('aGetDMPro', "dm_bjjgkab");//入境口岸
    this.$store.dispatch('aGetDMPro', "dm_crjbs");//出入境状态
    this.$store.dispatch('aGetDMPro', "dm_pcswlb");//居住地所在派出所
    this.$store.dispatch('aGetDM', "wgr_sqsy");//停留事由&&入境事由
    this.$store.dispatch("aGetNation");//国家地区&出生地
    this.$store.dispatch("aGetBackstatus",'1')//走访反馈状态
    this.$cdata.aGetArea()
    this.$cdata.jzdZrq()
  },
	methods:{
		cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    //下拉框联动
    lcFnc(data){
      if(data.key.dm == "inhabi_police_station"){
        // if(data.data == ""){
        //   this.$cdata.options.turnoutarea = [];
        //   data.obj.turnoutarea = '';
        // }else{
          this.$cdata.JoinZrq(data.data).then((data) =>{
            this.$store.state.turnoutarea = data
          })
        // }
      }
    },
		//查询条件转换查询
    queryShowFnc(flag){
      if(!flag&&this.facxData.length!=0){//快速查询
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
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
      this.$api.post(this.$api.aport4 + "/czry/getCzRyxx", pdQ||this.cx, r => {
				this.tableData.list = r.list;
				this.tableData.total = r.total
      });
    },
		//批量按钮
		plFnc(data){
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
		},
		//列表内按钮&&双击行
		blFnc(data){
      this.dialogType = data.btn.button_type;
      this.dialogTitle = data.btn.button_name;
      this.onlyId = data.data.personnel_id;
      if(data.double){
        this.dialogType = 'edit',
        this.dialogTitle = '编辑'
      }
      if(this.dialogType == 'edit'){
        // this.jbxxdiaData = Object.assign({},data.data)//赋值基本信息
        // this.getJbxxPho();
        this.timer = new Date().getTime();
        this.isShowDialog = true;
      }
    },
    getJbxxPho(){},
    editSave(data){
      let url='';
      if(data.editPage=='1'){
        url="/czry/updateCzRyxx"
      }else if(data.editPage=='2'){
        url="/czjzd/updateCzJzdxx"
      }else if(data.editPage=='3'){
        url="/czgzd/updateCzGzdxx"
      }
      this.$api.post(this.$api.aport4 + url,data.data,r=>{
        this.$message({
            message: r.message,
            duration: 8000,
            showClose: true,
            type: "success"
          });
          this.getTable();
      })
    },
    dialogSave(data){
      if(data.type=='edit'){
        this.editSave(data)
        console.log('zhuye',data)
        // this.isShowDialog = false
      }
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