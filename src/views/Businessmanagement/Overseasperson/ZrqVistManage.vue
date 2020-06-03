<template>
  <div class="page">
    <el-container>
      <el-aside width="270px" style="border-right:1px solid #DEE6E8">
         <div class="left-top">
               <div class="base-flex left-query">
                    <el-input
                        placeholder="请输入地址"
                        prefix-icon="el-icon-search"
                        v-model="adressQuery"
                        size="small">
                    </el-input>
                    <el-button type="primary" size="small" class="ml-5">查询</el-button>
                </div>
                <div class="base-flex mb-12">
                    <div class="text-tip">待接收</div>
                    <div class="num-tip">共<span class="red">1029</span>条待接收信息</div>
                </div>
                <div class="base-flex pb-5 border-b">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div class="query-record"><i class="el-icon-time"></i>搜索记录</div>
                </div>
           </div>
           <div class="left-content">
               <el-checkbox-group v-model="checkedList" @change="handChangeFun">
                    <el-checkbox v-for="(item,ind) in handData" :label="item.serial" :key="ind">
                        <template>
                            <div class="item-item">
                                <span class="label-item">姓名：</span>
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
               <el-button size="mini" type="primary" round @click="receiveFun">接收</el-button>
              <el-button size="mini" type="info" round @click="handOutFun">派发</el-button>
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
        @dialogCancel="isShowDialog=false"
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
        checkedList:[],
        isIndeterminate:false,
        checkAll:false,
        handData:[],

      // 查询项
      tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
      //数据展示
      isSelect: true,
      isTab: false,
      isDb:true,
      cxData: this.$cdata.zxhc.zrqzf.cx,
      lbData: this.$cdata.zxhc.zrqzf.lb,
      lbBtn: this.$cdata.zxhc.zrqzf.lbBtn,
      plBtn: this.$cdata.zxhc.zrqzf.plBtn,
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
      diaPage:0,
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
        this.$store.dispatch("aGetZrq");
      } else if (this.$store.state.user.jb == '2') {
        this.$store.dispatch("aGetPolice",this.$store.state.user.bmbh.slice(0, 6));
        this.$store.dispatch("aGetZrq",this.$store.state.user.bmbh.slice(0, 6));
      } else if (this.$store.state.user.jb == '3') {
        this.$store.dispatch("aGetPolice",this.$store.state.user.bmbh);
        this.$store.dispatch("aGetZrq",this.$store.state.user.bmbh);
      } 

      this.$store.dispatch("aGetDatatype");
      // this.$store.dispatch("aGetBackstatus");
      this.getTable();
      this.getHandData();
    });
  },
  methods: {
      handChangeFun(value){
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.handData.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.handData.length;
      },
      handleCheckAllChange(val){
        this.checkedList = val ? this.checkedList : [];
        this.isIndeterminate = false;
      },
      receiveFun(){

      },
      handOutFun(){

      },
    //左栏待接收数据
    getHandData(){
        let p={
            pd:{
                adress:this.adressQuery,
                jb:this.$store.state.user.jb,
                bmbh: this.$store.state.user.bmbh,
                clzt:1,
                cljg:3
            }
        }
        this.$api.post(this.$api.aport2+'/issueData/getIssueDataPage',p,r=>{
            console.log(r)
            this.handData = r.list
        })
    },

    cxFnc(data) {
      this.cx.pd = data;
      this.getTable();
    },
    tabTopClick1(){
      this.clzt=1;
      this.getTable()
    },
    tabTopClick2(){
      this.clzt=2; 
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
      if(data.button_type == 'upPage'){
        if(this.diaPage == 0) return
        this.diaPage--
        this.dialogData = Object.assign({},this.multipleSelection[this.diaPage]);
        this.$store.dispatch("aGetBackstatus", this.multipleSelection[this.diaPage].datatype);
      }
      if(data.button_type == 'nextPage'){
        this.diaPage++
        if(this.diaPage == this.multipleSelection.length)return
        this.dialogData = Object.assign({},this.multipleSelection[this.diaPage]);
        this.$store.dispatch("aGetBackstatus", this.multipleSelection[this.diaPage].datatype);
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
      this.multipleSelection = data;
      this.multipleArr = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.multipleArr = this.multipleArr.concat([
          this.multipleSelection[i].serial
        ]);
      }
      console.log("this.multipleArr==", this.multipleArr);
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
        // bmbh: this.$store.state.user.bmbh,
        // bmbh:'32050551001Z',
        zrqList:this.$store.state.user.zrqList,
        // clzt: this.clzt,
        // cljg: 4
      };
      this.cx.pd = Object.assign({}, this.cx.pd, pdAdd);
      this.$api.post(
        this.$api.aport2 + "/issueData/getIssueDataPage",
        this.cx,
        r => {
          // this.tableData.list = r.list;
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
      if (data.button_type == "cl") {
          // this.dialogData = {};
          this.$cdata.zxhc.handShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
            this.labelData = data;
          });
          this.isShowDialog = true;
          this.diaPage = 0;
          this.dialogData = Object.assign({},this.multipleSelection[this.diaPage]);
      }
    },
    //列表内按钮
    blFnc(data) {
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if (data.btn.button_type == "back") {
        this.$cdata.zxhc.editShow(this.$store.state.user.jb).then(data => {//根据级别控制弹窗编辑项禁止与否
          this.labelData = data;
        });
        this.$store.dispatch("aGetBackstatus", data.data.datatype);
        this.isShowDialog = true;
        // this.dialogData = Object.assign({},this.multipleSelection[0]);
      }
    },
    //回退保存
    backSave(data) {
      let p = data;
      p.jb = this.$store.state.user.jb;
      p.bmbh = this.$store.state.user.bmbh;
      p.userId = this.$store.state.user.userId;
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
    handSave(data) {
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
    
    //弹窗保存
    dialogSave(data) {
      if (data.type == "cl") {
        this.handSave(data.data);
      } else if (data.type == "back") {
        this.backSave(data.data);
      }
    }
  }
};
</script>
<style scoped>
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
    font-size: 16px;
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
    justify-content: start;
}
.value-item{
    width: 67%;
}

</style>