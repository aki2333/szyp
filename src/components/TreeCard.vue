<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-title">
        <span>{{cardTitle}}</span>
      </div>
      <div>
        <el-tree
          :props="treeProps"
          :node-key="nodeKey"
          show-checkbox
          @check-change="handleCheckChange"
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
    cxData: {
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
    handleCheckChange() {}
  }
};
</script>
<style scoped>
.card-title {
  font-weight: bold;
  font-size: 15px;
  color: #47555e;
}
</style>