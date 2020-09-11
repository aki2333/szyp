<template>
  <div class="page-box page">
    <el-row type="flex" :gutter="20">
      <el-col :span="8">
        <TreeCard
          cardTitle="单位列表"
          treeType="dwlb"
          :isCheckbox="false"
          :treeData="treeData1"
          :treeProps="treeProps1"
          :isExpand="false"
          nodeKey="bmbh"
          @getTree="getTree"
        ></TreeCard>
      </el-col>
      <el-col :span="16">
        <Table
          :page="page"
          :lbData="lbData"
          :refName="'jsgl'"
          :isSelect="isSelect"
          :isEdit="isEdit"
          :isTab="true"
          :lbTab="$cdata.qxgl.jsgl.lbTab"
          :isPagination="false"
          :lbBtn="lbBtn"
          :plBtn="plBtn"
          :clearSort="clearSort"
          :tableData="tableData"
          :expData="cx"
          :expUrl="$api.aport1+'/role/exportRole'"
          @blFnc="blFnc"
          @plFnc="plFnc"
          @sortChange="sortChange"
          @transSaveFnc="transSaveFnc"
          @tabFnc="tabFnc"
        ></Table>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <RoleEdit
        v-if="(dialogType=='bj'||dialogType=='xjqjjs'||dialogType=='xjbdjs')&&isShowDialog"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
      ></RoleEdit>
      <RoleUser
        v-if="dialogType=='yh'&&isShowDialog"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
      ></RoleUser>
    </Dialog>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import RoleEdit from "./RoleEdit.vue";
import RoleUser from "./RoleUser.vue";

export default {
  components: { TreeCard, Table, Dialog, RoleEdit, RoleUser },
  data() {
    return {
      treeData1: [],
      treeProps1: {
        label: "bmmc",
        children: "children"
      },
      defaultChecked1: [],
      treeBMXX: {},
      // 【展示数据】
      isSelect: false,
      isEdit: true,
      lbData: this.$cdata.qxgl.jsgl.lb,
      lbBtn: this.$cdata.qxgl.jsgl.lbBtn,
      plBtn: this.$store.state.plBtn,
      // 【业务数据】
      cx: {
        pd:{},
        bmbh: "",
        quanJu: "true"
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      page:'1',
      clearSort:0,
      treeBmbh:'',
      // 弹窗数据
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {}
    };
  },
  mounted() {
    this.begin();
  },
  methods: {
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
    },
    // 获取单位列表
    getDeptTreeByBmbh() {
      this.$cdata.qxgl.getDeptTreeByBmbh().then(data => {
        this.treeData1 = data;
      });
    },
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction;
      this.getRole(this.treeBmbh);
    },
    tabFnc(data){
      this.page = data
      this.getRole(this.cx.bmbh)
    },
    // 获取角色列表
    getRole(bmbh,flag) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.cx.bmbh = bmbh;
      this.cx.status = this.page
      this.$api.post(this.$api.aport1 + "/role/getRole", this.cx, r => {
        this.tableData.list = r;
      });
    },
    getTree(data) {
      if (data.type == "dwlb") {
        this.treeBMXX = data.data;
        console.log('===',data.data.bmbh)
        this.treeBmbh = data.data.bmbh
        this.getRole(data.data.bmbh,true);
      }
    },
    // 批量操作
    plFnc(data) {
      if(data.py!='jb'&&data.py!='dc'){
          if (this.cx.bmbh == "") {
          this.$message({
            message: "请先选择部门",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        }
        // data.btn按钮信息
        this.dialogTitle = data.menu_name;
        this.dialogType = data.py;
        // data.data行内信息
        this.dialogData = this.cx;
        this.isShowDialog = true;
      }
    },
    // 表格内操作
    blFnc(data) {
      console.log("点击表格按钮-", data);
      // data.btn按钮信息
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      // data.data行内信息
      this.dialogData = data.data;
      if (this.dialogType == "bj") {
        if(data.data.status=='0'){//状态无效
          this.$message({
            message: '请先启用该角色！',
            showClose: true,
            duration:13000,
          });
          return
        }else{
          this.dialogData.bmbh = this.treeBMXX.bmbh;
          this.isShowDialog = true;
        }
      } else if (this.dialogType == "yh") {
        if(data.data.status=='0'){//状态无效
          this.$message({
            message: '请先启用该角色！',
            showClose: true,
            duration:13000,
          });
          return
        }else{
          this.dialogData.bmbh = this.treeBMXX.bmbh;
          this.dialogData.bmmc = this.treeBMXX.bmmc;
          this.isShowDialog = true;
        }
      } else if (this.dialogType == "ty") {
        this.deleteRole(data.data);
      } else if (this.dialogType == "qy") {
        this.enableRole(data.data);
      }
    },
    // 弹窗返回接口
    dialogSave(data) {
      // data.type操作类型 data.data操作数据
      if (data.type == "bj") {
        console.log("bj", data);
        this.editRole(data.data);
      } else if (data.type == "yh") {
        this.getRoleUser(data.data);
      } else if (data.type == "xjqjjs") {
        let data1 = data.data;
        data1.roleType = "1";
        this.addRole(data1);
      } else if (data.type == "xjbdjs") {
        let data1 = data.data;
        data1.roleType = "2";
        this.addRole(data1);
      }
    },
    // 新建
    addRole(data) {
      console.log("新建弹窗获得数据-", data);
      this.$api.post(this.$api.aport1 + "/role/addRole", data, r => {
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.isShowDialog = false;
        this.getRole(data.bmbh);
      });
    },
    // 编辑
    editRole(data) {
      let p = data;
      p.roleId = this.dialogData.serial;
      p.userId = this.dialogData.create_user_id;
      this.$api.post(this.$api.aport1 + "/role/editRole", p, r => {
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.isShowDialog = false;
        this.getRole(data.bmbh);
      });
    },
    // 用户
    getRoleUser() {},
    // 停用
    deleteRole() {
      let p = {
        roleId: this.dialogData.serial,
        userId: this.dialogData.create_user_id
      };
      this.$api.post(this.$api.aport1 + "/role/deleteRole", p, r => {
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.isShowDialog = false;
        this.getRole(this.cx.bmbh);
      });
    },
    //启用
    enableRole() {
      let p = {
        roleId: this.dialogData.serial,
        userId: this.dialogData.create_user_id
      };
      this.$api.post(this.$api.aport1 + "/role/enableRole", p, r => {
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.isShowDialog = false;
        this.getRole(this.cx.bmbh);
      });
    },
    // 开始
    begin() {
      this.getDeptTreeByBmbh();
    }
  }
};
</script>
<style scoped>
</style>