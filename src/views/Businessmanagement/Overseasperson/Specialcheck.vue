<template>
  <div class="page">
    <Inquire 
      :cxData="cxData" 
      :facxData="facxData" 
      :pd="cx.pd" 
      :cxPara="cx"
      @cxFnc="cxFnc" 
      @lcFnc="lcFnc" 
      @queryShowFnc="queryShowFnc"
      @commandfnc="commandfnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" @click="tabTopClick1">
        <img :src="clzt==1?tabImgActive_1:tabImg_1" alt />
        <span>未走访</span>
      </div>
      <div class="tab-top-item hand ml--33" @click="tabTopClick2">
        <img :src="clzt==2?tabImgActive_2:tabImg_2" alt />
        <span class="t-leftT">已走访</span>
      </div>
    </div>
    <div class="page-box">
      <Table
        :page="page"
        :clzt="clzt"
        :lbData="lbData"
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
        :expUrl="$api.aport2+''"
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
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false" :class="{'hczf-dia':dialogType == 'edit'}">
      <Form
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
      joinFlag: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
      isEditBtn: true,
      commonBtn: true,
      isDb: false,
      dbBtn: this.$cdata.zxhc.zxhc.dbBtn,
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
    };
  },
  watch: {
    page(val) {
      if (this.clzt == 1) {
        //未处理
        if (val == "1") {
          this.plBtn = this.$store.state.plBtn;
          this.lbData = this.jbData.length==0?this.$cdata.zxhc.zxhc.lb:this.jbData;
          this.plBtn = this.plBtn.filter(item => ['sb'].indexOf(item.py) == -1);
        } else if (val == "2") {
          this.plBtn = this.$store.state.plBtn;
        } else if (val == "3") {
          this.plBtn = this.$store.state.plBtn;
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
          this.getTable();
        });
      });
  },
  methods: {
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
      if(!flag){//快速查询
        this.cxQ.pd.clzt = this.clzt;
        this.cxQ.pd.cljg =this.page;
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
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
      this.getTable(true);
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
      this.getTable(true);
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
      this.getTable(true);
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
      if (val) {
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
            this.getTable();
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
      if(data.double){//双击打开
        this.dialogType = 'edit'
        this.dialogTitle = '处理'
      }else{
        this.dialogTitle = data.btn.button_name;
        this.dialogType = data.btn.button_type;
      }
      this.$cdata.zxhc
        .editShow(this.$store.state.user.jb, data.data.whetherUpdateState)
        .then(data => {
          this.labelData = data;
        });
      this.$store.dispatch("aGetBackstatus", data.data.datatype);
      if (data.data.suboffice) {
        this.$store.dispatch("aGetssdw", { bmbh: data.data.suboffice, type: "sspcs" });
      }
      if (data.data.policestation) {
        this.$store.dispatch("aGetssdw", { bmbh: data.data.policestation, type: "zrq" });
      }
      if (this.dialogType == "edit") {
        this.getTimeData(data.data.serial)

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
              .innerBtn(data.data.whetherUpdateState, this.page)
              .then(data => {
                this.dbBtn = data;
              });
          }
        } else {
          //未走访
          this.isEditBtn = true;
          this.commonBtn = false;
          this.isDb = true;
          this.$cdata.zxhc.innerBtn("2", this.page).then(data => {
            this.dbBtn = data;
          });
        }
        this.isShowDialog = true;
        if (data.data.backstatus) {
          this.joinFlag = false;
        } else {
          this.joinFlag = true;
        }
        this.dialogData = Object.assign({}, data.data);
      } else if (this.dialogType == "detail") {
        this.isEditBtn = false;
        this.commonBtn = true;
        this.isDb = false;
        this.dialogData = Object.assign({}, data.data);
        this.isShowDialog = true;
      }else if(this.dialogType == "back"){
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
        this.getTable();
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
        console.log("上报保存", p);
        if (
          (((this.dialogData.datatype == "1" &&
            (this.dialogData.backstatus == "zfzt_1" ||
              this.dialogData.backstatus == "zfzt_2")) ||
            (this.dialogData.datatype == "2" &&
              this.dialogData.backstatus == "zfzt_1" ||
              this.dialogData.backstatus == "zfzt_2" ||
              this.dialogData.backstatus == "zfzt_5" )) &&
            (this.dialogData.suboffice == "" ||
              this.dialogData.suboffice == undefined)) ||
          (((this.dialogData.datatype == "1" &&
            (this.dialogData.backstatus == "zfzt_1" ||
              this.dialogData.backstatus == "zfzt_2")) ||
            (this.dialogData.datatype == "2" &&
              this.dialogData.backstatus == "zfzt_1" ||
              this.dialogData.backstatus == "zfzt_2" ||
              this.dialogData.backstatus == "zfzt_5" )) &&
            (this.dialogData.policestation == "" ||
              this.dialogData.policestation == undefined)) ||
          (((this.dialogData.datatype == "1" &&
            (this.dialogData.backstatus == "zfzt_1" ||
              this.dialogData.backstatus == "zfzt_2")) ||
            (this.dialogData.datatype == "2" &&
              this.dialogData.backstatus == "zfzt_1" ||
              this.dialogData.backstatus == "zfzt_2" ||
              this.dialogData.backstatus == "zfzt_5" )) &&
            (this.dialogData.turnoutarea == "" ||
              this.dialogData.turnoutarea == undefined))
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
              this.getTable();
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
        this.getTable();
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
      } else if (this.page == "2") {
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
          this.getTable();
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
        cljg: this.page
      };
      this.$api.post(this.$api.aport2 + "/issueData/updateReportData", p, r => {
        this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.getTable();
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
      p.cljg = this.page;
      p.clzt = this.clzt;
      this.$api.post(this.$api.aport2 + "/issueData/issueDataTrigger", p, r => {
        this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.getTable();
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