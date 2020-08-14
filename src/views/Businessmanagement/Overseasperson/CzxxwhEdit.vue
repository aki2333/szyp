<template>
  <div>
    <div class="dia-tab-box">
      <span
        class="hand"
        :class="{'dia_active':editPage==lt.dm}"
        v-for="(lt,lti) in lbTabEdit"
        :key="lti"
        @click="DiaTabFun(lt.dm)"
      >{{lt.mc}}</span>
    </div>
     <el-row class="page-inner-box" v-show="editPage == '1'">
       <Table
          :lbData="$cdata.czxx.xxwhgl.lb"
          :isSelect="false"
          :isPl="false"
          :isEdit="false"
          :clearSort="clearSort"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @sortChange="sortChange"
          @rowClick="rowClick"
          :tableData="jbxxtableData"
          ref="jbxxTable"
        ></Table>
       <Jbxx
        :dialogType="dialogType"
        :dialogData="jbxxdiaData"
        :dialogImgData="dialogImgData"
        :cxData="$cdata.czxx.xxwhgl.jbxxEdit"
        @dialogSave="dialogSave"
        ref="jbxx"
      ></Jbxx>
      <div class="page-btn-box">
        <el-button size="mini" round type="primary" @click="save('form')">保存</el-button>
        <el-button size="mini" round type="info" @click="cancel">取消</el-button>
      </div>
     </el-row>
    <el-row class="page-inner-box" v-show="editPage == '2'">
      <el-col :span="24">
        <Table
          :lbData="$cdata.czxx.xxwhgl.jzdTableEdit"
          :isSelect="false"
          :isPl="false"
          :isEdit="false"
          :clearSort="clearSort"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @sortChange="sortChange"
          @rowClick="rowClick"
          :tableData="jzdtableData"
          ref="jzdTable"
        ></Table>
        <el-divider></el-divider>
        <Form
        :dialogType="dialogType"
        :dialogData="jzddiaData"
        :btnPage="'czxxwhjzd'"
        @dialogSave="dialogSave"
        @dialogCancel="cancel"
        ref="jzd"
        :cxData="$cdata.czxx.xxwhgl.jzdFormEdit"></Form>
      </el-col>
    </el-row>
    <el-row class="page-inner-box" v-show="editPage == '3'">
      <el-col :span="24">
        <Table
          :lbData="$cdata.czxx.xxwhgl.gzdTableEdit"
          :isSelect="false"
          :isPl="false"
          :isEdit="false"
          :clearSort="clearSort"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @sortChange="sortChange"
          @rowClick="rowClick"
          :tableData="gzdtableData"
          ref="gzdTable"
        ></Table>
        <el-divider></el-divider>
        <Form
        :dialogType="dialogType"
        :dialogData="gzddiaData"
        :btnPage="'czxxwhgzd'"
        @dialogSave="dialogSave"
        @dialogCancel="cancel"
        ref="jzd"
        :cxData="$cdata.czxx.xxwhgl.gzdFormEdit"></Form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";
import Jbxx from "@/components/CzxxwhEdit/jbxx.vue";
import Form from "@/components/Form.vue";
export default {
  components: { Table,Jbxx,Form },
  props:{
    // jbxxdiaData:{
    //   type: Object,
    //   default: () => {}
    // },
    dialogType:{
      type: String,
      default: ""
    },
    dialogImgData: {
      type: Array,
      default: () => []
    },
    timer:{
      type: Number,
      default: 0
    },
    onlyId:{
      type: String,
      default: ""
    }
  },
  watch:{
    timer(){
      this.editPage='1'
      this.begin();
    },
  },
  data(){
    return{
      // 【业务数据】
      cx1: {
        pd:{},
        pageSize: 10,
        pageNum: 1,
      },
      cx2: {
        pd:{},
        pageSize: 10,
        pageNum: 1,
      },
      cx3: {
        pd:{},
        pageSize: 10,
        pageNum: 1,
      },
      tabPage: "",
      jzdtableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      gzdtableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      jbxxtableData:{
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      clearSort:0,
      //
      editPage:'1',
      lbTabEdit:this.$cdata.czxx.xxwhgl.lbTabEdit,
      labelData: [],
      jzddiaData:{},
      gzddiaData:{},
      jbxxdiaData:{},
    }
  },
  mounted(){
    this.editPage='1'
    this.begin();
  },
  methods:{
    sortChange(data){
      if(this.editPage=='1'){
        this.cx1.order = data.prop;
        this.cx1.direction = data.direction;
      }else if(this.editPage=='2'){
        this.cx2.order = data.prop;
        this.cx2.direction = data.direction;
        this.getTable2();
      }else if(this.editPage=='3'){
        this.cx3.order = data.prop;
        this.cx3.direction = data.direction;
        this.getTable3();
      }
    },
    DiaTabFun(data){
      this.editPage = data
      // if(data=='2'){
      //   this.getTable2(true);
      // }else if(data=='3'){
      //   this.getTable3(true);
      // }
    },
    rowClick(data){
      if(this.editPage=='2'){
        this.jzddiaData = data.data
      }else if(this.editPage=='3'){
        this.gzddiaData = data.data
      }else if(this.editPage=='1'){
        this.jbxxdiaData = data.data
      }
    },
    save(){
      this.$refs['jbxx'].save('form')
    },
    dialogSave(data){
      this.$emit('dialogSave',{
        type: data.type,
        data: data.data,
        editPage:this.editPage
      })
      console.log('==',{
        type: data.type,
        data: data.data,
        editPage:this.editPage
      })
    },
    cancel() {
      this.$emit("dialogCancel");
    },
    getTable1(flag,begin){
      if(flag){this.clearSort = new Date().getTime();delete this.cx1.order;delete this.cx1.direction }
        this.cx1.pd.personnel_id=this.onlyId;
        this.$api.post(this.$api.aport4 + "/czry/getCzRyxxByRybh", this.cx1, r => {
          this.jbxxtableData.list = r.list;
          this.jbxxtableData.total = r.total;
          if(begin == 'begin'){
            if(this.jbxxtableData.list[0].valid_state){
              if(this.jbxxtableData.list[0].valid_state == '0'){
                this.jbxxtableData.list[0].valid_statedis = true
              }
            }
            this.jbxxdiaData = this.jbxxtableData.list[0]
            console.log('===',this.jbxxdiaData)
          }
          this.$refs.jbxxTable.cRowHighlight();
        });
    },
    // 居住地信息列表
    getTable2(flag,begin) {
        if(flag){this.clearSort = new Date().getTime();delete this.cx2.order;delete this.cx2.direction }
        this.cx2.pd.personnel_id=this.onlyId;
        this.$api.post(this.$api.aport4 + "/czjzd/getCzJzdxx", this.cx2, r => {
          this.jzdtableData.list = r.list;
          this.jzdtableData.total = r.total;
          if(begin == 'begin'){this.jzddiaData = this.jzdtableData.list[0]}
          this.$refs.jzdTable.cRowHighlight();
        });
    },
    //工作地信息列表
    getTable3(flag,begin) {
        if(flag){this.clearSort = new Date().getTime();delete this.cx3.order;delete this.cx3.direction }
        this.cx3.pd.personnel_id=this.onlyId;
        this.$api.post(this.$api.aport4 + "/czgzd/getCzGzdxx", this.cx3, r => {
          this.gzdtableData.list = r.list;
          this.gzdtableData.total = r.total;
          if(begin == 'begin'){this.gzddiaData = this.gzdtableData.list[0]}
          this.$refs.gzdTable.cRowHighlight();
        });
    },
    // 获取分页等信息
    pageSizeFnc(data) {
      if(this.editPage=='2'){
        this.cx2.pageSize = data;
        this.getTable2();
      }else if(this.editPage=='3'){
        this.cx3.pageSize = data;
        this.getTable3();
      }else if(this.editPage=='1'){
        this.cx1.pageSize = data;
        this.getTable1();
      }
    },
    pageNumFnc(data) {
      if(this.editPage=='2'){
        this.cx2.pageNum = data;
        this.getTable2();
      }else if(this.editPage=='3'){
        this.cx3.pageNum = data;
        this.getTable3();
      }else if(this.editPage=='1'){
        this.cx1.pageNum = data;
        this.getTable1();
      }
    },
    begin() {
     this.getTable1(true,'begin');
     this.getTable2(true,'begin');
     this.getTable3(true,'begin');
    }
  }
}
</script>
<style>

</style>