<template>
  <div class="page">
    <el-container>
      <el-aside width="270px" style="border-right:1px solid #DEE6E8">
         <div class="left-top">
               <div class="base-flex" :class="{'mb-12':$store.state.user.jb!='3','left-query':$store.state.user.jb=='3'}">
                    <el-input
                        placeholder="请输入地址"
                        prefix-icon="el-icon-search"
                        v-model="adressQuery"
                        size="small">
                    </el-input>
                    <el-button type="primary" size="small" class="ml-5" @click="reloadList()">查询</el-button>
                </div>
                <div class="base-flex left-query" v-if="$store.state.user.jb!='3'">
                    <div class="custom-tip" v-show="pcsQuery==$store.state.user.bmbh">请选择派出所
                      <div class="custom-arrow"></div>
                    </div>
                    <!-- <el-tooltip content="请选择派出所"  :popper-class="$store.state.leftWid=='auto'?'zrq-pop':'zrq-pop-left'" placement="bottom-start" :value="pcsQuery==$store.state.user.bmbh" :manual="true" :offset="50"> -->
                    <el-select v-model="pcsQuery" filterable placeholder="请选择" size="mini" @change="reloadList()">
                      <el-option
                        v-for="item in pcsArr"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm">
                      </el-option>
                    </el-select>
                    <!-- </el-tooltip> -->
                </div>
                
                <div class="base-flex mb-12">
                    <div class="text-tip">待接收</div>
                    <!-- <div class="num-tip">共<span class="red">{{handData.length}}</span>条待接收信息</div> -->
                    <div class="num-tip">共<span class="red">{{leftTotal}}</span>条待接收信息</div>
                </div>
                <div class="base-flex pb-5 border-b">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <!-- <div class="query-record"><i class="el-icon-time"></i>搜索记录</div> -->
                </div>
           </div>
           <div class="left-content" ref="tree">
               <el-checkbox-group v-model="checkedList" @change="handChangeFun" v-infinite-scroll="load"
                     infinite-scroll-distance="10" infinite-scroll-disabled="disabled">
                    <el-checkbox v-for="(item,ind) in handShowData" :label="item.serial" :key="ind">
                        <template>
                          <div class="item-item">
                                <span class="label-item">英文姓名：</span>
                                <el-tooltip class="item" effect="dark" :content="item.givenname" placement="top" :disabled="true">
                                  <span class="value-item eles" @click="aaa(item.givenname)">{{item.givenname}}</span>  
                                </el-tooltip>                                                              
                            </div>
                            <div class="item-item">
                                <span class="label-item">中文姓名：</span>
                                <span class="value-item">{{item.name}}</span>                         
                            </div>
                            <div class="item-item">
                                <span class="label-item">国家地区：</span>
                                <span class="value-item">{{item.nationality_desc}}</span>
                            </div>
                            <div class="item-item">
                                <span class="label-item">住宿地址：</span>
                                <span class="value-item">{{item.address}}</span>
                            </div>
                        </template>
                    </el-checkbox>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore">没有更多了</p>
                </el-checkbox-group>
           </div>
           <div class="page-btn-box">
             <template v-for="(pb,pbi) in $store.state.plBtn">
             <el-button
              class="cx-btn"
              size="small"
              :type="pb.py=='js'?'primary':'success'"
              round
              v-if="pb.button_type==3"
              :key="pbi"
              @click="btnClick(pb.py)"
            >{{pb.button_name||pb.menu_name}}</el-button>
          </template>
               <!-- <el-button size="mini" type="primary" round @click="receiveFun">接收</el-button>
               <el-button size="mini" type="info" round @click="handOutFun">派发</el-button> -->
           </div>
      </el-aside>
      <el-main style="padding:0">
        <Inquire :cxData="cxData" :pd="cx.pd" :cxPara="cx" @cxFnc="cxFnc" @lcFnc="lcFnc"></Inquire>
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
                :clzt="clzt"
                :refName="'zrqzf'"
                :lbData="lbData"
                :colorDes="colorDes"
                :isSelect="isSelect"
                :lbBtn="lbBtn"
                :plBtn="plBtn"
                :isTab="isTab"
                :isEdit="isEdit"
                :tableData="tableData"
                :selection="selection"
                :clearSort="clearSort"
                :expData="cx"
                :expUrl="$api.aport2+'/issueData/exportIssueData'"
                @plFnc="plFnc"
                @pageSizeFnc="pageSizeFnc"
                @pageNumFnc="pageNumFnc"               
                @blFnc="blFnc"
                @rowDbClick="blFnc"
                @SelectionChange="SelectionChange"
                @rowClick="rowClick"
                @sortChange="sortChange"
                @transSaveFnc="transSaveFnc"
            ></Table>
            </div>
      </el-main>
    </el-container>
   
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :top="dialogType=='cl'||dialogType=='ck'?'3vh':'15vh'" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Form
        v-if="isShowDialog"
        :cxData="labelData"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :dbBtn="dbBtn"
        :isDb="isDb"
        @dialogCancel="dialogCancel"
        @dialogSave="dialogSave"
        @formLcFnc="formLcFnc"
        @dbFnc="dbFnc"
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
        //左栏
        adressQuery:'',
        pcsQuery:'',
        checkedList:[],//选中数据
        checkedListAll:[],//全选数据
        checkedListPart:[],//分页请求回的数据
        isIndeterminate:false,
        checkAll:false,
        handData:[],
        handShowData:[],
        allArr:[],
        xzCount:0,
        scrollW:0,
        pcsArr:[],
        //左栏修改
        leftData:[],
        leftPage:0,
        leftSize:20,
        leftTotal:0,
        Aflag:1,
        loading:false,


      // 查询项
      tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
      //数据展示
      isSelect: true,
      colorDes:[],
      isEdit:true,
      isTab: false,
      isPageS:true,
      isDb:true,
      cxData: this.$cdata.zxhc.zrqzf.cx,
      lbData: this.$cdata.zxhc.zrqzf.lb,
      lbBtn: this.$cdata.zxhc.zrqzf.lbBtn,
      plBtn: this.$store.state.plBtn,
      dbBtn: this.$cdata.zxhc.zrqzf.dbBtn,
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
      clearSort:0,
      page: 1,
      clzt: 1,
      multipleSelection: [],
      multipleArr: [],
      selection:[],
      diaPage:1,
      //弹窗数据
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
      currentCus:[],
      userIt:{}
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log('yemian',this.$store.state.leftWid)
      this.$store.dispatch("aGetNation");
      this.$store.dispatch("aGetGender");
      this.$store.dispatch("aGetPassport");
      this.$cdata.zrqReciData(this.$store.state.user.zrqList).then();
      this.getSpInit();
      // if (this.$store.state.user.jb == '1') {
      //   this.$store.dispatch("aGetSuboffice");
      // } else if (this.$store.state.user.jb == '2') {
      //   this.$store.dispatch("aGetSuboffice",this.$store.state.user.bmbh.slice(0, 6));
      // } else if (this.$store.state.user.jb == '3') {
      //   this.$store.dispatch("aGetSuboffice",this.$store.state.user.bmbh.slice(0, 6) + '000000');
      // }  
      // if (this.$store.state.user.jb == '1') {
      //   this.$store.dispatch("aGetPolice");
      //   this.$store.dispatch("aGetZrq");
      // } else if (this.$store.state.user.jb == '2') {
      //   this.$store.dispatch("aGetPolice",this.$store.state.user.bmbh.slice(0, 6));
      //   this.$store.dispatch("aGetZrq",this.$store.state.user.bmbh.slice(0, 6));
      // } else if (this.$store.state.user.jb == '3') {
      //   this.$store.dispatch("aGetPolice",this.$store.state.user.bmbh);
      //   this.$store.dispatch("aGetZrq",this.$store.state.user.bmbh.slice(0, 8));
      // } 
      this.$store.dispatch("aGetDatatype");
      this.getPcsQueryData();
      this.pcsQuery = this.$store.state.user.bmbh
      this.getTable();
      // this.getLeftData();
      // this.getHandData();
      this.getColorDes();
    });
  },
  computed: {
    noMore () {
      return (this.handShowData.length >= this.leftTotal && this.leftTotal!=0) && this.Aflag == 0
    },
    disabled () {
      return this.loading || this.noMore
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
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "zrq" });
          this.cx.pd.suboffice = data.fj;
          this.cx.pd.policestation = data.bmbh;
          this.cx.pd.subofficedis = true;
          this.cx.pd.policestationdis = true;
        }
      });
    },
      getColorDes(){
        this.$api.post(this.$api.aport2+'/issueTimeControl/getIssueTimeControlShAndBzList',{dwjb:'4'},r=>{
          this.colorDes = r
        })
      },
      aaa(val){
        console.log(val.length)
      },
      //简表数据 子组件通知父组件改表格数据
      transSaveFnc(data){
        this.lbData = data
      },
      getLeftData(){
        this.checkedList = [];
        let p={
            pd:{
                address:this.adressQuery,
                jb:(this.$store.state.user.jb!='3'&&this.pcsQuery == this.$store.state.user.bmbh)?this.$store.state.user.jb:'3',
                bmbh: this.pcsQuery,
                clzt:1,
                cljg:6
            },
            pageNum:this.leftPage,
            pageSize:this.leftSize,
        }
        this.$api.post(this.$api.aport2+'/issueData/getIssueDataPage',p,r=>{
          this.leftTotal = r.total;
          this.Aflag = r.total;
          if(r.list.length!=0){
            this.handShowData = this.handShowData.concat(r.list)
            this.checkedListPart = [];
            r.list.forEach(item => {
              this.checkedListPart.push(item.serial)
            });
            this.checkedListAll = this.checkedListAll.concat(this.checkedListPart)
            if(this.checkAll||this.isIndeterminate){
              this.checkedList = this.checkedListAll
            }
            // console.log('----',this.checkedListAll,this.checkedList)
            this.loading = false
          }
        })
      },
      reloadList(){
        this.leftPage = 0;
        this.loading = false;
        this.handShowData=[];
        this.checkedListAll=[];
        this.checkAll=false;
        this.isIndeterminate=false;
        // this.noMore = false;
        if(!this.loading){
          this.load();
        }
      },
      load(){
        this.loading = true
        this.leftPage++;
        this.getLeftData();  
      },
      // load(){
      //   let aa=[];
      //   console.log(this.handData.length-this.xzCount)
      //   if(this.handData.length-this.xzCount>20){
      //     this.xzCount+=20;
      //     aa=(this.handData).slice(this.xzCount,this.xzCount+20)
      //   }else if(0<=Math.abs(this.handData.length-this.xzCount)<=20){
      //     // this.xzCount+=20;
      //     console.log(this.xzCount,this.xzCount+Math.abs(this.handData.length-this.xzCount),aa)
      //     aa=(this.handData).slice(this.xzCount,this.xzCount+Math.abs(this.handData.length-this.xzCount))
      //     return
      //   }else{
      //     return
      //   }
      //   for(var i in aa){
      //     this.allArr.push(aa[i])
      //   }
      //   this.handShowData = this.allArr;
      // },
      getPcsQueryData(){
        let p={
          jb:this.$store.state.user.jb,
          bmbh:this.$store.state.user.bmbh
        }
        this.$api.post(this.$api.aport2+'/dm/getPcsListByUserJbAndBmbh',p,r=>{
          this.pcsArr = r
        })
      },
      btnClick(py){
        if(py == "js"){
          this.receiveFun();
        }else if(py == 'pf'){
          this.handOutFun();
        }
      },
      handChangeFun(value){
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.handShowData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.handShowData.length;
      },
      handleCheckAllChange(val){
        if(val){
          this.checkedList = this.checkedListAll
        }else{
          this.checkedList = [];
        }
      },
      receiveFun(){//接收
      if(this.checkedList.length==0){
          this.$message({
            message: '请先选择数据！',
            duration:13000,
            showClose: true,
            type: "warning"
          });
          return
        }
        this.dialogTitle = '责任区';
        this.dialogType = 'js';
        this.labelData = this.$cdata.zxhc.zrqzf.zrqJs;
        this.isShowDialog = true;
        this.dialogData={};
        this.isDb = false;
        this.$cdata.zrqReciData(this.$store.state.user.zrqList).then();
      },
      receiveSave(data){
        let p={
          serialList:this.checkedList,
          idcard:this.$store.state.user.sfzh,
          ZRQDM:data.turnoutarea,
          PCS:this.pcsQuery,
          receivingOrDispatchingType:'1'
        }
        this.$api.post(this.$api.aport2+'/issueData/requestOrDistributionIssueData',p,r=>{
          this.$message({
            message: r.message,
            duration:8000,
            showClose: true,
            type: "success"
          });
          this.isShowDialog = false;
          this.reloadList();
          // this.getHandData();
          this.getTable();
          this.checkedList = [];
          this.handChangeFun(this.checkedList)
        })
      },
      handOutFun(){//派发
        if(this.$store.state.user.jb != '3'){
          if(this.pcsQuery == this.$store.state.user.bmbh){
              this.$message({
              message: '请先选择派出所！',
              duration:13000,
              showClose: true,
              type: "warning"
            });
            return
          }
        }
        if(this.checkedList.length==0){
          this.$message({
            message: '请先选择数据！',
            duration:13000,
            showClose: true,
            type: "warning"
          });
          return
        }
        this.dialogTitle = '责任区';
        this.dialogType = 'pf';
        this.$store.dispatch("aGetZrq",this.pcsQuery.slice(0, 8));
        this.isShowDialog = true;
        this.labelData = this.$cdata.zxhc.zrqzf.zrqDia
        this.dialogData={};
        this.isDb = false;
      },
      handOutSave(data){
        let p={
          serialList:this.checkedList,
          idcard:this.$store.state.user.sfzh,
          ZRQDM:data.turnoutarea,
          PCS:this.pcsQuery,
          receivingOrDispatchingType:'2'
        }
        this.$api.post(this.$api.aport2+'/issueData/requestOrDistributionIssueData',p,r=>{
          this.$message({
            message: r.message,
            duration:8000,
            showClose: true,
            type: "success"
          });
           this.isShowDialog = false;
           this.reloadList();
          // this.getHandData();
          this.getTable();
          this.checkedList = [];
          this.handChangeFun(this.checkedList)
        })
      },
    //左栏待接收数据
    getHandData(){
      this.checkedList = [];
        let p={
            pd:{
                address:this.adressQuery,
                jb:(this.$store.state.user.jb!='3'&&this.pcsQuery == this.$store.state.user.bmbh)?this.$store.state.user.jb:'3',
                bmbh: this.pcsQuery,
                clzt:1,
                cljg:6
            }
        }
        this.$api.post(this.$api.aport2+'/issueData/getIssueDataPage',p,r=>{
            this.handData = r.list
            this.allArr = [];
            this.xzCount = 0;
            if(this.handData.length<20){
              this.allArr=(this.handData).slice(0,this.handData.length);
            }else{
              this.allArr=(this.handData).slice(0,20);
            }
            this.handShowData = this.allArr;
            console.log('this.handShowData',this.handShowData,this.handShowData.length)
            this.checkedListAll = [];
            for(var i=0;i<this.handData.length;i++){
              this.checkedListAll.push(this.handData[i].serial)
            }
        })
    },

    cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    tabTopClick1(){
      this.clzt=1;
      this.isEdit = true;
      this.plBtn = this.$store.state.plBtn
      this.cx.pageNum = 1;
      this.getTable(true)
    },
    tabTopClick2(){
      this.clzt=2;
      this.isEdit = false; 
      this.plBtn = this.$store.state.plBtn
      this.plBtn = this.plBtn.filter(item => ['cl'].indexOf(item.py) == -1);
      this.cx.pageNum = 1;
      this.getTable(true)
    },
    rowClick(data){
      console.log(data)
      // this.selection=[];
      // this.selection.push(data.data)
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
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs" });
        // this.$store.dispatch("aGetPolice",data.data.slice(0,6));
      }
    },
    dbFnc(data){
      console.log(this.multipleSelection.length,this.diaPage)
      if(data.button_type == 'upPage'){
        if(this.diaPage == 1){
          return
        }
        this.diaPage--
        //专项核查自定义
        if(this.multipleSelection[this.diaPage-1].datatype == '3'){//专项核查自定义 插入自定义
          if(this.multipleSelection[this.diaPage-1].issueDataFeedbackList){//存在自定义项
            this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
              data.splice(15,0,{'issueDataFeedbackList':JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)},{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
              this.labelData = data;
            });
            let cusArr = JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)
            this.currentCus = JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)
            for(var i=0;i<cusArr.length;i++){
              this.multipleSelection[this.diaPage-1][cusArr[i].serial] = {
                serial:cusArr[i].serial,
              }
              this.$set(this.multipleSelection[this.diaPage-1][cusArr[i].serial],'value',cusArr[i].type=='checkbox'?[]:'')
            }
          }else{//没有自定义项，只有自定义反馈时间
            this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//编辑选项只插入时间
              data.splice(15,0,{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
              this.labelData = data;
            });
          }
          if(!this.multipleSelection[this.diaPage-1].issue_time){this.multipleSelection[this.diaPage-1].issue_time='0'}//反馈时间回填  没有反馈时间默认0
          this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
        }else{
          this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
            this.labelData = data;
          });
          this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
        }
        this.$store.dispatch("aGetBackstatus", this.multipleSelection[this.diaPage-1].datatype);
      }
      if(data.button_type == 'nextPage'){
        if(this.diaPage == this.multipleSelection.length)return
        this.diaPage++
        //专项核查自定义
        if(this.multipleSelection[this.diaPage-1].datatype == '3'){//专项核查自定义 插入自定义
          if(this.multipleSelection[this.diaPage-1].issueDataFeedbackList){//存在自定义项
            this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
              data.splice(15,0,{'issueDataFeedbackList':JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)},{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
              this.labelData = data;
            });
            let cusArr = JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)
            this.currentCus = JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)
            for(var j=0;j<cusArr.length;j++){
              this.multipleSelection[this.diaPage-1][cusArr[j].serial] = {
                serial:cusArr[j].serial,
              }
              this.$set(this.multipleSelection[this.diaPage-1][cusArr[j].serial],'value',cusArr[j].type=='checkbox'?[]:'')
            }
          }else{//没有自定义项，只有自定义反馈时间
            this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//编辑选项只插入时间
              data.splice(15,0,{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
              this.labelData = data;
            });
          }
          if(!this.multipleSelection[this.diaPage-1].issue_time){this.multipleSelection[this.diaPage-1].issue_time='0'}//反馈时间回填  没有反馈时间默认0
          this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
        }else{
          this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
            this.labelData = data;
          });
          this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
        }
        this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
        this.$store.dispatch("aGetBackstatus", this.multipleSelection[this.diaPage-1].datatype);
      }
    },
    dialogCancel(){
      this.cx.pageNum = 1;
      this.getTable();
      this.isShowDialog = false;
      this.selection = [];
      this.multipleSelection = [];
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
      this.multipleSelection = data;
      this.multipleArr = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.multipleArr = this.multipleArr.concat([
          this.multipleSelection[i].serial
        ]);
      }
    },
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
    },
    // 查询列表
    getTable(flag) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      let pdAdd = {
        bmbh: this.$store.state.user.bmbh,
        jb:this.$store.state.user.jb,
        zrqList:this.$store.state.user.jb=='3'?this.$store.state.user.zrqList:[],
        clzt: this.clzt,
        cljg: 4
      };
      this.cx.pd = Object.assign({}, this.cx.pd, pdAdd);
      this.$api.post(
        this.$api.aport2 + "/issueData/getIssueDataPage",
        this.cx,
        r => {
          this.tableData.list = r.list;
          this.tableData.total = r.total;
          if(r.list.length==0&&this.cx.pageNum!=1){
            this.cx.pageNum = 1;
            this.getTable()
          }
        }
      );
    },
    //批量操作按钮  data==按钮名字
    plFnc(data) {
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      if (data.py == "cl") {
          if (this.multipleArr.length == 0) {
            this.$message({
              message: "请先选择数据！",
              duration:13000,
              showClose: true,
              type: "warning"
            });
            return false;
          }
          this.isDb = true;
          this.diaPage = 1;
          //初始加载
          if(this.multipleSelection[this.diaPage-1].datatype == '3'||this.multipleSelection[this.diaPage-1].datatype == '4' ||this.multipleSelection[this.diaPage-1].datatype == '5'){//专项核查自定义 插入自定义
            if(this.multipleSelection[this.diaPage-1].issueDataFeedbackList){
              this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
                data.splice(15,0,{'issueDataFeedbackList':JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)},{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
                this.labelData = data;
              });
              let cusArr = JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)
              this.currentCus = JSON.parse(this.multipleSelection[this.diaPage-1].issueDataFeedbackList)
              for(var i=0;i<cusArr.length;i++){
                this.multipleSelection[this.diaPage-1][cusArr[i].serial] = {
                  serial:cusArr[i].serial,
                }
                this.$set(this.multipleSelection[this.diaPage-1][cusArr[i].serial],'value',cusArr[i].type=='checkbox'?[]:'')
              }
            }else{
              this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
                data.splice(15,0,{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
                this.labelData = data;
              });
            }
            if(!this.multipleSelection[this.diaPage-1].issue_time){this.multipleSelection[this.diaPage-1].issue_time='0'}//反馈时间回填  没有反馈时间默认0
            this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
          }else{
            this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
              this.labelData = data;
            });
            this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
          }
          this.isShowDialog = true;
          this.$store.dispatch("aGetBackstatus", this.multipleSelection[this.diaPage-1].datatype);
      }
    },
    //列表内按钮（回退）
    blFnc(data) {
      if (data.btn.button_type == "back") {
        this.$confirm('是否回退本条数据？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let formData = new FormData();
          formData.append('SERIAL',data.data.serial)
          this.$api.post(this.$api.aport2 + '/issueData/turnoutareaRollbackIssueData',formData,r=>{
            this.$message({
              message: r.message,
              duration:8000,
              showClose: true,
              type: "success"
            });
            this.getTable();
            this.reloadList();
            // this.getHandData();
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消回退'
          })
        })
        
      }else if(data.double){
        this.dialogTitle = '详情';
        this.dialogType = 'ck';
        // this.dialogData = data.data;
        if(data.data.datatype == '3' || data.data.datatype == '4' || data.data.datatype == '5'){//专项核查自定义回填
          if(data.data.issueDataFeedbackList){
            this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(label => {//根据级别控制弹窗编辑项禁止与否
              label.splice(15,0,{'issueDataFeedbackList':JSON.parse(data.data.issueDataFeedbackList)},{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
              this.labelData = label;
            });
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
            }
          }else{
            this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(label => {//根据级别控制弹窗编辑项禁止与否
              label.splice(15,0,{cm: '反馈总时长',type: 'inpUnit', dm: 'issue_time',unit:'hour',dis:true})
              this.labelData = label;
            });
          }
          if(!data.data.issue_time){data.data.issue_time='0'}//反馈时间回填  没有反馈时间默认0
        }else{
          this.labelData = this.$cdata.zxhc.zrqzf.clDia;
        }
        this.dialogData = Object.assign({}, data.data);
        this.$store.dispatch("aGetBackstatus", data.data.datatype);
        this.isShowDialog = true;
      }
    },
    //处理保存
    handSave() {
      let p = this.dialogData;
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      p.pageData={
        clzt:'1',
        cljg:'4',
        zrqList:this.$store.state.user.jb=='3'?this.$store.state.user.zrqList:[],
        customFeedback:[],
      }
      let arr=[];
      for(var i in p){
        for(var j=0;j<this.currentCus.length;j++){
          if(i == this.currentCus[j].serial){
            arr.push(p[i])
          }
        }
      }
      p.pageData.customFeedback=arr;
      this.$api.post(this.$api.aport2 + "/issueData/updateReportData", p, r => {
        this.$message({
          message: r.message,
          duration:8000,
          showClose: true,
          type: "success"
        });
        this.multipleSelection[this.diaPage-1] = Object.assign({},this.dialogData)
      });
    },
    
    //弹窗保存
    dialogSave(data) {
      if (data.type == "cl") {
        this.handSave();
      }else if(this.dialogType == 'pf'){//派发
        this.handOutSave(data.data)
      }else if(this.dialogType == 'js'){//接收
        this.receiveSave(data.data)
      }
    }
  }
};
</script>
<style scoped>
/* .left-content{
  
} */
.left-top{
    padding: 18px 10px 0;
}
.base-flex{
    display: flex;
    justify-content: space-between;
}
.left-query{
    padding: 0 0 30px;
    position: relative;
}
.text-tip{
    font-size: 15px;
    font-weight: bold;
}
.num-tip{
    font-size: 14px;
    font-weight: bold;
}
.query-record{
    font-size: 14px;
    color:#404241;
}
.all-select{
    font-size: 14px;
    color: #817E85;
}
.item-item,.page-content{
    display: flex;
    justify-content: flex-start;
}
.value-item{
    max-width: 144px;
}
.eles{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
<style>
.zrq-pop{
  top: 196px!important;
  line-height: 0.9!important;
}
.zrq-pop-left{
  top: 196px!important;
  line-height: 0.9!important;
  left:120px!important
}
</style>