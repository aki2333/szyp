<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-title">
        <span>{{cardTitle}}</span>
      </div>
      <div>
        <el-tree
          ref="tree"
          :default-expand-all="isExpand"
          :expand-on-click-node="false"
          :default-checked-keys="defaultChecked"
          highlight-current
          :data="treeData"
          :props="treeProps"
          :node-key="nodeKey"
          :show-checkbox="isCheckbox"
          @check-change="handleCheckChange"
          @node-click="nodeClick"
        ></el-tree>
      </div>
    </el-card>
  </div>
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
    defaultChecked: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      //   treeProps: {
      //     label: "bmmc",
      //     children: "children"
      //   }
    };
  },
  methods: {
    nodeClick(a) {
      // console.log(a, b, c);
      this.$emit("getTree", { type: this.treeType, data: a });
    },
    handleCheckChange() {
      let data = this.$refs.tree.getCheckedKeys(false);
      console.log("tree", data);
      this.$emit("getCheckedKeys", { type: this.treeType, data: data });
    }
  }
};
</script>
<style scoped>
.box-card {
  /* min-height: 300px; */
  height: 70vh;
  overflow: auto;
}
.card-title {
  font-weight: bold;
  font-size: 15px;
  color: #47555e;
}
</style>