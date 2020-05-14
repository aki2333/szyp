<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-title">
        <span>{{cardTitle}}</span>
      </div>
      <div>
        <el-tree
          :default-expand-all="isExpand"
          :expand-on-click-node="false"
          :default-checked-keys="defaultChecked"
          highlight-current
          :data="treeData"
          :props="treeProps"
          :node-key="nodeKey"
          show-checkbox
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
    nodeClick(a, b, c) {
      console.log(a, b, c);
      this.$emit("getTree", a);
    },
    handleCheckChange() {}
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