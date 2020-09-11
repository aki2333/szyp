<template>
  <el-card
    class="box-card"
    :body-style="{'min-height': '300px','max-height': '60vh',width:'100%','overflow-y': 'auto','overflow-x': 'auto'}"
  >
    <div slot="header" class="clearfix card-title" v-if="cardTitle">
      <span>{{cardTitle}}</span>
    </div>
    <div>
      <div v-if="isGetBmmh" class="mb-10">
        <el-radio-group v-model="dwlbBmmh1" @change="dwlbBmmhChange" size="small">
          <el-radio-button :label="'sjbm'">市局部门</el-radio-button>
          <el-radio-button :label="'fj'">分局</el-radio-button>
          <el-radio-button :label="'pcs'">派出所</el-radio-button>
        </el-radio-group>
      </div>
      <el-tree
        ref="tree"
        :default-expand-all="isExpand"
        :expand-on-click-node="false"
        :default-expanded-keys="defaultExpanded"
        highlight-current
        :check-strictly="checkStrictly"
        :data="treeData"
        :props="treeProps"
        :node-key="nodeKey"
        :show-checkbox="isCheckbox"
        @check-change="handleCheckChange"
        @node-click="nodeClick"
      ></el-tree>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    cardTitle: {
      type: String,
      default: ""
    },
    treeType: {
      type: String,
      default: ""
    },
    nodeKey: {
      type: String,
      default: ""
    },
    dwlbBmmh: {
      type: String,
      default: ""
    },
    isGetBmmh: {
      type: Boolean,
      default: false
    },
    treeProps: {
      type: Object,
      default: () => {}
    },
    treeData: {
      type: Array,
      default: () => []
    },
    isExpand: {
      type: Boolean,
      default: true
    },
    isCheckbox: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    defaultChecked: {
      type: Array,
      default: () => []
    },
    defaultExpanded: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dwlbBmmh1: this.dwlbBmmh
    };
  },
  watch: {
    dwlbBmmh(val) {
      this.dwlbBmmh1 = val;
    },
    defaultChecked(val) {
      // console.log("defaultChecked", val);
      this.$refs.tree.setCheckedKeys(val);
      setTimeout(() => {
        this.getTree();
      }, 400);
    }
  },
  methods: {
    nodeClick(a) {
      this.$emit("getTree", { type: this.treeType, data: a });
    },
    handleCheckChange(a) {
      console.log(this.dwlbBmmh1, a);
      // if (this.dwlbBmmh1 == "pcs") {
      //   // setTimeout(() => {
      //   this.$refs.tree.store.nodesMap[a.bmbh].expanded = true;
      //   a.unfold = true;
      //   // }, 400);
      // }
      this.getTree();
    },
    getTree() {
      let data = this.$refs.tree.getCheckedKeys(false);
      this.$emit("getCheckedKeys", { type: this.treeType, data: data });
      let data2 = this.$refs.tree.getCheckedNodes(false, true);
      this.$emit("getCheckedNodes", { type: this.treeType, data: data2 });
    },
    dwlbBmmhChange(data) {
      console.log(data);
      this.$emit("getDwlbBmbh", data);
    }
  }
};
</script>
<style scoped>
.box-card {
  /* min-height: 300px; */
  /* min-height: 500px;
  max-height: 70vh;
  overflow: auto; */
}
.card-title {
  font-weight: bold;
  font-size: 15px;
  color: #47555e;
}
</style>