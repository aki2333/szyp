<template>
  <div class="page-box page">
    <el-row type="flex">
      <el-col :span="8">
        <TreeCard
          cardTitle="单位列表"
          treeType="dwlb"
          :isGetBmmh="true"
          :dwlbBmmh="dwlbBmmh"
          :treeData="treeData1"
          :treeProps="treeProps1"
          :defaultChecked="defaultChecked1"
          :defaultExpanded="[$store.state.user.bmbh]"
          :checkStrictly="true"
          :isExpand="false"
          nodeKey="bmbh"
          @getTree="getTree"
          @getCheckedKeys="getCheckedKeys"
          @getDwlbBmbh="getDwlbBmbh"
        ></TreeCard>
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
          @getCheckedNodes="getCheckedNodes"
        ></TreeCard>
      </el-col>
      <el-col :span="8">
        <TreeCard
          cardTitle="模板列表"
          treeType="mblb"
          :treeData="treeData3"
          :treeProps="treeProps3"
          nodeKey="serial"
          :isCheckbox="false"
          @getTree="getTree"
        ></TreeCard>
      </el-col>
    </el-row>
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
    </div>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";

export default {
  components: { TreeCard },
  data() {
    return {
      treeData1: [],
      treeProps1: {
        label: "bmmc",
        children: "children"
      },
      defaultChecked1: [],
      defaultExpanded1: [],
      dwlbBmmh: "",
      treeData2: [],
      treeProps2: {
        label: "menu_name",
        children: "childrenMenu"
      },
      defaultChecked2: [],
      treeData3: [],
      treeProps3: {
        label: "template_name",
        children: "children"
      },
      bmbhList: [],
      menuList: [],
      buttonList: [],
      templateId: ""
    };
  },
  mounted() {
    //console.log(this.$store.state);
    this.cancel();
  },
  methods: {
    btnClick(py) {
      if (py == "bc") {
        this.addPermissionToDept();
      } else if (py == "qc") {
        this.cancel();
      }
    },
    // 获取单位列表
    getDeptTreeByBmbh() {
      this.$cdata.qxgl.getDeptTreeByBmbh().then(r => {
        this.treeData1 = r;
      });
    },
    // 批量选中单位
    getDwlbBmbh(data) {
      this.getTemplate("", data);
      this.$api.post(
        this.$api.aport1 + "/dept/getBmbh",
        {
          type: data
        },
        r => {
          this.defaultChecked1 = r;
        }
      );
    },
    // 获取功能列表
    getPermissionTree(deptBmbh) {
      this.$cdata.qxgl.getPermissionTree(deptBmbh).then(r => {
        this.treeData2 = r.menuList;
        this.defaultChecked2 = JSON.parse(JSON.stringify(r.choose));
      });
    },
    getDeptTempPermTree(tempId) {
      this.defaultChecked2 = [];
      this.$cdata.qxgl.getDeptTempPermTree(tempId).then(r => {
        // this.treeData2 = JSON.parse(JSON.stringify(this.treeData2));
        this.defaultChecked2 = r.choose;
      });
    },
    // 获取模板列表
    getTemplate(deptBmbh, type) {
      this.$cdata.qxgl.getTemplate(deptBmbh, type).then(r => {
        this.treeData3 = r;
      });
    },
    getTree(data) {
      if (data.type == "dwlb") {
        this.getPermissionTree(data.data.bmbh);
        this.getTemplate(data.data.bmbh);
      } else if (data.type == "mblb") {
        this.templateId = data.data.serial;
        this.getDeptTempPermTree(this.templateId);
      }
    },
    getCheckedKeys(data) {
      if (data.type == "dwlb") {
        this.bmbhList = data.data;
      }
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
          } else {
            this.menuList.push(item.serial);
          }
        });
      }
    },
    // 部门赋权
    addPermissionToDept() {
      this.$api.post(
        this.$api.aport1 + "/dept/addPermissionToDept",
        {
          userId: this.$store.state.user.userId,
          bmbhList:
            this.bmbhList.length == 0 ? this.defaultChecked1 : this.bmbhList,
          menuList: this.menuList,
          buttonList: this.buttonList,
          templateId: this.templateId
        },
        r => {
          this.$message({
            message: r,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.cancel();
        }
      );
    },
    // 清除
    cancel() {
      this.getDeptTreeByBmbh();
      this.getPermissionTree("");
      this.getTemplate();
      this.templateId = "";
      this.bmbhList = [];
      this.menuList = [];
      this.dwlbBmmh = "";
      this.defaultChecked1 = [];
      this.defaultChecked2 = [];
      this.defaultChecked3 = [];
    }
  }
};
</script>