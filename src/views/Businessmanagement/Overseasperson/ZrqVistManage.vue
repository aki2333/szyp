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
                    <el-button type="primary" size="small" class="ml-5" @click="getHandData()">查询</el-button>
                </div>
                <div class="base-flex left-query" v-if="$store.state.user.jb!='3'">
                    <el-select v-model="pcsQuery" filterable placeholder="请选择" size="mini" @change="getHandData()">
                      <el-option
                        v-for="item in pcsArr"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm">
                      </el-option>
                    </el-select>
                </div>
                <div class="base-flex mb-12">
                    <div class="text-tip">待接收</div>
                    <div class="num-tip">共<span class="red">{{handData.length}}</span>条待接收信息</div>
                </div>
                <div class="base-flex pb-5 border-b">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <!-- <div class="query-record"><i class="el-icon-time"></i>搜索记录</div> -->
                </div>
           </div>
           <div class="left-content" ref="tree">
               <el-checkbox-group v-model="checkedList" @change="handChangeFun" v-infinite-scroll="load"
                     infinite-scroll-distance="10">
                    <el-checkbox v-for="(item,ind) in handShowData" :label="item.serial" :key="ind">
                        <template>
                          <div class="item-item">
                                <span class="label-item">英文姓名：</span>
                                <el-tooltip class="item" effect="dark" :content="item.givenname" placement="top" :disabled="false">
                                  <span class="value-item eles">{{item.givenname}}</span>  
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
                </el-checkbox-group>
           </div>
           <div class="page-btn-box">
             <template v-for="(pb,pbi) in $store.state.plBtn">
             <el-button
              class="cx-btn"
              size="small"
              :type="pb.py=='js'?'primary':'info'"
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
                :isEdit="isEdit"
                :tableData="tableData"
                :selection="selection"
                @plFnc="plFnc"
                @pageSizeFnc="pageSizeFnc"
                @pageNumFnc="pageNumFnc"               
                @blFnc="blFnc"
                @SelectionChange="SelectionChange"
                @rowClick="rowClick"
            ></Table>
            </div>
      </el-main>
    </el-container>
   
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
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
        checkedList:[],
        checkedListAll:[],
        isIndeterminate:false,
        checkAll:false,
        handData:[],
        handShowData:[],
        allArr:[],
        xzCount:0,
        scrollW:0,
        pcsArr:[],

      // 查询项
      tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
      //数据展示
      isSelect: true,
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
      labelData: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("aGetNation");
      this.$store.dispatch("aGetGender");
      this.$store.dispatch("aGetPassport");
      this.$cdata.zrqReciData(this.$store.state.user.zrqList).then();
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
      this.getPcsQueryData();
      // this.$set(this.pcsQuery,this.$store.state.user.bmbh)
      this.pcsQuery = this.$store.state.user.bmbh
      // this.$store.dispatch("aGetBackstatus");
      this.getTable();
      this.getHandData();
    });
  },
  methods: {
      load(){
        // if(this.hazyFlag==true){//模糊查询 有值 懒加载
        //   let aa=[];
        //   if(this.filArr.length-this.filCount>20){
        //     this.filCount+=20;
        //     aa = (this.filArr).slice(this.filCount,this.filCount+20)
        //   }else if(0<=Math.abs(this.filArr.length-this.filCount)<=20){
        //     this.filCount+=20;
        //     aa = (this.filArr).slice(this.filCount,this.filCount+Math.abs(this.filArr.length-this.filCount))
        //   }else{
        //     return
        //   }
        //   for(var i in aa){
        //     this.menudata.push(aa[i])
        //   }
        // }else{
          let aa=[];
          console.log(this.handData.length-this.xzCount)
          if(this.handData.length-this.xzCount>20){
            this.xzCount+=20;
            aa=(this.handData).slice(this.xzCount,this.xzCount+20)
          }else if(0<=Math.abs(this.handData.length-this.xzCount)<=20){
            // this.xzCount+=20;
            console.log(this.xzCount,this.xzCount+Math.abs(this.handData.length-this.xzCount),aa)
            aa=(this.handData).slice(this.xzCount,this.xzCount+Math.abs(this.handData.length-this.xzCount))
            return
          }else{
            return
          }
          for(var i in aa){
            this.allArr.push(aa[i])
          }
          this.handShowData = this.allArr;
          // console.log('this.$refs.tree.$el',this.handShowData,this.handShowData.length)
          // this.scrollW = this.$refs.tree.$el.scrollTop;
        // }
      },
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
          this.checkAll = checkedCount === this.handData.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.handData.length;
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
            type: "success"
          });
          this.isShowDialog = false;
          this.getHandData();
          this.getTable();
          this.checkedList = [];
          this.handChangeFun(this.checkedList)
        })
      },
      handOutFun(){//派发
        if(this.checkedList.length==0){
          this.$message({
            message: '请先选择数据！',
            type: "warning"
          });
          return
        }
        this.dialogTitle = '责任区';
        this.dialogType = 'pf';
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
            type: "success"
          });
           this.isShowDialog = false;
          this.getHandData();
          this.getTable();
          this.checkedList = [];
          this.handChangeFun(this.checkedList)
        })
      },
    //左栏待接收数据
    getHandData(){
        let p={
            pd:{
                address:this.adressQuery,
                jb:(this.$store.state.user.jb!='3'&&this.pcsQuery == this.$store.state.user.bmbh)?this.$store.state.user.jb:'3',
                bmbh: this.pcsQuery,
                clzt:1,
                cljg:3
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
      this.getTable();
    },
    tabTopClick1(){
      this.clzt=1;
      this.isEdit = true;
      this.plBtn = this.$store.state.plBtn
      this.cx.pageNum = 1;
      this.getTable()
    },
    tabTopClick2(){
      this.clzt=2;
      this.isEdit = false; 
      this.plBtn = this.$store.state.plBtn
          let arr = [];
          for(var i=0;i<this.plBtn.length;i++){
              if(this.plBtn[i].py!='cl'){
                arr.push(this.plBtn[i])
              }
            }
          this.plBtn = arr
      this.cx.pageNum = 1;
      this.getTable()
    },
    rowClick(data){
      this.selection=[];
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
    },
    dbFnc(data){
      console.log(this.multipleSelection.length,this.diaPage)
      if(data.button_type == 'upPage'){
        if(this.diaPage == 1){
          return
        }
        this.diaPage--
        this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
        this.$store.dispatch("aGetBackstatus", this.multipleSelection[this.diaPage-1].datatype);
      }
      if(data.button_type == 'nextPage'){
        if(this.diaPage == this.multipleSelection.length)return
        this.diaPage++
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
        bmbh: this.$store.state.user.bmbh,
        jb:this.$store.state.user.jb,
        zrqList:this.$store.state.user.jb=='3'?this.$store.state.user.zrqList:[],
        // zrqList:this.$store.state.user.zrqList,
        clzt: this.clzt,
        cljg: 4
      };
      console.log('===',this.cx.pageNum)
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
       console.log(this.multipleSelection.length,this.diaPage)
      if (this.multipleArr.length == 0) {
        this.$message({
          message: "请先选择数据！",
          type: "warning"
        });
        return false;
      }
      this.isDb = true;
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      if (data.py == "cl") {
          // this.dialogData = {};
          this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
            this.labelData = data;
          });
          this.isShowDialog = true;
          this.diaPage = 1;
          this.dialogData = Object.assign({},this.multipleSelection[this.diaPage-1]);
          this.$store.dispatch("aGetBackstatus", this.multipleSelection[this.diaPage-1].datatype);
      }
    },
    //列表内按钮（回退）
    blFnc(data) {
      if (data.btn.button_type == "back") {
        this.$api.post(this.$api.aport2 + '/issueData/turnoutareaRollbackIssueData',{SERIAL:data.data.serial},r=>{
          this.$message({
            message: r.message,
            type: "success"
          });
          this.getTable();
          this.getHandData();
          // this.$nextTick(() => {
          //   if(this.tableData.list.length==0){
          //     console.log('jin==')
          //   this.cx.pageNum = 1;
          //   this.getTable();
          // }else{
          //   this.getTable();
          // }
          // })
        })
      }
    },
    //处理保存
    handSave() {
      let p = this.dialogData;
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
      this.$api.post(this.$api.aport2 + "/issueData/updateIssueData", p, r => {
        this.$message({
          message: r.message,
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