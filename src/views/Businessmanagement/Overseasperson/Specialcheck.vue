<template>
  <div class="page">
    <Inquire :cxData="cxData" :pd="cx.pd" @cxFnc="cxFnc" @lcFnc="lcFnc"></Inquire>
    <div class="t-tab-top">
        <div class="tab-top-item hand" @click="clzt=1;lbTab=$cdata.zxhc.zxhc.lbTab">
            <img :src="clzt==1?tabImgActive_1:tabImg_1" alt="">
            <span>未处理</span>
        </div>
        <div class="tab-top-item hand ml--33" @click="clzt=2;lbTab=$cdata.zxhc.zxhc.lbTab1">
            <img :src="clzt==2?tabImgActive_2:tabImg_2" alt="">
            <span class="t-leftT">已处理</span>
        </div>
    </div>
    <div class="page-box">
      <Table
        :lbData="lbData"
        :isSelect="isSelect"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :isTab="isTab"
        :lbTab="lbTab"
        :tableData="tableData"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @tabFnc="tabFnc"
        @blFnc="blFnc"
        @userRole="userRole"
      ></Table>
    </div>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Form
        v-if="isShowDialog"
        :cxData="labelData"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
        @formLcFnc="formLcFnc"
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
    Form
  },
  data() {
    return {
      // 查询项
      tabImg_1:require('../../../assets/images/main/tab_2.png'),
      tabImgActive_1:require('../../../assets/images/main/tab_2_pre.png'),
      tabImg_2:require('../../../assets/images/main/tab_1.png'),
      tabImgActive_2:require('../../../assets/images/main/tab_1_pre.png'),
      //数据展示
      isSelect:true,
      isTab: true,
      cxData: this.$cdata.zxhc.zxhc.cx,
      lbData: this.$cdata.zxhc.zxhc.lb,
      lbBtn: this.$cdata.zxhc.zxhc.lbBtn,
      plBtn: this.$cdata.zxhc.zxhc.plBtn,
      lbTab: this.$cdata.zxhc.zxhc.lbTab,
      //业务数据
      cx: {
        pd: {},
        pageSize: 10,
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      page:1,
      clzt:1,
      multipleSelection:[],
      multipleArr:[],
      changeK:'',
      //弹窗数据
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: []
    };
  },
  mounted(){
    this.$nextTick(()=>{
      this.$store.dispatch("aGetNation");
      this.$store.dispatch("aGetGender");
      this.$store.dispatch("aGetPassport");
      this.$store.dispatch("aGetSuboffice");
      this.$store.dispatch("aGetPolice");
      this.$store.dispatch("aGetDatatype");
      this.$store.dispatch("aGetBackstatus");
      this.$cdata.zxhc.plBtnShow(this.page).then(data => {
        this.plBtn = data
      })
      this.getTable();
    })
      
  },
  methods: {
    cxFnc(data) {
      this.cx.pd = data;
      this.getTable();
    },
    //下拉框联动
    lcFnc(data){
      if(data.key.dm=='datatype'){
        this.$store.dispatch("aGetBackstatus",data.data).then(() => {});
      }
    },
    formLcFnc(data){
      if(data.key.dm=='datatype'){
        this.$store.dispatch("aGetBackstatus",data.data).then(() => {});
      }
    },
    // queryShowFnc(data){
    //   // data = !data;
    // },
    // 获取分页等信息
    pageSizeFnc(data) {
      this.cx.pageSize = data;
      this.getTable();
    },
    pageNumFnc(data) {
      this.cx.pageNum = data;
      this.getTable();
    },
    //表格复选框选择
    userRole(data){
      this.multipleSelection = data;
      this.multipleArr=[];
      for(var i=0;i<this.multipleSelection.length;i++){
        this.multipleArr = this.multipleArr.concat([this.multipleSelection[i].serial])
      }
      
    },
    // 查询列表
    getTable() {
      let pdAdd = {
          jb:this.$store.state.user.jb,
          bmbh:this.$store.state.user.bmbh,
          clzt:this.clzt,
          cljg:this.page
      }
      this.cx.pd = Object.assign({},this.cx.pd,pdAdd)
      this.$api.post(this.$api.root1+"/issueData/getIssueDataPage", this.cx, r => {
        this.tableData.list = r.list;
        this.tableData.total = r.total;
      });
    },
    //批量操作按钮  data==按钮名字
    plFnc(data) {
      if(this.multipleArr.length==0){
        this.$message({
            message: "请先选择数据！",
            type: "warning"
          });
          return false;
      }
      this.dialogTitle = data.button_name;
      this.dialogType = data.button_type;
      if(data.button_type=='sb'){
        let p={
          serialList:this.multipleArr,
          bmbh:this.$store.state.user.bmbh,
          jb:this.$store.state.user.jb,
          userId:this.$store.state.user.userId
        };
        this.$api.post(this.$api.root1+'/issueData/reportDataSuboffice',p,r => {
            this.$message({
              message:r.message,
              type:'success'
            })
            this.getTable(); 
        })
      }else if(data.button_type=='xf'){
        this.dialogData = {};
        if(this.page==1){
          this.labelData = this.$cdata.zxhc.zxhc.xfSContent;
        }else if(this.page==2){
          this.labelData = this.$cdata.zxhc.zxhc.xfFContent;
        }
        this.isShowDialog = true;
      }
    },
    //列表内按钮
    blFnc(data){
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if(data.btn.button_type == 'edit'){
        this.$cdata.zxhc.editShow(this.$store.state.user.jb).then(data =>{
          this.labelData = data;
        });
        this.$store.dispatch("aGetBackstatus",data.data.datatype)
        this.isShowDialog = true;
        this.dialogData = data.data
      }
    },
    //编辑保存
    editSave(data){
      let p=data;
      // delete p.createtime;
      // delete p.updatetime;
      p.jb=this.$store.state.user.jb;
      p.bmbh=this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      this.$api.post(this.$api.root1+'/issueData/updateIssueData',p,r=>{
          this.$message({
            message: r.message,
            type: "success"
          });
          this.getTable();
          this.isShowDialog = false;
      })
    },
    //下发保存
    xfSave(data){
      let p=data;
      p.serialList = this.multipleArr;
      p.jb=this.$store.state.user.jb;
      p.bmbh=this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      this.$api.post(this.$api.root1+'/issueData/issueDataTrigger',p,r=>{
        this.$message({
            message: r.message,
            type: "success"
          });
          this.getTable();
          this.isShowDialog = false;
      })
    },
    //列表tab切换  data==page 从1开始
    tabFnc(data) {
      this.page = data;
      this.$cdata.zxhc.plBtnShow(this.page).then(data => {
        this.plBtn = data
      })
      this.getTable();
    },
    dialogSave(data){
      if(data.type=='edit'){
        this.editSave(data.data)
      }else if(data.type=='xf'){
        this.xfSave(data.data)
      }
    },
  }
};
</script>
<style scoped>
</style>