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
        :lbData="lbData"
        :isSelect="isSelect"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :isTab="isTab"
        :lbTab="lbTab"
        :tableData="tableData"
        :selection="selection"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @tabFnc="tabFnc"
        @blFnc="blFnc"
        @userRole="userRole"
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
      plBtn: this.$cdata.zxhc.zxhc.plBtn,
      lbTab: this.$cdata.zxhc.zxhc.lbTab,
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
      page: 1,
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
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: []
    };
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
      } else if (this.$store.state.user.jb == '2') {
        this.$store.dispatch("aGetPolice",this.$store.state.user.bmbh.slice(0, 6));
      } else if (this.$store.state.user.jb == '3') {
        this.$store.dispatch("aGetPolice",this.$store.state.user.bmbh);
      }  
      this.$store.dispatch("aGetDatatype");
      // this.$store.dispatch("aGetBackstatus");
      this.$cdata.zxhc.plBtnShow(this.page).then(data => {
        this.plBtn = data;
      });
      this.getTable();
    });
  },
  methods: {
    cxFnc(data) {
      this.cx.pd = data;
      this.getTable();
    },
    tabTopClick1(){
      this.clzt=1;
      this.page=1;
      this.lbTab=this.$cdata.zxhc.zxhc.lbTab;
      this.$cdata.zxhc.plBtnShow(this.page,this.clzt).then(data => {
        this.plBtn = data;
      });
      this.getTable()
    },
    tabTopClick2(){
      this.clzt=2;
      this.page=1;
      this.lbTab=this.$cdata.zxhc.zxhc.lbTab1;
      this.$cdata.zxhc.plBtnShow(this.page,this.clzt).then(data => {
        this.plBtn = data;
      });
      this.getTable()
    },
    rowClick(data){
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
        this.$store.dispatch("aGetPolice",data.data.slice(0,6));
      }
    },
    //弹窗form下拉框联动
    formLcFnc(data) {
      if (data.key.dm == "datatype") {
        this.$store.dispatch("aGetBackstatus", data.data).then(() => {});
      }
      if(data.key.dm == "suboffice") {
        this.$store.dispatch("aGetPolice",data.data.slice(0,6));
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
    userRole(data) {
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
        this.$api.root1 + "/issueData/getIssueDataPage",
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
      this.dialogTitle = data.button_name;
      this.dialogType = data.button_type;
      if (data.button_type == "sb") {
        let p = {
          serialList: this.multipleArr,
          bmbh: this.$store.state.user.bmbh,
          jb: this.$store.state.user.jb,
          userId: this.$store.state.user.userId
        };
        this.$api.post(
          this.$api.root1 + "/issueData/reportDataSuboffice",
          p,
          r => {
            this.$message({
              message: r.message,
              type: "success"
            });
            this.getTable();
          }
        );
      } else if (data.button_type == "xf") {
        this.dialogData = {};
        if (this.page == 1) {
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
        } else if (this.page == 2) {
          if (!this.isAllEqual(this.officeArr)) {
            //分局下发 选择数据的分局必须为同一分局
            this.$message({
              message: "必须选择同一分局！",
              type: "warning"
            });
            return false;
          }

          if (!this.isArrValue(this.backstatusArr)) {
            //分局下发 选择数据已处理过走访状态不能下发
            this.$message({
              message: "已走访的数据不能再下发！",
              type: "warning"
            });
            return false;
          }
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
            this.$api.post(this.$api.root1 + "/issueData/issueDataTrigger", p, r => {
              this.$message({
                message: r.message,
                type: "success"
              });
              this.getTable();
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
        this.dialogData = Object.assign({},data.data);
      }
    },
    //编辑保存
    editSave(data) {
      let p = data;
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      this.$api.post(this.$api.root1 + "/issueData/updateIssueData", p, r => {
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
      this.$api.post(this.$api.root1 + "/issueData/issueDataTrigger", p, r => {
        this.$message({
          message: r.message,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    //列表tab切换  data==page 从1开始 控制按钮是否出现 v-for 和 v-if不能同时使用
    tabFnc(data) {
      this.page = data;
      this.$cdata.zxhc.plBtnShow(this.page,this.clzt).then(data => {
        this.plBtn = data;
      });
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