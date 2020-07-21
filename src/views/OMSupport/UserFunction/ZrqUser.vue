<template>
  <div>
    <div class="tc-cx">
      <Inquire cxType="noCbtn" :cxData="$cdata.qxgl.zrqgl.yhcx" :pd="cx.pd" :cxPara="cx" @cxFnc="cxFnc" @lcFnc="lcFnc"></Inquire>
    </div>
    <el-row type="flex">
      <el-col :span="24">
        <Table
          :lbData="$cdata.qxgl.zrqgl.yhlb"
          :isSelect="true"
          :isPl="false"
          :isTab="false"
          :isEdit="false"
          :selection="zrqDmList"
          :timeChange="timeChange"
          :clearSort="clearSort"
          @SelectionChange="addZrqUser"
          @selectPageFnc="selectPageFnc"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @sortChange="sortChange"
          :tableData="tableData"
        ></Table>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <el-button size="mini" type="primary" round @click="save">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">关闭</el-button>
    </div>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";
import Inquire from "@/components/Inquire.vue";

export default {
  components: { Inquire, Table },
  props: {
    dialogType: {
      type: String,
      default: ""
    },
    dialogData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 【业务数据】
      cx: {
        pd: {
          pcsDm: this.dialogData.pcs,
          zrqDm: this.dialogData.zrqDm,
          xm: "",
          sfzh: "",
          jinghao: ""
        },
        pageSize: 10,
        pageNum: 1,
        // order: "serial",
        // direction: 1
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      clearSort:0,
      zrqDmList: [],
      checkedUser: [],
      //跨页选中
      multipleSelection: [],
      selectionAll: [],
      selectionReal:[],
      timeChange:0,
      //跨页回填
      multipleBackData:[],
      zrqAll:[],
      yxFlag:'',//未选择有效用户
    };
  },
  mounted() {
    console.log("角色用户", this.dialogType, this.dialogData);
    this.$nextTick(() => {
      this.begin();
    })
  },
  methods: {
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    lcFnc(data){
      if(data.key.dm=='sfyx'){
        this.yxFlag = data.data // 0 未配置  1已配置  空 未选择
        this.getAllData();
      }
    },
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction;
      this.getTable();
    },
    // 查询用户列表
    getTable(flag) {
      console.log("查询列表-", this.cx);
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.$api.post(this.$api.aport1 + "/zrq/getZrqUser", this.cx, r => {
        this.tableData = r.pageInfo;
        this.zrqAll = r.zrqDmList; //与无配置选中的数据合并
        let zrqDmList = [];
        // this.tableData.list.forEach(item1 => {
        //     r.zrqDmList.forEach(item2 => {
        //       if (item2 == item1.wybs) {
        //         zrqDmList.push(item1);
        //       }
        //     });
        //   });
          if (this.selectionReal.length == 0) {
            //声明一个数组对象
            this.selectionReal = new Array(
              Math.ceil(this.tableData.total / this.tableData.pageSize)
            );
          } 
          this.$nextTick(()=>{
            this.tableData.list.forEach(item1 => {
              this.selectionAll.forEach(item2 => {
                if (item2 == item1.wybs) {
                  zrqDmList.push(item1)
                }
              });
            });
            
          })
          this.zrqDmList = zrqDmList;
          console.log('切换分页selectionReal==',this.selectionReal)
          console.log('切换分页selectionAll==',this.selectionAll)
          console.log('切换分页zrqDmList==',this.zrqDmList)
          console.log("zrqDmList", this.zrqDmList);
      });
    },
    getAllData(){
      this.$api.post(this.$api.aport1 + "/zrq/getZrqUser", this.cx, r => {
        this.selectionReal = r.selectAll;
        this.dataSelection();  
        this.getTable();
      });
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
    selectPageFnc(data) {
      //手动触发
      console.log("data==", data.data);
      this.multipleSelection = data.data;
       console.log("this.multipleSelection", this.multipleSelection);
        this.selectionReal.splice(
        this.tableData.pageNum - 1,
        1,
        this.multipleSelection
      );
      console.log("this.selectionReal", this.selectionReal);
      this.dataSelection();
    },
    dataSelection(){
      this.selectionAll = [];//选中id
      for (var i = 0; i < this.selectionReal.length; i++) {
        if (this.selectionReal[i]) {
          for (var j = 0; j < this.selectionReal[i].length; j++) {
            this.selectionAll.push(this.selectionReal[i][j].wybs);
          }
        }
      }
      console.log("this.selectionAll", this.selectionAll);
      // this.checkedUser = [];
      // let arr = [...this.selectionAll];
      // arr.forEach(item => {
      //   this.checkedUser.push(item.wybs);
      // });
    },
    addZrqUser() {
      // console.log("回填", data);
    },
    save() {
      if(this.selectionReal&&this.selectionAll.length==0){
        this.dataSelection();
      }
      if(this.yxFlag == '0'){//无配置数据选择的时候  与有效数据合并
        this.selectionAll = this.selectionAll.concat(this.zrqAll)
      }
      let p = {
        userId: this.$store.state.user.userId,
        zrqDm: this.dialogData.zrqDm,
        wybs: this.selectionAll,
        selecAll:this.selectionReal
      };
      this.$api.post(this.$api.aport1 + "/zrq/addZrqUser", p, r => {
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
      });
    },
    cancel() {
      this.$emit("dialogCancel");
    },
    // 开始
    begin() {
       this.getAllData();//打开弹窗，先获取默认选中数组
      //this.$store.dispatch("aGetBmbh", { bmbh: this.$store.state.user.bmbh });
    }
  }
};
</script>
<style scoped>
</style>