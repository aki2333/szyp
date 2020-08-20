<template>
  <div>
    <div :id="'akiChart'+id" class="my-chart" :ref="'akiChart'+id" :style="{width:Cwidth,height:Cheight}"></div>
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
    },
    Cwidth:{
      type:String,
      default:'100%'
    },
    Cheight:{
      type:String,
      default:'240px'
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

</style>