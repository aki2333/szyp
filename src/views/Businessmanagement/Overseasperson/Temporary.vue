<template>
  <div class="page">
    <Inquire :cxData="$cdata.lzsb.lzsb.cx" :pd="cx.pd" :cxPara="cx" @cxFnc="cxFnc" @lcFnc="lcFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" :class="cx.pd.shzt=='shzt_0'?'tabImgActive_1':'tabImg_1'" @click="tabTopClick(0)">待初审</div>
      <div class="tab-top-item hand" :class="cx.pd.shzt=='shzt_1'?'tabImgActive_2':'tabImg_2'" @click="tabTopClick(1)">初审通过</div>
      <div class="tab-top-item hand" :class="cx.pd.shzt=='shzt_2'?'tabImgActive_2':'tabImg_2'" style="margin-left:-18px" @click="tabTopClick(2)">初审不通过</div>
    </div>
    <div class="page-box">
      <el-row :gutter="20">
        <el-col :span="24">
          <Table
            :lbData="lbData"
            :isSelect="false"
            :isEdit="true"
            :isTab="isTab"
            :page="tabPage"
            :lbTab="lbTab"
            :lbBtn="lbBtn"
            :plBtn="$store.state.plBtn"
            :clearSort="clearSort"
            czWidth="130px"
            :tableData="tableData"
            :expData="cx"
            :expUrl="$api.aport3+'/api/lzsb/dataExport'"
            @tabFnc="tabFnc"
            @rowClick="rowClick"
            @pageSizeFnc="pageSizeFnc"
            @pageNumFnc="pageNumFnc"
            @blFnc="blFnc"
            @sortChange="sortChange"
            @transSaveFnc="transSaveFnc"
          ></Table>
        </el-col>
      </el-row>
    </div>
    <!-- 弹窗 -->
    <Dialog
      width="1300px"
      :isShowDialog="isShowDialog"
      :title="dialogTitle"
      @hideDialog="isShowDialog=false"
      :top="'3vh'"
    >
      <el-dialog width="50%" :visible.sync="innerVisible" append-to-body>
        <el-form :model="innerForm" :rules="rules" ref="innerForm" label-width="100px" class="tc-form">
          <el-form-item label="不通过原因" prop="shsm">
            <el-input v-model="innerForm.shsm" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="对外说辞" prop="dwsc">
            <el-radio-group v-model="innerForm.dwsc">
              <el-radio label="申报信息有误"></el-radio>
              <el-radio label="请入境后再申报临住"></el-radio>
              <el-radio label="此申报信息不符合网上申报条件，请至居住地派出所申报"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="page-btn-box">
            <el-button type="primary" @click="shwtg('innerForm')">提交</el-button>
          </div>
        </el-form>
      </el-dialog>
      <!-- v-if="(dialogType=='bj'||dialogType=='ck')&&isShowDialog" -->
      <TemporaryXQ
        :dialogType="dialogType"
        :dialogData="dialogData"
        :dialogImgData="dialogImgData"
        :cxData="$cdata.lzsb.lzsb.bj"
        ref="temp"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
        @formLcFnc="lcFnc"
      ></TemporaryXQ>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import TemporaryXQ from "./TemporaryXQE.vue";

export default {
  components: { Inquire, Table, Dialog, TemporaryXQ },
  data() {
    return {
      rules:{
        dwsc:[{ required: true, message: "此项必填", trigger: 'change' }],
      },
      isTab: false,
      lbTab: [],
      lbBtn: this.$cdata.lzsb.lzsb.lbBtn1,
      tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
      tabPage: "",
      cx: {
        pd: { shzt: "shzt_0", hczt: "hczt_0" },
        pageSize: 10,
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      clearSort:0,
      currentRow: {},
      lbData:this.$cdata.lzsb.lzsb.lb,
      // 弹窗数据,
      isShowDialog: false,
      innerVisible: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {
        checklist:[],
      },
      dialogImgData: [],
      labelData: [],
      innerForm: {
        dwsc:''
      }
    };
  },

  mounted() {
    this.$store.dispatch("aGetNation");
    this.$store.dispatch("aGetGender");
    this.$store.dispatch("aGetPassport");
    this.$store.dispatch("aGetDM", "qzzl");
    this.$store.dispatch("aGetDatatype");
    // this.$store.dispatch("aGetDM", "xzqh");
    this.$store.dispatch("aGetXzqh");//只获取苏州的行政区划
    this.$store.dispatch("aGetDM", "lz_zfzl");
    this.$store.dispatch("aGetDM", "lz_zsxz");
    this.$store.dispatch("aGetDM", "rydylb");
    this.$store.dispatch("aGetDM", "bjjgka");
    this.$store.dispatch("aGetDM", "wgr_sqsy");
    this.$store.dispatch("aGetDM", "spqfd");
    this.$store.dispatch("aGetDM", "sjly");
    this.$store.dispatch("aGetDMPro", "dm_crjbs");//出入境状态
    this.$store.dispatch("aGetDMPro", "dm_zyb");//职业
    this.$store.dispatch("aGetDMPro", "dm_jwrygxb");//境外人员关系
    
    this.getSpInit();
    this.tabTopClick(0);
    if(this.$route.query.pageA){
      this.tabTopClick(this.$route.query.pageA);
    }
  },
  watch:{
    $route:{
      handler(val){
        console.log('val==',val,val.query.turn)
        if(val.query.turn == 'Temporary'){
          console.log('pageA==',val.query.pageA)
          if(val.query.pageA==0||val.query.pageA){
            this.cx.pd.shzt = "shzt_" + val.query.pageA;
            this.tabTopClick(val.query.pageA);
          }
        }
      },
      deep:true,
      immediate:true,
    }
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
          this.cx.pd.suboffice = data.fj;
          this.cx.pd.policestation = data.bmbh;
          this.cx.pd.subofficedis = true;
          this.cx.pd.policestationdis = true;
        }
      });
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
    },
    tabTopClick(index) {
      this.cx.pd.shzt = "shzt_" + index;
      this.cx.pageNum = 1;
      if (index == 1) {
        this.isTab = true;
        this.cx.pd.hczt = "hczt_0";
        this.tabPage = "hczt_0"
        this.lbTab = this.$cdata.lzsb.lzsb.lbTab;
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn2;
      } else if (index == 0) {
        this.isTab = false;
        this.lbTab = [];
        this.cx.pd.hczt = "hczt_0";
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn1;
      } else if (index == 2) {
        this.isTab = false;
        this.lbTab = [];
        this.cx.pd.hczt = "hczt_2";
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn2;
      }
      this.getTable(true);
    },
    tabFnc(data) {
      console.log("shangbaozhuangtai", data);
      this.cx.pd.hczt = data;
      this.tabPage = data;
      this.cx.pageNum = 1;
      if (data == "hczt_1") {
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn3;
      } else {
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn2;
      }
      this.getTable(true);
    },
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      if(this.cx.pd.shzt == 'shzt_0'){
        this.tabTopClick(0)
      }else{
        this.getTable(true);
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
    //列表排序
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
    },
    // 查询列表
    getTable(flag) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.$api.post(this.$api.aport3 + "/api/lzsb/getLzsb", this.cx, r => {
        this.tableData = r;
      });
    },
    // 点击表格行
    rowClick(data) {
      this.currentRow = data.data;
    },
    lcFnc(data) {
       console.log("下拉选", data.data);
      if (data.key.dm == "suboffice") {
        if (data.data != "") {
          this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs" });
        } else {
          this.cx.pd.policestation = "";
          this.$store.commit("getsspcs", []);
        }
      }
      if (data.key.dm == "datatype") {
        if (data.data == "") {
          this.$store.state.backstatus = [];
          data.obj.backstatus = "";
        } else {
          this.$store.dispatch("aGetBackstatus", data.data).then(() => {});
        }
      }
    },

    // 表格内操作
    blFnc(data) {
      console.log("表格按钮" + data.btn.button_name, data);
      if(data.double){//双击
        if(this.cx.pd.shzt=='shzt_0'){//待审核
          this.dialogTitle = '编辑';
          this.dialogType = 'bj';
        }else{
          this.dialogTitle = '查看';
          this.dialogType = 'ck';
        }
      }else{
        this.dialogTitle = data.btn.button_name;
        this.dialogType = data.btn.button_type;
      }
      if (this.dialogType == "xzjl") {
        this.downZsdjd(data.data);
      } else if (this.dialogType == "bj") {
        let p = {
          id: data.data.id,
          spr: this.$store.state.user.userId,
          sprdw: this.$store.state.user.bmbh
        };
        this.getDetailLzsb(p);
        this.getDetailLzsbTp(data.data.id);
      } else if (this.dialogType == "ck") {
        let p = {
          id: data.data.id
        };
        this.getDetailLzsb(p);
        this.getDetailLzsbTp(data.data.id);
      }
    },
    
    // 获取详情
    getDetailLzsb(p) {
      this.$api.post(this.$api.aport3 + "/api/lzsb/getDetailLzsb", p, r => {
        this.dialogData = r;
        if(this.dialogData.checklist==undefined){
          this.dialogData.checklist=[];
        }
        console.log('===',this.dialogData)
        this.$store.dispatch("aGetssdw", { bmbh: r.suboffice, type: "sspcs" });
        this.isShowDialog = true;
        this.$refs.temp.clearValid();
      });
    },
    // 获取图片
    getDetailLzsbTp(id) {
      this.$api.post(
        this.$api.aport3 + "/api/lzsb/getDetailLzsbTp",
        { id: id },
        r => {
          this.dialogImgData = r;
        }
      );
    },
    downZsdjd(data) {
      this.$api.post(
        this.$api.aport3 + "/api/lzsb/downZsdjd",
        { id: data.id },
        "",
        "",
        "blob",'pdf',data.nationalityMc+data.passportno
      );
    },
    dialogSave(data) {
      console.log(data);
      if (data.type == "bj") {
        if(data.data.firstname){
          data.data.givenname = data.data.firstname +' '+data.data.surname
        }else{
          data.data.givenname = data.data.surname
        }
        if (data.btnType == 1) {//审核通过
          let p = data.data;
          p.shzt = "shzt_1";
          this.updateLzsb(data.data);
        } else if (data.btnType == 0) {//审核未通过
          this.innerForm = data.data;
          this.innerForm.shzt = "shzt_2";
          // this.innerForm.shsm="审核信息有误";
          this.innerVisible = true;
        }
      }
    },
    shwtg(formName) {//未通过提交  原因必填
      this.$refs[formName].validate(valid => {
        if(valid){
          this.updateLzsb(this.innerForm);
        }else{
          return false
        }
      })
    },
    updateLzsb(data) {
      this.$api.post(this.$api.aport3 + "/api/lzsb/updateLzsb", data, () => {
        this.$message({
          message: "修改成功",
          duration:8000,
          showClose: true,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
        this.innerVisible = false;
      });
    }
  }
};
</script>