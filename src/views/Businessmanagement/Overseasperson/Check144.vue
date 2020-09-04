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
      <div class="tab-top-item tabImgActive_1 hand">144小时过境免签核查列表</div>
    </div>
		<div class="page-box">
      <Table
        :page="page"
        :lbData="lbData"
        :isSelect="true"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :lbTab="lbTab"
        :isTab="true"
        :tableData="tableData"
        :isEdit="isEdit"
        :refName="'zxhc'"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        :czWidth="'130'"
        :clearSort="clearSort"
        :expData="cx"
        :expUrl="$api.aport2+'/issueData/exportIssueData'"
        @plFnc="plFnc"
        @tabFnc="tabFnc"
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
		<Dialog  :width="dialogType!='xf'&&dialogType!='edit'&&dialogType!='ck'?'800px':'1300px'" :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Custom
			v-if="dialogType=='xf'"
      :key="timer"
      :dialogType="dialogType"
      @dialogSave="dialogSave"
      @dialogCancel="isShowDialog=false"
			></Custom>
      <BatchIm
      ref="batchIm"
      v-else-if="dialogType=='pldr'"
      :url="$api.aport2 + '/specialCheckTimeVisa/readExcel'"
      :urlErr="$api.aport2 + '/specialCheckTimeVisa/exportErrData'"
      :dataType="'4'"
      @expFun="expFun"
      @dialogCancel="isShowDialog=false"></BatchIm>
      <Form
      v-else
      :cxData="labelData"
      :dialogData="dialogData"
      :dialogType="dialogType"
      :rulsName="'zxhc'"
      ref="zxhcForm"
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
			cxData: this.$cdata.zxhc.offgl.cx,
			facxData: this.$cdata.zxhc.offgl.facx,//快速查询项
      //列表
      isEdit:true,
			lbData: this.$cdata.zxhc.offgl.lb,
      lbBtn: [],
      lbTab:this.$cdata.zxhc.offgl.lbTab,
			plBtn: this.$store.state.plBtn,
			pageSizeArr: [15, 100, 500],
      selection: [],
      page:'0',
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
  mounted(){
    this.$store.dispatch("aGetDM", "qzzl");
    this.$store.dispatch("aGetDatatype");
    this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(() => {//所属分局
        this.$store.dispatch("aGetssdw", {bmbh: "320500000000",type: "ssfj"});
    });
    this.$cdata.zxhc.zxhcLbbtn('4',this.page).then((data) => {
      this.lbBtn = data
    })
    this.getTable(true)
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
    tabFnc(data){
      this.page = data;
      this.cx.pageNum = 1;
      this.issueDataIds = [];
      this.$cdata.zxhc.zxhcLbbtn('4',this.page).then((data) => {
        this.lbBtn = data
      })
      if(this.page == '1'){
        this.isEdit = false
      }else{
        this.isEdit = true
      }
      if(this.page!='0'){
        this.plBtn = this.plBtn.filter(item => ['xf'].indexOf(item.py) == -1);
      }else{
        this.plBtn = this.$store.state.plBtn;
      }
      this.getTable(true)
    },
    //导入--导出错误信息
    expFun(){
      this.isShowDialog = false;
      this.getTable();
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
    //表格复选框选择
    SelectionChange(data){
      this.issueDataIds = [];
      for(var i=0;i<data.length;i++){
        this.issueDataIds.push(data[i].serial)
      }
    },
		// 查询用户列表
    getTable(flag,pdQ) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.cx.pd.datatype = '4';
      this.cx.pd.issuedate_status = this.page
      this.$api.post(this.$api.aport2 + "/specialCheck/getIssueDataPage", pdQ||this.cx, r => {
				this.tableData.list = r.list;
				this.tableData.total = r.total
      });
    },
		//批量按钮
		plFnc(data){
			this.dialogTitle = data.menu_name;
			this.dialogType = data.py;
			if(data.py=='xf'){
        if(this.issueDataIds.length==0){
          this.$message({
            message: '请选择数据！',
            duration: 13000,
            showClose: true,
            type: "warning"
          });
          return;
        }
        this.timer = new Date().getTime()
				this.isShowDialog = true
			}else if(data.py=='pldr'){
        this.isShowDialog = true
        if(this.$refs.batchIm){
          this.$refs.batchIm.clearFile();
        }
      }else if(data.py=='xz'){
        this.labelData = this.$cdata.zxhc.offgl.xz;
        this.dialogData = {};
        this.isShowDialog = true
        if(this.$refs.zxhcForm){
          this.$refs.zxhcForm.clearValid()
        }
      }else if(data.py=='mbxz'){//模板下载
        var url = this.$api.root + this.$api.aport2 + '/webapp/templateFile/144小时过境免签核查模板.docx';
        // console.log(url)
        window.location.href = url;
      }
		},
		//列表内按钮&&双击行
    blFnc(data){
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      this.onlySerial = data.data.serial;
      if(data.double){
        if(this.page=='0'){//只有未下发有处理按钮
          this.dialogType = 'edit'
          this.dialogTitle = '处理'
        }else{
          this.dialogType = 'ck'
          this.dialogTitle = '详情'
        }
      }
      if(this.dialogType == 'edit' || this.dialogType == 'ck'){
        // this.labelData = this.$cdata.zxhc.offgl.cl
        if(data.data.issueDataFeedbackList){//存在自定义
          this.$cdata.zxhc.offhandCL().then(label => {//插入自定义走访内容
            label.push({title:'自定义走访信息',type:'line'},{'issueDataFeedbackList':JSON.parse(data.data.issueDataFeedbackList)},{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true,col:8})
            if(data.data.photoEncoder){//存在图片
              label.push({title:'图片信息',type:'line'},{type: 'photo', dm: 'photoEncoder'})
            }
            this.labelData = label;
          });
          //自定义内容回填
          let cusArr = JSON.parse(data.data.issueDataFeedbackList)
          for(var j=0;j<cusArr.length;j++){
            data.data[cusArr[j].serial] = {
              serial:cusArr[j].serial,
            }
            if(cusArr[j].value){
              this.$set(data.data[cusArr[j].serial],'value',cusArr[j].type=='checkbox'?JSON.parse(cusArr[j].value):cusArr[j].type=='text'?cusArr[j].value:parseInt(cusArr[j].value))
            }else{
              this.$set(data.data[cusArr[j].serial],'value',cusArr[j].type=='checkbox'?[]:'')
            }
            cusArr[j].type=="checkbox"||cusArr[j].type=="radio"?cusArr[j].col = 24:cusArr[j].col = 8
            cusArr[j].dis = true;
          }
          data.data.issueDataFeedbackList = JSON.stringify(cusArr);
        }else{//没有自定义选择，只有反馈时间
          this.$cdata.zxhc.offhandCL().then(label => {//插入自定义走访内容
            label.push({title:'自定义走访信息',type:'line'},{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true,col:8})
            if(data.data.photoEncoder){//存在图片
              label.push({title:'图片信息',type:'line'},{type: 'photo', dm: 'photoEncoder'})
            }
            this.labelData = label;
          });
        }
        if(!data.data.issue_time){data.data.issue_time='0'}//反馈时间回填  没有反馈时间默认0
        // data.data.photoEncoder=this.$cdata.tabImgActive_1
        this.$api.post(this.$api.aport2+'/hx/getEntryAndExitData',{gjdq:data.data.nationality,zjhm:data.data.passportno},r=>{
          this.dialogData = Object.assign({},data.data,r);
        })
        // this.dialogData = Object.assign({},data.data);
        this.$store.dispatch("aGetBackstatus", data.data.datatype);
        this.isShowDialog = true;
        if(this.$refs.zxhcForm){
          this.$refs.zxhcForm.clearValid()
        }
      }else if(this.dialogType == 'delete'){
        this.$confirm('是否删除本条数据？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let p={
            serial:data.data.serial,
            delete_user_id:this.$store.state.user.userId,
            dataType:'4',
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
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }else if(this.dialogType == 'gd'){
        let p={
          serial:data.data.serial,
          userId:this.$store.state.user.userId,
          dataType:'4',
        }
        this.$api.post(this.$api.aport2 + '/specialCheck/updateFileSpecialCheckIssueData',p,r=>{
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
      p.dataType = '4';
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
      let p={
        userInfor:this.$store.state.user,
        issueDataIds:this.issueDataIds,
        feedbackInforList:data.data,
        issueTime:data.time,
        suboffice:data.suboffice,
        color:"red",
        dataType:'4'
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
      p.dataType = '4';
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