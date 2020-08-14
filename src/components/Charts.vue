<template>
  <div>
    <p class="chart-title mb-10">TOP</p>
    <div class="chart-outer ml-10">
      <div class="chart-outer-label">分析维度</div>
      <el-select class="chart-select" placeholder="请选择" size="medium">
        <el-option>{{'1'}}</el-option>
      </el-select>
    </div>
    <div :id="'akiChart'+id" class="my-chart" :ref="'akiChart'+id"></div>
  </div>
</template>
<script>
export default {
  props: {
    optData: {
      type: Object,
      default: () => {}
    },
    id:{
      type:String,
      default:""
    }
  },
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      // 初始化
      let mychart = this.$echarts.init(document.getElementById("akiChart"+this.id));
      // 绘制
      mychart.setOption(this.optData);
      // 监听浏览器尺寸
      window.addEventListener("resize", function() {
        mychart.resize();
      });
    }
  }
};
</script>
<style scoped>
.my-chart {
  width: 100%;
  height: 270px;
}
</style>