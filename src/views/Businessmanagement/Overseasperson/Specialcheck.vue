<template>
  <div class="page">
    <Inquire :cxData="cxData" :pd="cx.pd" @cxFnc="cxFnc" @lcFnc="lcFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" @click="tabTopClick1">
        <img :src="clzt==1?tabImgActive_1:tabImg_1" alt />
        <span>未处理</span>
      </div>
      <div class="tab-top-item hand ml--33" @click="tabTopClick2">
        <img :src="clzt==2?tabImgActive_2:tabImg_2" alt />
        <span class="t-leftT">已处理</span>
      </div>
    </div>
    <div class="page-box">
      <Table
        :page="page"
        :lbData="lbData"
        :isSelect="isSelect"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :isTab="isTab"
        :lbTab="lbTab"
        :tableData="tableData"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @tabFnc="tabFnc"
        @blFnc="blFnc"
        @SelectionChange="SelectionChange"
        @rowClick="rowClick"
      ></Table>
    </div>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Form
        v-if="isShowDialog"
        :cxData="labelData"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :joinFlag="joinFlag"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
        @formLcFnc="formLcFnc"
        @radioChange="radioChange"
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
      tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
      //数据展示
      isSelect: true,
      isTab: true,
      cxData: this.$cdata.zxhc.zxhc.cx,
      lbData: this.$cdata.zxhc.zxhc.lb,
      lbBtn: this.$cdata.zxhc.zxhc.lbBtn,
      plBtn: [],
      lbTab: this.$cdata.zxhc.zxhc.lbTab,
      pageSizeArr:[15,100,500],
      //业务数据
      cx: {
        pd: {},
        pageSize: 10,
        pageNum: 1
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      page: '1',
      clzt: 1,
      multipleSelection: [],
      multipleArr: [],
      officeArr: [],
      policeArr: [],
      backstatusArr:[],
      selection:[],
      changeK: "",
      //弹窗数据
      isShowDialog: false,
      joinFlag:false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: []
    };
  },
  watch:{
    // clzt(val){

    // },
    page(val){
      if(this.clzt==1){//未处理
        if(val == '1'){
          this.plBtn = this.$store.state.plBtn
          let arr = [];
          for(var i=0;i<this.plBtn.length;i++){
              if(this.plBtn[i].py!='sb'){
                arr.push(this.plBtn[i])
              }
            }
          this.plBtn = arr
        }else if(val=='2'){
          this.plBtn = this.$store.state.plBtn
        }else if(val=='3'){
          this.plBtn = this.$store.state.plBtn
          let arr = [];
          for(var j=0;j<this.plBtn.length;j++){
              if(this.plBtn[j].py=='cx'||this.plBtn[j].py=='qc'){
                arr.push(this.plBtn[j])
              }
            }
          this.plBtn = arr
        }
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("aGetNation");
      this.$store.dispatch("aGetGender");
      this.$store.dispatch("aGetPassport");
      if (this.$store.state.user.jb == '1') {
        this.$store.dispatch("aGetSuboffice");
      } else if (this.$store.state.user.jb == '2') {
        this.$store.dispatch("aGetSuboffice",this.$store.state.user.bmbh.slice(0, 6));
      } else if (this.$store.state.user.jb == '3') {
        this.$store.dispatch("aGetSuboffice",this.$store.state.user.bmbh.slice(0, 6) + '000000');
      }  
      if (this.$store.state.user.jb == '1') {
        this.$store.dispatch("aGetPolice");
        this.$store.dispatch("aGetZrq");
      } else if (this.$store.state.user.jb == '2') {
        this.$store.dispatch("aGetPolice",this.$store.state.user.bmbh.slice(0, 6));
        this.$store.dispatch("aGetZrq",this.$store.state.user.bmbh.slice(0, 6));
      } else if (this.$store.state.user.jb == '3') {
        this.$store.dispatch("aGetPolice",this.$store.state.user.bmbh);
        this.$store.dispatch("aGetZrq",this.$store.state.user.bmbh.slice(0, 8));
      }  
      this.$store.dispatch("aGetDatatype");
      
      let arr = [];
      this.plBtn = this.$store.state.plBtn
      for(var i=0;i<this.plBtn.length;i++){
          if(this.plBtn[i].py!='sb'){
            arr.push(this.plBtn[i])
          }
        }
      this.plBtn = arr
      // this.$store.dispatch("aGetBackstatus");
      this.$cdata.zxhc.lbTabShow(this.$store.state.user.jb).then(data =>{
        this.lbTab=data.lbTab
        this.page = this.lbTab[0].dm
        this.getTable();
      });
      
    });
  },
  methods: {
    cxFnc(data) {
      this.cx.pd = data;
      this.getTable();
    },
    tabTopClick1(){
      this.clzt=1;
      this.page='1';
      this.cx.pageNum = 1;
      this.$cdata.zxhc.lbTabShow(this.$store.state.user.jb).then(data =>{
        this.lbTab=data.lbTab
      });
      this.plBtn = this.$store.state.plBtn
          let arr = [];
          for(var i=0;i<this.plBtn.length;i++){
              if(this.plBtn[i].py!='sb'){
                arr.push(this.plBtn[i])
              }
            }
          this.plBtn = arr
      this.getTable()
    },
    tabTopClick2(){
      this.clzt=2;
      this.page='1';
      this.cx.pageNum = 1;
      this.$cdata.zxhc.lbTabShow(this.$store.state.user.jb).then(data =>{
        this.lbTab=data.lbTab1
      });
      let arr = [];
          for(var k=0;k<this.plBtn.length;k++){
              if(this.plBtn[k].py=='cx'||this.plBtn[k].py=='qc'){
                arr.push(this.plBtn[k])
              }
            }
          this.plBtn = arr
      this.getTable()
    },
    rowClick(data){
      this.selection = [];
      this.selection.push(data.data)
    },
    //下拉框联动
    lcFnc(data) {
      if (data.key.dm == "datatype") {
        if(data.data==''){
          this.$store.state.backstatus = [];
          data.obj.backstatus = '';
        }else{
          this.$store.dispatch("aGetBackstatus", data.data).then(() => {});
        }
      }
      if(data.key.dm == "suboffice") {
        if(data.data==''){
          data.obj.policestation = '';
        }
        if(data.obj.policestation){
          data.obj.policestation = '';
        }
        this.$store.dispatch("aGetPolice",data.data.slice(0,6));
      }
    },
    //弹窗form下拉框联动
    formLcFnc(data) {
      if (data.key.dm == "datatype") {
        this.$store.dispatch("aGetBackstatus", data.data).then(() => {});
      }
      if(data.key.dm == "suboffice") {
        if(data.data==''){
          data.obj.policestation = '';
        }
        if(data.obj.policestation){
          data.obj.policestation = '';
        }
        this.$store.dispatch("aGetPolice",data.data.slice(0,6));
      }
      if(data.key.dm == "policestation"){
        if(data.data==''){
          data.obj.turnoutarea = '';
        }
        if(data.obj.turnoutarea){
          data.obj.turnoutarea = '';
        }
        this.$store.dispatch("aGetZrq",data.data.slice(0, 8));
      }
    },
    radioChange(val){
      console.log(val)
      if(val){
        if(this.joinFlag == true){
          this.joinFlag = false
        }
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
    //表格复选框选择
    SelectionChange(data) {
      console.log('this.multipleSelection',this.multipleSelection)
      this.multipleSelection = data;
      this.multipleArr = [];
      this.officeArr = [];
      this.policeArr = [];
      this.backstatusArr = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.multipleArr = this.multipleArr.concat([
          this.multipleSelection[i].serial
        ]);
        this.officeArr = this.officeArr.concat([
          this.multipleSelection[i].suboffice
        ]);
        this.policeArr = this.policeArr.concat([
          this.multipleSelection[i].policestation
        ]);
        this.backstatusArr = this.backstatusArr.concat([
          this.multipleSelection[i].backstatus
        ]);
      }
      console.log("this.officeArr==", this.officeArr);
      console.log("this.policeArr==", this.policeArr);
    },
    //判断数组元素是否完全相等
    isAllEqual(array) {
      return !array.some(function(value) {
        return value !== array[0];
      });
    },
    //判断数组元素是否为空
    isArrEmpty(array) {
      return !array.some(function(value) {
        return value == undefined;
      });
    },
    //判断数组元素是否有值
    isArrValue(array) {
      return !array.some(function(value) {
        return value !== undefined;
      });
    },
    // 查询列表
    getTable() {
      let pdAdd = {
        jb: this.$store.state.user.jb,
        bmbh: this.$store.state.user.bmbh,
        clzt: this.clzt,
        cljg: this.page
      };
      this.cx.pd = Object.assign({}, this.cx.pd, pdAdd);
      this.$api.post(
        this.$api.aport2 + "/issueData/getIssueDataPage",
        this.cx,
        r => {
          this.tableData.list = r.list;
          this.tableData.total = r.total;
        }
      );
    },
    //批量操作按钮  data==按钮名字
    plFnc(data) {
      if (this.multipleArr.length == 0) {
        this.$message({
          message: "请先选择数据！",
          type: "warning"
        });
        return false;
      }
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      if (data.py == "sb") {
        let p = {
          serialList: this.multipleArr,
          bmbh: this.$store.state.user.bmbh,
          jb: this.$store.state.user.jb,
          userId: this.$store.state.user.userId
        };
        this.$api.post(
          this.$api.aport2 + "/issueData/reportDataSuboffice",
          p,
          r => {
            this.$message({
              message: r.message,
              type: "success"
            });
            this.getTable();
            this.selection=[];
          }
        );
      } else if (data.py == "xf") {
        this.dialogData = {};
        if (this.page == '1') {
          // if (!this.isArrEmpty(this.officeArr)) {
          //   //市局下发分局 如果选择数据分局有空值 不允许下发
          //   this.$message({
          //     message: "分局不能为空！",
          //     type: "warning"
          //   });
          //   return false;
          // }
          this.labelData = this.$cdata.zxhc.zxhc.xfSContent;
          this.isShowDialog = true;
        } else if (this.page == '2') {
          if (!this.isAllEqual(this.officeArr)) {
            //分局下发 选择数据的分局必须为同一分局
            this.$message({
              message: "必须选择同一分局！",
              type: "warning"
            });
            return false;
          }

          // if (!this.isArrValue(this.backstatusArr)) {
          //   //分局下发 选择数据已处理过走访状态不能下发
          //   this.$message({
          //     message: "已走访的数据不能再下发！",
          //     type: "warning"
          //   });
          //   return false;
          // }
          if((!this.isArrEmpty(this.policeArr)&&!this.isArrValue(this.policeArr))){
            //派出所空值和有值同时存在
            this.$message({
              message: "不支持多所混发！",
              type: "warning"
            });
            return false;
          }else if(!this.isArrEmpty(this.policeArr)){
            //都是空值
            this.$store.dispatch("aGetPolice",this.officeArr[0].slice(0, 6));
            this.labelData = this.$cdata.zxhc.zxhc.xfFContent;
            this.isShowDialog = true;
          }else if(!this.isArrValue(this.policeArr)){
            //都有值
            let p = {
            // suboffice:this.officeArr[0],
              serialList:this.multipleArr,
              jb:this.$store.state.user.jb,
              bmbh:this.$store.state.user.bmbh,
              userId:this.$store.state.user.userId
            };
            this.$api.post(this.$api.aport2 + "/issueData/issueDataTrigger", p, r => {
              this.$message({
                message: r.message,
                type: "success"
              });
              this.getTable();
              this.selection=[];
            });
          }
          
          // console.log(this.isArrEmpty(this.officeArr, this.policeArr));
          // console.log(this.isAllEqual(this.policeArr));
          
        }
        
      }
    },
    //列表内按钮
    blFnc(data) {
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if (data.btn.button_type == "edit") {
        this.$cdata.zxhc.editShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
          this.labelData = data;
        });
        this.$store.dispatch("aGetBackstatus", data.data.datatype);
        this.isShowDialog = true;
        if(data.data.backstatus){
          this.joinFlag = false
        }else{
          this.joinFlag = true
        }
        this.dialogData = Object.assign({},data.data);
      }
    },
    //编辑保存
    editSave(data) {
      console.log()
      if((data.backstatus)&&(data.suboffice==''||data.suboffice==undefined)){
        this.$message({
          message: '走访状态有值的状态下，所属分局不能为空！',
          type: "warning"
        });
        return false
      }
      if((data.backstatus)&&(data.policestation==''||data.policestation==undefined)){
        this.$message({
          message: '走访状态有值的状态下，所属派出所不能为空！',
          type: "warning"
        });
        return false
      }
      if((data.backstatus)&&(data.turnoutarea==''||data.turnoutarea==undefined)){
        this.$message({
          message: '走访状态有值的状态下，所属责任区不能为空！',
          type: "warning"
        });
        return false
      }
      let p = data;
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      p.pageData ={
        clzt:this.page,
      }
      this.$api.post(this.$api.aport2 + "/issueData/updateIssueData", p, r => {
        this.$message({
          message: r.message,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    //下发保存
    xfSave(data) {
      let p = data;
      p.serialList = this.multipleArr;
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      this.$api.post(this.$api.aport2 + "/issueData/issueDataTrigger", p, r => {
        this.$message({
          message: r.message,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
        this.selection = [];
      });
    },
    //列表tab切换  data==page 从1开始 控制按钮是否出现 v-for 和 v-if不能同时使用
    tabFnc(data) {
      this.page = data;
      this.cx.pageNum = 1;
      this.selection = [];
      this.getTable();
    },
    //弹窗保存
    dialogSave(data) {
      if (data.type == "edit") {
        this.editSave(data.data);
      } else if (data.type == "xf") {
        this.xfSave(data.data);
      }
    }
  }
};
</script>
<style scoped>
</style>