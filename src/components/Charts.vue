<template>
  <div id="akiChart" class="my-chart" ref="akiChart"></div>
</template>
<script>
export default {
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      // 初始化
      let mychart = this.$echarts.init(document.getElementById("akiChart"));
      // 配置
      let option = {
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 绘制
      mychart.setOption(option);
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