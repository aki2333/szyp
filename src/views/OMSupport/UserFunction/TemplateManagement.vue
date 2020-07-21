<template>
  <div class="page-box page">
    <el-row type="flex" :gutter="30">
      <el-col :span="16">
        <Table
          :lbData="lbData"
          :isSelect="false"
          :isEdit="false"
          :isPagination="true"
          :plBtn="plBtn"
          :tableData="tableData"
          :expData="cx"
          :expUrl="$api.aport1 + '/templateController/exportTemplateList'"
          @rowClick="rowClick"
          @plFnc="plFnc"
          @sortChange="sortChange"
          @transSaveFnc="transSaveFnc"
        ></Table>
      </el-col>
      <el-col :span="8">
        <TreeCard
          cardTitle="功能列表"
          treeType="gnlb"
          :treeData="treeData2"
          :treeProps="treeProps2"
          :defaultChecked="defaultChecked2"
          nodeKey="serial"
          :isExpand="true"
          :isCheckbox="true"
          @getTree="getTree"
          @getCheckedNodes="getCheckedNodes"
        ></TreeCard>
        <div class="page-btn-box">
          <template v-for="(pb,pbi) in $store.state.plBtn">
            <el-button
              class="cx-btn"
              size="small"
              :type="pb.py=='bc'?'primary':'info'"
              round
              v-if="pb.button_type==3"
              :key="pbi"
              @click="btnClick(pb.py)"
            >{{pb.button_name||pb.menu_name}}</el-button>
          </template>
          <!-- <el-button size="mini" type="primary" round @click="updateTemplate">保存</el-button> -->
        </div>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <TemplateEdit
        v-if="(dialogType=='xj')&&isShowDialog"
        :dialogType="dialogType"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
      ></TemplateEdit>
    </Dialog>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import TemplateEdit from "./TemplateEdit.vue";

export default {
  components: { TreeCard, Table, Dialog, TemplateEdit },
  data() {
    return {
      treeData2: [],
      treeProps2: {
        label: "menu_name",
        children: "childrenMenu"
      },
      defaultChecked2: [],
      // 【展示数据】
      isSelect: false,
      lbData: this.$cdata.qxgl.mbgl.lb,
      plBtn: this.$store.state.plBtn,
      // 【业务数据】
      cx: {
        pd: {
          template_grade: parseInt(this.$store.state.user.jb)
        },
        pageSize: 10,
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      // 弹窗数据
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      checkRow: {},
      buttonList: [],
      menuList: []
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
    btnClick(py) {
      if (py == "bc") {
        this.updateTemplate();
      } else if (py == "qc") {
        this.cancel();
      }
    },
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.selectTemplateList();
    },
    // 获取角色列表
    selectTemplateList() {
      this.$api.post(
        this.$api.aport1 + "/templateController/selectTemplateList",
        this.cx,
        r => {
          this.tableData = r;
        }
      );
    },
    // 获取功能列表
    getMenuTree(data) {
      this.$api.post(
        this.$api.aport1 + "/menuController/getMenuTree",
        {},
        r => {
          this.treeData2 = r;
          console.log(data.data.menuList);
          this.defaultChecked2 = data.data.menuList;
        }
      );
    },
    rowClick(data) {
      console.log("点击表格-", data);
      this.checkRow = data.data;
      this.getMenuTree(data);
    },
    getTree(data) {
      this.formType = data.data.menu_name;
      // Object.assign(this.formData, data.data);
      console.log("点击树节点-", data, this.formData);
      this.formData = data.data;
    },
    getCheckedNodes(data) {
      if (data.type == "gnlb") {
        // console.log("gnlb", data);
        this.buttonList = [];
        this.menuList = [];
        let arr = [...data.data];
        arr.forEach(item => {
          if (item.menu_type == "B") {
            this.buttonList.push(item.serial);
            //this.buttonList = buttonList;
          } else {
            this.menuList.push(item.serial);
            // this.menuList = menuList;
          }
        });
      }
    },

    // 批量操作
    plFnc(data) {
      console.log("点击批量按钮-", data, this.checkRow);
      if (data.py == "xj") {
        // data.btn按钮信息
        this.dialogTitle = data.button_name;
        this.dialogType = data.py;
        this.isShowDialog = true;
      }else if(data.py == 'sc'){
        if (!this.checkRow.serial) {
          this.$message({
            message: "请先选择部门",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        } else {
          this.deleteTemplate();
        }
      }
    },

    // 弹窗返回接口
    dialogSave(data) {
      // data.type操作类型 data.data操作数据
      if (data.type == "xj") {
        this.addTemplate(data.data);
      }
    },
    // 新建
    addTemplate(data) {
      console.log("新建弹窗获得数据-", data);
      this.$api.post(
        this.$api.aport1 + "/templateController/addTemplate",
        data,
        r => {
          this.$message({
            message: r,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.isShowDialog = false;
          this.begin();
        }
      );
    },
    // 编辑
    updateTemplate() {
      console.log("编辑", this.checkRow);
      let p = {
        serial: this.checkRow.serial,
        template_name: this.checkRow.template_name,
        menuList: this.menuList,
        buttonList: this.buttonList
      };
      this.$api.post(
        this.$api.aport1 + "/templateController/updateTemplate",
        p,
        r => {
          this.$message({
            message: r,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.begin();
        }
      );
    },

    // 停用
    deleteTemplate() {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let p = {
          serial: this.checkRow.serial,
          userId: this.$store.state.user.userId
        };
        this.$api.post(
          this.$api.aport1 + "/templateController/deleteTemplate",
          p,
          r => {
            this.$message({
              message: r,
              showClose: true,
              duration:8000,
              type: "success"
            });
            this.begin();
          }
        );
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消导出'
        })
      });
    },
    // 开始
    begin() {
      this.selectTemplateList();
      this.treeData2 = [];
    }
  }
};
</script>
<style scoped>
</style>