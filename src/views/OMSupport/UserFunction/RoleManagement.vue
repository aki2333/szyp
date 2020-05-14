<template>
  <div class="page-box">
    <el-row type="flex">
      <el-col :span="8">
        <TreeCard
          cardTitle="单位列表"
          treeType="dwlb"
          :treeData="treeData1"
          :treeProps="treeProps1"
          nodeKey="bmbh"
          @getTree="getTree"
          @getCheckedKeys="getCheckedKeys"
        ></TreeCard>
      </el-col>
      <el-col :span="16">
        <Table
          :lbData="lbData"
          :isSelect="isSelect"
          :isEdit="isEdit"
          :isPagination="false"
          :lbBtn="lbBtn"
          :plBtn="plBtn"
          :tableData="tableData"
        ></Table>
      </el-col>
    </el-row>
    <!-- <div class="page-btn-box">
      <el-button size="mini" type="primary" round @click="addPermissionToDept">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">清除</el-button>
    </div>-->
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";
import Table from "@/components/Table.vue";

export default {
  components: { TreeCard, Table },
  data() {
    return {
      treeData1: [],
      treeProps1: {
        label: "bmmc",
        children: "children"
      },
      defaultChecked1: [],
      // 【展示数据】
      isSelect: false,
      isEdit: true,
      lbData: this.$cdata.qxgl.jsgl.lb,
      lbBtn: this.$cdata.qxgl.jsgl.lbBtn,
      plBtn: this.$cdata.qxgl.jsgl.plBtn,
      // 【业务数据】
      cx: {
        pd: {},
        pageSize: 10,
        pageNum: 1,
        order: "serial",
        direction: 1
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    };
  },
  mounted() {
    console.log(this.$store.state);
    this.cancel();
  },
  methods: {
    // 获取单位列表
    getDeptTreeByBmbh() {
      this.$cdata.qxgl.getDeptTreeByBmbh().then(data => {
        this.treeData1 = data;
      });
    },
    getTree() {
      // if (data.type == "dwlb") {
      //   this.getPermissionTree(data.data.bmbh);
      // } else if (data.type == "mblb") {
      //   this.templateId = data.data.serial;
      // }
    },
    getCheckedKeys() {
      // if (data.type == "dwlb") {
      //   this.bmbhList = data.data;
      // } else if (data.type == "gnlb") {
      //   this.menuList = data.data;
      // }
    },
    // 部门赋权
    addPermissionToDept() {
      // this.$api.post(
      //   "dept/addPermissionToDept",
      //   {
      //     userId: this.$store.state.user.userId,
      //     bmbhList: this.bmbhList,
      //     menuList: this.menuList,
      //     templateId: this.templateId
      //   },
      //   r => {
      //     console.log(r);
      //   }
      // );
    },
    // 清除
    cancel() {
      // this.getDeptTreeByBmbh();
      // // this.getPermissionTree("");
      // // this.getTemplate();
      // this.templateId = "";
      // this.bmbhList = [];
      // this.menuList = [];
    }
  }
};
</script>