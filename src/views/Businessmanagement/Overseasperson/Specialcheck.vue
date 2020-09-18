<template>
  <div class="page">
    <Inquire 
      :cxData="cxData" 
      :cxShow="cxShow"
      :facxData="facxData" 
      :pd="cx.pd" 
      :cxPara="cx"
      @cxFnc="cxFnc" 
      @lcFnc="lcFnc" 
      @tagClickFnc="tagClickFnc"
      @queryShowFnc="queryShowFnc"
      @commandfnc="commandfnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" :class="clzt==1?'tabImgActive_1':'tabImg_1'" @click="tabTopClick1">
        未走访
        <!-- <img :src="clzt==1?tabImgActive_1:tabImg_1" alt />
        <span>未走访</span> -->
      </div>
      <div class="tab-top-item hand" :class="clzt==2?'tabImgActive_2':'tabImg_2'" @click="tabTopClick2">
        已走访
        <!-- <img :src="clzt==2?tabImgActive_2:tabImg_2" alt />
        <span class="t-leftT">已走访</span> -->
      </div>
    </div>
    <div class="page-box">
      <Table
        :page="page"
        :clzt="clzt"
        :lbData="lbData"
        :colorDes="colorDes"
        :lbControlData="lbControlData"
        :isSelect="isSelect"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :isTab="isTab"
        :lbTab="lbTab"
        :tableData="tableData"
        :refName="'hczf'"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        :czWidth="'100'"
        :clearSort="clearSort"
        :expData="cx"
        :key="timer"
        :expUrl="$api.aport2+'/issueData/exportIssueData'"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @tabFnc="tabFnc"
        @blFnc="blFnc"
        @SelectionChange="SelectionChange"
        @rowClick="rowClick"
        @rowDbClick="blFnc"
        @sortChange="sortChange"
        @transSaveFnc="transSaveFnc"
      ></Table>
    </div>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false" 
    :top="dialogType=='edit'||dialogType=='ck'?'3vh':'15vh'" :class="{'hczf-dia':dialogType == 'edit'}">
      <Form
        :key="new Date().getTime()"
        :cxData="labelData"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :joinFlag="joinFlag"
        :isEditBtn="isEditBtn"
        :commonBtn="commonBtn"
        :isDb="isDb"
        :dbBtn="dbBtn"
        :page="page"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
        @formLcFnc="formLcFnc"
        @radioChange="radioChange"
        @dbFnc="dbFnc"
        class="hczf-wid"
      ></Form>
      <Timeline 
      v-if="dialogType == 'edit'"
      :cxData="timeData"
      style="width:34%"></Timeline>
    </Dialog>
    <Dialog :isShowDialog="innerVisible" :title="indialogTitle" @hideDialog="innerVisible=false">
      <Form
        v-if="innerVisible"
        :cxData="inlabelData"
        :dialogType="indialogType"
        :dialogData="indialogData"
        :commonBtn="incommonBtn"
        :isDb="inisDb"
        @dialogCancel="innerVisible=false"
        @dialogSave="indialogSave"
        @formLcFnc="informLcFnc"
      ></Form>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import Form from "@/components/Form.vue";
import Timeline from "@/components/Timeline.vue"
export default {
  components: {
    Inquire,
    Table,
    Dialog,
    Form,
    Timeline
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
      cxShow:false,
      colorDes:[],
      cxData: this.$cdata.zxhc.zxhc.cx,
      facxData: this.$cdata.zxhc.zxhc.facx,//快速查询项
      lbData: this.$cdata.zxhc.zxhc.lb,
      lbControlData:this.$cdata.zxhc.zxhc.lb,//简表里有需要隐藏显示的列表项，用此数据控制
      lbBtn: this.$cdata.zxhc.zxhc.lbBtn,
      plBtn: this.$store.state.plBtn,
      lbTab: this.$cdata.zxhc.zxhc.lbTab,
      pageSizeArr: [15, 100, 500],
      //业务数据
      cx: {
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      cxQ:{
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
      page: "1",
      clzt: 1,
      multipleSelection: [],
      multipleArr: [],
      officeArr: [],
      policeArr: [],
      backstatusArr: [],
      selection: [],
      changeK: "",
      seriFlag: "", //唯一标识
      //弹窗数据
      isShowDialog: false,
      joinFlag: true,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
      isEditBtn: true,
      commonBtn: true,
      isDb: false,
      dbBtn: this.$cdata.zxhc.zxhc.dbBtn,
      currentCus:[],
      // 内联弹窗
      innerVisible: false,
      indialogTitle: "",
      inlabelData: [],
      indialogType: "",
      indialogData: {},
      incommonBtn: true,
      inisDb: false,
      //时间轴
      timeData:{},
      jbData:[],

      userIt:{},
      timer:'',
    };
  },
  watch: {
    $route:{
      handler(val){
        // console.log('val==',val,val.query.turn)
        if(val.query.turn == 'Specialcheck'){
          // console.log('val.query.page==',val.query.page)
          this.plBtn = this.$store.state.plBtn;
          if(val.query.page == '1'){
            this.plBtn = this.plBtn.filter(item => ['sb'].indexOf(item.py) == -1);
            this.lbData = this.jbData.length==0?this.$cdata.zxhc.zxhc.lb:this.jbData;
          }else if(val.query.page == '3'){
            this.plBtn = this.plBtn.filter(item => ['sb','xf'].indexOf(item.py) == -1);
            this.lbData = this.lbData.filter(item => ['datasources_desc'].indexOf(item.dm) == -1);
          }else if(val.query.page == '2'){
            this.plBtn = this.plBtn.filter(item => ['sb'].indexOf(item.py) == -1);
            this.lbData = this.lbData.filter(item => ['datasources_desc'].indexOf(item.dm) == -1);
          }
          this.$cdata.zxhc.lbTabShow(this.$store.state.user.jb).then(data => {
            this.lbTab = data.lbTab;
            this.page = val.query.page
            this.cx.pageNum = 1;
            this.selection = [];
            this.queryShowFnc(this.cxShow);
            this.getColorDes()
          });
        }
      },
      deep:true,
      immediate: true
    },
    page(val) {
      if (this.clzt == 1) {
        //未处理
        this.plBtn = this.$store.state.plBtn;
        if (val == "1") {
          this.lbData = this.jbData.length==0?this.$cdata.zxhc.zxhc.lb:this.jbData;
          this.plBtn = this.plBtn.filter(item => ['sb'].indexOf(item.py) == -1);
        } else if(val == "2"){  
          this.plBtn = this.plBtn.filter(item => ['sb'].indexOf(item.py) == -1);
        }else if (val == "5") {   
          this.plBtn = this.plBtn.filter(item => ['xf'].indexOf(item.py) == -1);
        } else if (val == "3") {   
          this.plBtn = this.plBtn.filter(item => ['sb','xf'].indexOf(item.py) == -1);
        }
      }else{
        if(val == 1){
          this.lbData = this.jbData.length==0?this.$cdata.zxhc.zxhc.lb:this.jbData;
        }
      }
    }
  },
  mounted() {
      this.$store.dispatch("aGetNation");
      this.$store.dispatch("aGetGender");
      this.$store.dispatch("aGetPassport");
      this.$store.dispatch("aGetDatatype");
      this.getSpInit();
      this.$nextTick(() => {
        console.log('mount',this.jbData)
        this.plBtn=this.$store.state.plBtn;
        this.plBtn = this.plBtn.filter(item => ['sb'].indexOf(item.py) == -1);
        this.$cdata.zxhc.lbTabShow(this.$store.state.user.jb).then(data => {
          this.lbTab = data.lbTab;
          this.page = this.lbTab[0].dm;
          if(this.$route.query.page){
            this.page = this.$route.query.page
            this.timer = new Date().getTime()//路由切换时 page变，重新请求Table组件 使page渲染
            this.getColorDes()
          }
          this.getTable();
          this.getColorDes();
        });
      });
  },
  methods: {
    getColorDes(){
      this.$api.post(this.$api.aport2+'/issueTimeControl/getIssueTimeControlShAndBzList',{dwjb:this.page},r=>{
        this.colorDes = r
      })
    },
    getSpInit(){
      this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(data => {
        this.$store.dispatch("aGetssdw", {
          bmbh: "320500000000",
          type: "ssfj"
        });
        if (this.$store.state.user.jb == 2) {
          if(data.fj){
            this.cx.pd.suboffice = data.fj
          }else{
            this.cx.pd.suboffice = data.bmbh
          }
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "sspcs" });
          this.cx.pd.subofficedis = true;
        } else if (this.$store.state.user.jb == 3) {
          this.$store.dispatch("aGetssdw", { bmbh: data.fj, type: "sspcs" });
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "zrq" });
          this.cx.pd.suboffice = data.fj;
          this.cx.pd.policestation = data.bmbh;
          this.cx.pd.subofficedis = true;
          this.cx.pd.policestationdis = true;
        }
      });
    },
    //时间轴
    getTimeData(serial){
      this.$api.post(this.$api.aport2+'/issueDataZfjl/getIssueDataZfjlList',{serial:serial},r=>{
        this.timeData = r;
      })
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.jbData = data
      this.lbData = data
      console.log('djkjdd',data)
    },
    //查询条件转换查询
    queryShowFnc(flag){
      this.cxShow = flag;
      if(!flag){//快速查询
        this.cxQ.pd.clzt = this.clzt;
        this.cxQ.pd.cljg =this.page;
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
    },
    tagClickFnc(data){
      this.cxQ.pd.clzt = this.clzt;
      this.cxQ.pd.cljg =this.page;
      for(var key in data.para){
        this.cxQ.pd[data.para[key].dmx] = data.para[key].dm;
      }
      this.getTable(true,this.cxQ)
    },
    //筛选条件 快速查询
    commandfnc(data){
      if(data.data=='datatype'){
        this.$store.dispatch("aGetBackstatus",data.command).then(() => {});
      }
      this.cxQ.pd.clzt = this.clzt;
      this.cxQ.pd.cljg =this.page;
      for(var key in data.obj){
        this.cxQ.pd[data.obj[key].dmx] = data.obj[key].dm;
      }
      this.getTable(true,this.cxQ)
    },
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    tabTopClick1() {
      this.clzt = 1;
      this.cx.pageNum = 1;
      this.$cdata.zxhc.lbTabShow(this.$store.state.user.jb).then(data => {
        this.lbTab = data.lbTab;
        this.page = this.lbTab[0].dm;
      });
      this.plBtn = this.$store.state.plBtn;
      this.plBtn = this.plBtn.filter(item => ['sb'].indexOf(item.py) == -1);
      this.queryShowFnc(this.cxShow);
      // this.getTable(true);
    },
    tabTopClick2() {
      this.clzt = 2;
      this.cx.pageNum = 1;
      this.$cdata.zxhc.lbTabShow(this.$store.state.user.jb).then(data => {
        this.lbTab = data.lbTab1;
        this.page = this.lbTab[0].dm;
      });
      this.plBtn = this.$store.state.plBtn;
      this.plBtn = this.plBtn.filter(item => ['sb','xf'].indexOf(item.py) == -1);
      this.queryShowFnc(this.cxShow);
      // this.getTable(true);
    },
    //列表tab切换  data==page 从1开始 控制按钮是否出现 v-for 和 v-if不能同时使用
    tabFnc(data) {
      this.page = data;
      if(this.page!='1'){
        this.lbData = this.lbData.filter(item => ['datasources_desc'].indexOf(item.dm) == -1);
      }else{
        this.lbData = this.jbData.length==0?this.$cdata.zxhc.zxhc.lb:this.jbData;
      }
      this.cx.pageNum = 1;
      this.selection = [];
      this.queryShowFnc(this.cxShow);
      this.getColorDes();
      // this.getTable(true);
    },
    rowClick(data) {
      console.log(data)
      // this.selection = [];
      // this.selection.push(data.data);
    },
    //下拉框联动
    lcFnc(data) {
      if (data.key.dm == "datatype") {
        if (data.data == "") {
          this.$store.state.backstatus = [];
          data.obj.backstatus = "";
        } else {
          this.$store.dispatch("aGetBackstatus", data.data).then(() => {});
        }
      }
      if (data.key.dm == "suboffice") {
        if (data.data == "") {
          data.obj.policestation = "";
        }
        if (data.obj.policestation) {
          data.obj.policestation = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs" });
      }
    },
    //弹窗form下拉框联动
    formLcFnc(data) {
      if (data.key.dm == "datatype") {
        this.$store.dispatch("aGetBackstatus", data.data).then(() => {});
      }
      if (data.key.dm == "suboffice") {
        if (data.data == "") {
          data.obj.policestation = "";
        }
        if (data.obj.policestation) {
          data.obj.policestation = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs" });
      }
      if (data.key.dm == "policestation") {
        if (data.data == "") {
          data.obj.turnoutarea = "";
        }
        if (data.obj.turnoutarea) {
          data.obj.turnoutarea = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "zrq" });
      }
    },
    informLcFnc(data) {
      if (data.key.dm == "suboffice") {
        if (data.data == "") {
          data.obj.policestation = "";
        }
        if (data.obj.policestation) {
          data.obj.policestation = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs" });
      }
      if (data.key.dm == "policestation") {
        if (data.data == "") {
          data.obj.turnoutarea = "";
        }
        if (data.obj.turnoutarea) {
          data.obj.turnoutarea = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "zrq" });
      }
    },
    radioChange(val) {
      console.log('变化',val)
      if (val) {//有值 可填
        if (this.joinFlag == true) {
          this.joinFlag = false;
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
      console.log("this.multipleSelection", this.multipleSelection);
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
      // console.log("this.officeArr==", this.officeArr);
      // console.log("this.policeArr==", this.policeArr);
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
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
    },
    // 查询列表
    getTable(flag,pdQ) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.cx.pd.jb = this.$store.state.user.jb;
      this.cx.pd.bmbh = this.$store.state.user.bmbh;
      this.cx.pd.clzt = this.clzt;
      this.cx.pd.cljg = this.page;
      this.$api.post(
        this.$api.aport2 + "/issueData/getIssueDataPage",
        pdQ||this.cx,
        r => {
          this.tableData.list = r.list;
          this.tableData.total = r.total;
        }
      );
    },
    //批量操作按钮  data==按钮名字
    plFnc(data) {
      this.isEditBtn = true;
      this.commonBtn = true;
      this.isDb = false;
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      if (data.py == "sb") {
        if (this.multipleArr.length == 0) {
        this.$message({
          message: "请先选择数据！",
          duration: 13000,
          showClose: true,
          type: "warning"
        });
        return false;
      }
        //批量上报
        let p = {
          serialList: this.multipleArr,
          bmbh: this.$store.state.user.bmbh,
          jb: this.$store.state.user.jb,
          userId: this.$store.state.user.userId,
          cljg: this.page,
          clzt: this.clzt
        };
        this.$api.post(
          this.$api.aport2 + "/issueData/reportDataSuboffice",
          p,
          r => {
            this.$message({
              message: r.message,
              duration: 8000,
              showClose: true,
              type: "success"
            });
            this.queryShowFnc(this.cxShow);
            this.selection = [];
          }
        );
      } else if (data.py == "xf") {
        if (this.multipleArr.length == 0) {
        this.$message({
          message: "请先选择数据！",
          duration: 13000,
          showClose: true,
          type: "warning"
        });
        return false;
      }
        //批量下发
        this.dialogData = {};
        if (this.page == "1") {
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
        } else if (this.page == "2") {
          if (!this.isAllEqual(this.officeArr)) {
            //分局下发 选择数据的分局必须为同一分局
            this.$message({
              message: "必须选择同一分局！",
              duration: 13000,
              showClose: true,
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
          // if (
          //   !this.isArrEmpty(this.policeArr) &&
          //   !this.isArrValue(this.policeArr)
          // ) {
          //   //派出所空值和有值同时存在
          //   this.$message({
          //     message: "不支持多所混发！",
          //     duration: 13000,
          //     showClose: true,
          //     type: "warning"
          //   });
          //   return false;
          // } else 
          // if (!this.isArrEmpty(this.policeArr)) {
            //都是空值
            this.$store.dispatch("aGetssdw", { bmbh: this.officeArr[0], type: "sspcs" });
            this.labelData = this.$cdata.zxhc.zxhc.xfFContent;
            this.isShowDialog = true;
          // } 
          // else if (!this.isArrValue(this.policeArr)) {
          //   //都有值
          //   let p = {
          //     // suboffice:this.officeArr[0],
          //     serialList: this.multipleArr,
          //     jb: this.$store.state.user.jb,
          //     bmbh: this.$store.state.user.bmbh,
          //     userId: this.$store.state.user.userId,
          //     cljg: this.page,
          //     clzt: this.clzt
          //   };
          //   this.$api.post(
          //     this.$api.aport2 + "/issueData/issueDataTrigger",
          //     p,
          //     r => {
          //       this.$message({
          //         message: r.message,
          //         duration: 8000,
          //         showClose: true,
          //         type: "success"
          //       });
          //       this.getTable();
          //       this.selection = [];
          //     }
          //   );
          // }
          // console.log(this.isArrEmpty(this.officeArr, this.policeArr));
          // console.log(this.isAllEqual(this.policeArr));
        }
      }
    },
    //列表内按钮
    blFnc(data) {
      this.seriFlag = data.data.serial;
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if(data.double){//双击打开
        if(data.data.whetherUpdateState == 0){//详情
          this.dialogType = 'ck'
          this.dialogTitle = '详情'
        }else{
          this.dialogType = 'edit'
          this.dialogTitle = '处理'
        }
      }
      if(data.data.datatype=='3'||data.data.datatype=='4'||data.data.datatype=='5'){//专项核查 把自定义项插入
        if(data.data.issueDataFeedbackList){//存在自定义项
          this.$cdata.zxhc.editShow(this.$store.state.user.jb, data.data.whetherUpdateState).then(label => {
            label.splice(16,0,{'issueDataFeedbackList':JSON.parse(data.data.issueDataFeedbackList)},{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
            this.labelData = label;
          });
        }else{
          this.$cdata.zxhc.editShow(this.$store.state.user.jb, data.data.whetherUpdateState).then(label => {//不存在自定义项，只渲染时间，默认0
            label.splice(16,0,{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
            this.labelData = label;
          });
        }
      }else{
        this.$cdata.zxhc.editShow(this.$store.state.user.jb, data.data.whetherUpdateState).then(data => {
          this.labelData = data;
        });
      }
      this.$store.dispatch("aGetBackstatus", data.data.datatype);
      if (data.data.suboffice) {
        this.$store.dispatch("aGetssdw", { bmbh: data.data.suboffice, type: "sspcs" });
      }
      if (data.data.policestation) {
        this.$store.dispatch("aGetssdw", { bmbh: data.data.policestation, type: "zrq" });
      }
      if (this.dialogType == "edit" || this.dialogType == "ck") {
        this.getTimeData(data.data.serial)//时间轴
        if (this.clzt == 2) {
          //已走访
          if (data.data.whetherUpdateState == "0") {
            //whetherUpdateState 0:不可修改；1：可修改；
            this.isEditBtn = false;
            this.commonBtn = true;
            this.isDb = false;
          } else {
            //已走访 可处理
            this.isEditBtn = false;
            this.commonBtn = true;
            this.isDb = true;
            this.$cdata.zxhc
              .innerBtn(data.data.whetherUpdateState, this.page,data.data.datatype,data.data.backstatus_desc,data.data.statusName)
              .then(data => {
                this.dbBtn = data;
              });
          }
        } else {
          //未走访
          this.isEditBtn = true;
          this.commonBtn = false;
          this.isDb = true;
          this.$cdata.zxhc.innerBtn("2", this.page,data.data.datatype,data.data.backstatus_desc,data.data.statusName).then(data => {
            this.dbBtn = data;
          });
        }
        this.isShowDialog = true;
        if (data.data.backstatus) {
          this.joinFlag = false;
        } else {
          data.data.backstatus = ''
          this.joinFlag = true;
        }
        if(data.data.datatype=='3'||data.data.datatype=='4'||data.data.datatype=='5'){//专项核查自定义  唯一id为默认值
          if(data.data.issueDataFeedbackList){//存在自定义选项
            let cusArr = JSON.parse(data.data.issueDataFeedbackList)
            this.currentCus = JSON.parse(data.data.issueDataFeedbackList)
            for(var i=0;i<cusArr.length;i++){
              data.data[cusArr[i].serial] = {
                serial:cusArr[i].serial,
              }
              if(cusArr[i].value){//回填
                this.$set(data.data[cusArr[i].serial],'value',cusArr[i].type=='checkbox'?JSON.parse(cusArr[i].value):cusArr[i].type=='text'?cusArr[i].value:parseInt(cusArr[i].value))
              }else{//渲染
                this.$set(data.data[cusArr[i].serial],'value',cusArr[i].type=='checkbox'?[]:'')
              }
            }
          } 
          if(!data.data.issue_time){data.data.issue_time='0'}//反馈时间回填  没有反馈时间默认0
          this.dialogData = Object.assign({}, data.data);
        }else{
          this.dialogData = Object.assign({}, data.data);
        }
      } 
      // else if (this.dialogType == "detail") {
      //   this.isEditBtn = false;
      //   this.commonBtn = true;
      //   this.isDb = false;
      //   this.dialogData = Object.assign({}, data.data);
      //   this.isShowDialog = true;
      // }
      else if(this.dialogType == "back"){
        this.$confirm('是否回退本条数据？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let p={
            serial:data.data.serial,
            jb : this.$store.state.user.jb,
            bmbh : this.$store.state.user.bmbh,
            userId : this.$store.state.user.userId,
          }
          this.$api.post(this.$api.aport2 + "/issueData/updateReportDataByZfzt",p,r=>{
            this.$message({
              message: r.message,
              duration: 8000,
              showClose: true,
              type: "success"
            });
            this.queryShowFnc(this.cxShow);
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消回退'
          })
        })
      }
    },
    //编辑保存 (废)
    editSave(data) {
      if (
        ((data.datatype == "1" &&
          (data.backstatus == "zfzt_1" || data.backstatus == "zfzt_2")) ||
          (data.datatype == "2" && data.backstatus == "zfzt_1")) &&
        (data.suboffice == "" || data.suboffice == undefined)
      ) {
        this.$message({
          message: "此走访状态下，所属分局不能为空！",
          duration: 13000,
          showClose: true,
          type: "warning"
        });
        return false;
      }
      if (
        ((data.datatype == "1" &&
          (data.backstatus == "zfzt_1" || data.backstatus == "zfzt_2")) ||
          (data.datatype == "2" && data.backstatus == "zfzt_1")) &&
        (data.policestation == "" || data.policestation == undefined)
      ) {
        this.$message({
          message: "此走访状态下，所属派出所不能为空！",
          duration: 13000,
          showClose: true,
          type: "warning"
        });
        return false;
      }
      if (
        ((data.datatype == "1" &&
          (data.backstatus == "zfzt_1" || data.backstatus == "zfzt_2")) ||
          (data.datatype == "2" && data.backstatus == "zfzt_1")) &&
        (data.turnoutarea == "" || data.turnoutarea == undefined)
      ) {
        this.$message({
          message: "此走访状态下，所属责任区不能为空！",
          duration: 13000,
          showClose: true,
          type: "warning"
        });
        return false;
      }
      let p = data;
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      p.pageData = {
        clzt: this.clzt
      };
      this.$api.post(this.$api.aport2 + "/issueData/updateIssueData", p, r => {
        this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    // 编辑上报 下发操作
    dbFnc(data) {
      if (data.button_type == "singXf") {
        this.indialogData = {};
        this.indialogTitle = data.button_name;
        this.indialogType = data.button_type;
        this.$cdata.zxhc.innerDia(this.page).then(data => {
          this.inlabelData = data;
        });
        this.innerVisible = true;
      }
      if (data.button_type == "singSb") {
        let p = this.dialogData;
        p.jb = this.$store.state.user.jb;
        p.bmbh = this.$store.state.user.bmbh;
        p.userId = this.$store.state.user.userId;
        p.pageData = {
          clzt: this.clzt,
          cljg: this.page
        };
        let arr=[];
        for(var i in p){
          for(var j=0;j<this.currentCus.length;j++){
            if(i == this.currentCus[j].serial){
              arr.push(p[i])
            }
          }
        }
        p.pageData.customFeedback=arr;
        console.log("上报", p);
        if(!this.dialogData.backstatus){
          this.$message({
            message: '走访状态不能为空！',
            duration: 13000,
            showClose: true,
            type: "warning"
          });
        }else if (
          (((this.dialogData.datatype == "1" &&(this.dialogData.backstatus == "zfzt_1" ||this.dialogData.backstatus == "zfzt_2")) 
          ||((this.dialogData.datatype == "2"||this.dialogData.datatype == "3" || this.dialogData.datatype == "4" || this.dialogData.datatype == "5") &&this.dialogData.backstatus == "zfzt_1" ||this.dialogData.backstatus == "zfzt_2" ||this.dialogData.backstatus == "zfzt_5" )) &&
          (this.dialogData.suboffice == "" ||this.dialogData.suboffice == undefined)) ||
          (((this.dialogData.datatype == "1" &&(this.dialogData.backstatus == "zfzt_1" ||this.dialogData.backstatus == "zfzt_2")) 
          ||((this.dialogData.datatype == "2"||this.dialogData.datatype == "3"|| this.dialogData.datatype == "4" || this.dialogData.datatype == "5") &&this.dialogData.backstatus == "zfzt_1" ||this.dialogData.backstatus == "zfzt_2" ||this.dialogData.backstatus == "zfzt_5" )) &&
          (this.dialogData.policestation == "" ||this.dialogData.policestation == undefined)) ||
          (((this.dialogData.datatype == "1" &&(this.dialogData.backstatus == "zfzt_1" ||this.dialogData.backstatus == "zfzt_2")) 
          ||((this.dialogData.datatype == "2"||this.dialogData.datatype == "3"|| this.dialogData.datatype == "4" || this.dialogData.datatype == "5") &&this.dialogData.backstatus == "zfzt_1" ||this.dialogData.backstatus == "zfzt_2" ||this.dialogData.backstatus == "zfzt_5" )) &&
          (this.dialogData.turnoutarea == "" ||this.dialogData.turnoutarea == undefined))
        ) {
          this.indialogData = {};
          this.indialogTitle = data.button_name;
          this.indialogType = data.button_type;
          this.$cdata.zxhc.innerSbDia(this.dialogData).then(data => {
            this.inlabelData = data;
          });
          this.innerVisible = true;
        } else {
          this.$api.post(
            this.$api.aport2 + "/issueData/updateReportData",
            p,
            r => {
              this.$message({
                message: r.message,
                duration: 8000,
                showClose: true,
                type: "success"
              });
              this.queryShowFnc(this.cxShow);
              this.isShowDialog = false;
              this.innerVisible = false;
              this.selection = [];
            }
          );
        }
      }else if(data.button_type == "singback"){
        let p={
          serial:this.dialogData.serial,
          jb : this.$store.state.user.jb,
          bmbh : this.$store.state.user.bmbh,
          userId : this.$store.state.user.userId,
        }
        this.$api.post(this.$api.aport2 + "/issueData/updateReportDataByZfzt",p,r=>{
          this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.isShowDialog = false;
        this.queryShowFnc(this.cxShow);
        })
      }
    },
    singXfSave(data) {
      let p = Object.assign({}, this.dialogData, data);
      if (this.page == "1") {
        //市局
        if (!data.suboffice) {
          p.suboffice = "";
          p.suboffice_desc = "";
        }
        if (!data.policestation) {
          p.policestation = "";
          p.policestation_desc = "";
        }
        if (!data.turnoutarea) {
          p.turnoutarea = "";
          p.turnoutarea_desc = "";
        }
      } else if (this.page == "2" || this.page == "5") {
        //分局
        if (!data.policestation) {
          p.policestation = "";
          p.policestation_desc = "";
        }
        if (!data.turnoutarea) {
          p.turnoutarea = "";
          p.turnoutarea_desc = "";
        }
      } else if (this.page == "3") {
        //派出所
        if (!data.turnoutarea) {
          p.turnoutarea = "";
          p.turnoutarea_desc = "";
        }
      }
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      p.sfzh = this.$store.state.user.sfzh;
      p.xm = this.$store.state.user.xm;
      p.pageData = {
        clzt: this.clzt,
        cljg: this.page
      };
      console.log("下发保存", p);
      this.$api.post(
        this.$api.aport2 + "/issueData/updateSendOutData",
        p,
        r => {
          this.$message({
            message: r.message,
            duration: 8000,
            showClose: true,
            type: "success"
          });
          this.queryShowFnc(this.cxShow);
          this.isShowDialog = false;
          this.innerVisible = false;
          this.selection = [];
        }
      );
    },
    singSbSave(data) {
      let p = Object.assign({}, this.dialogData, data);
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      p.pageData = {
        clzt: this.clzt,
        cljg: this.page,
        customFeedback:[]
      };
      let arr=[];
      for(var i in p){
        for(var j=0;j<this.currentCus.length;j++){
          if(i == this.currentCus[j].serial){
            arr.push(p[i])
          }
        }
      }
      p.pageData.customFeedback=arr;
      console.log('上报保存===',p);
      this.$api.post(this.$api.aport2 + "/issueData/updateReportData", p, r => {
        this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.queryShowFnc(this.cxShow);
        this.isShowDialog = false;
        this.innerVisible = false;
        this.selection = [];
      });
    },
    //批量下发保存
    xfSave(data) {
      let p = data;
      p.serialList = this.multipleArr;
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      p.sfzh = this.$store.state.user.sfzh;
      p.xm = this.$store.state.user.xm;
      p.cljg = this.page;
      p.clzt = this.clzt;
      this.$api.post(this.$api.aport2 + "/issueData/issueDataTrigger", p, r => {
        this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.queryShowFnc(this.cxShow);
        this.isShowDialog = false;
        this.selection = [];
      });
    },
    
    //弹窗保存
    dialogSave(data) {
      if (data.type == "edit") {
        this.editSave(data.data);
      } else if (data.type == "xf") {
        this.xfSave(data.data);
      }
    },
    // 内联弹窗保存
    indialogSave(data) {
      if (data.type == "singXf") {
        this.singXfSave(data.data);
      } else if (data.type == "singSb") {
        this.singSbSave(data.data);
      }
      console.log(data);
    }
  }
};
</script>
<style>
.hczf-dia .el-col.el-col-16{
  width: 91.66667%;
}
.hczf-dia .el-dialog__body{
  display: flex;
}
.hczf-dia .hczf-wid{
  width: 66%;
}
</style>